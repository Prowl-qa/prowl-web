# Changelog

All notable changes to the Prowl Tools marketing site (`prowl.tools`) are documented here.

## [Unreleased]

### Added
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
