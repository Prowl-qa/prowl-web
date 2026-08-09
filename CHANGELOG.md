# Changelog

All notable changes to the Prowl Tools marketing site (`prowl.tools`) are documented here.

## [Unreleased]

### Added
- RSS feed improvements (PQW-009): the blog feed builder moved to a pure,
  unit-tested `src/lib/rss.ts` (`escapeXml`, `buildBlogFeed`,
  `rssAlternateTypes`). `<link>`/`<guid>`/`<atom:link>` URLs are now
  XML-escaped (previously interpolated raw); `src/app/blog/feed.xml/route.ts`
  declares `export const dynamic = "force-static"` documenting that
  `lastBuildDate` is intentionally the build timestamp (the site redeploys on
  content changes); the feed is added to `src/app/sitemap.ts`; and site-wide
  RSS autodiscovery (`<link rel="alternate" type="application/rss+xml">`) is
  emitted via `alternates.types` on the root layout, re-included on pages that
  set their own canonical.
- Blog post social images (PQW-008): `generateMetadata` in
  `src/app/blog/[slug]/page.tsx` now sets `openGraph.images` and
  `twitter.images` from the post's `image` frontmatter (resolved against
  `metadataBase`), falling back to the site-wide card (PQW-004) when a post
  declares none. Previously the parsed `image` field was never used and posts
  had no preview image.
- Open Graph / Twitter social preview cards (PQW-004): a shared 1200x630
  `ImageResponse` generator (`src/lib/og-image.tsx`) — dark brand background with
  the Prowl mascot logo, wordmark, section eyebrow, one-line headline, and the
  `prowl.tools` domain — wired through the `opengraph-image` file convention at the
  root (`src/app/opengraph-image.tsx`) and per-section variants for `/cli`,
  `/code-review`, and `/docs`. Each route now emits `og:image` and
  `twitter:image` (1200x630) and every page's `twitter.card` is
  `summary_large_image`; the root file-convention image applies to descendants,
  while `/blog` references the site-wide card explicitly because its own
  shallow-merged metadata object replaces the parent `openGraph` object.
- Prowl Review dogfooding: `.github/workflows/prowl-review.yml` (auto review on PRs) and
  `prowl-review-command.yml` (`@prowl-review` chat/commands) run the Claude + Gemini ensemble
  via `prowl-tools/prowl-code-review@v1`, configured by a base-branch-trusted
  `.prowl-review.yml`; posts as `prowl-review[bot]` when the App secrets are set. Requires the
  `PROWL_AI_KEY_ANTHROPIC` / `PROWL_AI_KEY_GEMINI` repo secrets. The placeholder
  `anthropics/claude-code-action` workflows (`claude.yml`, `claude-code-review.yml`) are
  retired, mirroring prowl-code-review.
- Prowl CLI dogfooding setup (PQW-017): `prowl-tools` pinned as a devDependency, `.prowl/`
  scaffolded via `prowl init` (config targets `http://localhost:3002`, starter `hello` hunt),
  an explicit Chromium install script, and `.prowl/runs/` gitignored while config and hunts stay
  committed.
- Prowl hunt suite covering the marketing site (PQW-018): homepage hero, desktop nav with
  Products dropdown, mobile hamburger nav, `/cli`, `/code-review`, and `/docs` pages with
  CTA checks, blog index + `?tag=` filtering + post page, newsletter form presence, dark/light
  theme toggle, and footer links. Hunts are tagged `smoke` (fast core set), `full`, and
  `mobile` (run with `--viewport mobile`) for CI filtering; the starter `hello` hunt is
  superseded by `homepage` and removed.
- Page-specific Twitter metadata for the blog index (PQW-021): `/blog` now emits its own
  `twitter` card (title, description, `creator`) instead of inheriting the root layout's
  homepage Twitter tags.
- CI workflow (PQW-019): `.github/workflows/ci.yml` runs on pull requests and pushes to
  `main` — `npm ci`, `npm run lint`, `npm run build`, then serves the production build
  (`npm run start` on port 3002) and polls it for readiness before running the Prowl hunt
  suite via `prowl ci` against `http://localhost:3002` (desktop hunts tagged `full`, plus the
  `mobile`-tagged hunt with `--viewport mobile`). Chromium is provisioned with
  `playwright install --with-deps chromium`; npm and `~/.cache/ms-playwright` (keyed on the
  installed Playwright version) are cached, and `.prowl/runs/` plus the server log upload as
  artifacts on failure.

### Changed
- Single branded checks row for reviews: the prowl-review auto-review now triggers off the CI
  workflow completing (`workflow_run`) instead of `pull_request`, so the PR checks list shows
  only the branded "Prowl Review" check run (no extra `prowl-review / review` Actions row) and
  reviews only run once CI is green. The workflow resolves exactly one open PR from the
  completed CI run (with an API fallback), gates out forks, and hands the PR number and draft
  state to the action explicitly; CI now subscribes to `ready_for_review` so draft→ready still
  triggers a review. Provider keys are read from org-level secrets.
- Prowl Hub and Prowl Infra links (homepage tiles, nav, footer, docs hub) now point at the
  live satellite sites `hub.prowl.tools` and `infra.prowl.tools` instead of internal
  marketing pages.

### Fixed
- Accessible nav Products menu (PQW-006): the desktop "Products" dropdown was
  CSS-hover / `group-focus-within` only — the trigger had no `aria-expanded`/`aria-controls`,
  no click or keyboard handling, no Escape-to-close, and defaulted to `type="submit"`, failing
  WCAG 2.1 SC 4.1.2 and 1.4.13. It is now a JS-controlled disclosure (WAI-ARIA APG disclosure
  pattern): the trigger is `type="button"` with `aria-expanded` + `aria-controls`, toggles on
  click/Enter/Space, and the menu is dismissible via Escape (returning focus to the trigger) and
  outside-click, and closes when focus leaves it or an item is selected. Visibility is driven by
  React state so the menu links are only in the tab order while it is open, while hover-to-open
  is preserved for mouse users. Open/close decision logic is extracted to a DOM-free
  `src/lib/disclosure.ts` with unit coverage; the `nav-desktop` hunt now asserts `aria-expanded`
  toggling alongside hover-open.
- `/docs` page now has an `<h1>` (PQW-007): `DocsHub` renders its "Docs for every tool"
  heading as an `<h1>` when `standalone` (the `/docs` page body) and keeps it an `<h2>` when
  embedded on the homepage, where the hero owns the page's single `<h1>`. Fixes the broken
  heading hierarchy and weak SEO signal on `/docs` without introducing a duplicate top-level
  heading on `/`.
- Render marketing content visible without JS and fix the LCP/FCP regression (PQW-005):
  every section (heroes, section reveals, and all `whileInView` sections) previously shipped
  its SSR HTML behind motion's inline `opacity:0` `hidden` variant, so content — including the
  hero headline, the LCP element — was invisible until hydration and hidden entirely for no-JS
  visitors and crawlers. A new shared `src/lib/reveal.ts` utility now renders content visible by
  default and applies the entrance animation as a progressive enhancement: `revealVisible`
  (`{ initial: 'visible', animate: 'visible' }`) keeps above-the-fold heroes visible on first
  paint with no re-hide (correct for LCP), and
  `useScrollReveal` (backed by a shared one-shot hydration store and also respecting
  `prefers-reduced-motion`) only enables the `hidden` → `visible` scroll entrance after
  hydration, when below-the-fold sections are off-screen. The post-hydration scroll-reveal props
  include a stable remount key so Motion applies the hidden initial state on the enhanced mount,
  while standalone `/docs` content stays on the visible hero path. Applied across `Hero`,
  `SuiteHero`, `CodeReview`, `SectionReveal`, `TypingEffect`, and every section component. SSR
  HTML now ships zero inline `opacity:0` on content across `/`, `/cli`, `/code-review`, `/docs`,
  `/blog`, with focused `src/lib/reveal.ts` unit coverage for visible, reduced-motion,
  post-hydration, and hydration-store behavior.
- Pointed all X/Twitter links and metadata at the live `@prowltools` account (PQW-022):
  the footer X link (`https://x.com/prowltools`) and every page's `twitter.creator`. Replaces
  the earlier `@prowl` handle, which is not ours (`@prowl` was unavailable when the account was
  renamed from the legacy `@prowlqa`). Does not touch the `@prowl-review` PR bot name.
- Removed legacy "Prowl QA" branding from the site title metadata and hero badge; README now
  says Next.js 16.

### Removed
- Internal `/hub` and `/infra` marketing pages and the `SatelliteProductLanding` component;
  the old URLs permanently redirect to the live satellite sites.
