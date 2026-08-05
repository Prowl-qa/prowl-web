# Prowl Web - Product Backlog

**Repo**: `prowl-tools/prowl-web`
**Stack**: Next.js 16 + Tailwind CSS v4 + TypeScript + Motion
**Hosting**: Vercel at prowl.tools

---

## High Priority

### PQW-004: Add Open Graph / Twitter social preview images
**Priority**: High
**Description**: No page defines `openGraph.images` or `twitter.images`, and there is no `opengraph-image.*` file or social image in `public/` — links shared on X, Slack, LinkedIn, iMessage, etc. render with no preview image. Add a 1200×630 `src/app/opengraph-image.png` (or generate with `ImageResponse`), set `openGraph.images` globally in `src/app/layout.tsx`, switch `twitter.card` to `summary_large_image`, and add per-section variants where worthwhile.

### PQW-005: Render page content visible without JS (opacity-0 animation / LCP fix)
**Priority**: High
**Description**: Every marketing section is a client component animated from `hidden: { opacity: 0, y: 24 }` via motion/react (`src/lib/animations.ts`), including the hero headline — the LCP element. SSR HTML ships with inline `opacity:0`, so content is invisible until hydration, hurting LCP/FCP and the no-JS/crawler experience. Render content visible by default and apply animation only as a progressive enhancement; respect `prefers-reduced-motion`. Affects `Hero.tsx`, `SuiteHero.tsx`, `SectionReveal.tsx`, and all section components.

### PQW-006: Make the nav Products dropdown keyboard/screen-reader accessible
**Priority**: High
**Description**: The Products menu in `src/components/Nav.tsx` is CSS-hover/`group-focus-within` only. The trigger button has no `aria-expanded`/`aria-controls`, no click or keyboard handler, no Escape-to-close, and defaults to `type="submit"`. Fails WCAG 2.1 (4.1.2 Name/Role/Value, 1.4.13). Convert to a JS-controlled disclosure: managed open state, `aria-expanded`, `type="button"`, toggle on click, close on Escape/outside-click.

### PQW-007: Add an `<h1>` to the /docs page
**Priority**: High
**Description**: `/docs` renders `DocsHub`, whose top heading is an `<h2>` ("Docs for every tool"), so the page has no `<h1>` — broken heading hierarchy for assistive tech and a weak SEO signal. Promote the heading to `<h1>` when `DocsHub` renders with `standalone`, or add a page-level `<h1>` in `src/app/docs/page.tsx`.

### PQW-017: Install and initialize the Prowl CLI (dogfooding)
**Priority**: High
**Description**: As a Prowl Tools developer, I want the Prowl CLI installed and initialized in this repo so we dogfood our own QA product on our own marketing site. Add `prowl-tools` as a devDependency (pinned, reproducible in CI — not just a global install), run `prowl init` to scaffold `.prowl/` (config + starter hunts), point `.prowl/config.yml` at `http://localhost:3000`, install the Playwright Chromium browser (`npx playwright install chromium`), and gitignore `.prowl/runs/` (run artifacts) while committing config and hunts. Prune the starter hunts that don't apply to a static marketing site (login, signup, checkout, CRUD, onboarding). Docs reference: `prowl-docs/docs/getting-started.md`.

### PQW-018: Author hunts covering the marketing site
**Priority**: High
**Description**: As a Prowl Tools developer, I want a suite of hunts that exercises every user-facing surface of prowl.tools so regressions are caught before deploy. Cover: homepage load + hero + `noConsoleErrors`; nav including the Products dropdown and mobile nav; `/cli`, `/code-review`, and `/docs` pages (headings, key content, CTAs resolving to docs.prowl.tools / review.prowl.tools / GitHub); `/blog` index, tag filtering via `?tag=`, and an individual post page; theme (dark/light) toggle; footer links; newsletter form presence. Tag hunts (`smoke` for the fast core set, `full` for everything) so CI can filter with `--include-tags`. Depends on PQW-017.

### PQW-019: CI workflow running lint, build, and Prowl hunts
**Priority**: High
**Description**: As a Prowl Tools developer, I want a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on PRs and pushes to `main`: `npm ci`, `npm run lint`, `npm run build`, then serve the production build (`npm run start`), wait for readiness, and run the Prowl hunt suite against it. Upload `.prowl/runs/` artifacts on failure for debugging. Cache npm and Playwright browser downloads to keep runs fast. Depends on PQW-017/PQW-018.

### PQW-020: Gate production deploys on CI passing
**Priority**: High
**Description**: As a Prowl Tools developer, I want deploys to prowl.tools to only happen after the CI pipeline (including hunts) passes. Vercel currently auto-deploys every push to `main`. Recommended approach: enable GitHub branch protection on `main` requiring the PQW-019 checks to pass before merge, so anything that lands on `main` (and therefore auto-deploys) has already passed hunts. Evaluate as a follow-up whether to also gate the Vercel build itself (ignored-build-step or GitHub-Actions-driven deploys) for pushes that bypass PRs. Depends on PQW-019.

## Medium Priority

### PQW-008: Wire blog post `image` frontmatter into metadata
**Priority**: Medium
**Description**: `src/lib/blog.ts` parses an `image` frontmatter field, but `generateMetadata` in `src/app/blog/[slug]/page.tsx` never uses it — posts can never get a social preview image even when one is set. Set `openGraph.images` and `twitter.images` from `post.image` (with a site-wide fallback once PQW-004 lands).

### PQW-009: RSS feed improvements (autodiscovery, escaping, sitemap)
**Priority**: Medium
**Description**: For `src/app/blog/feed.xml/route.ts`: (1) no `<link rel="alternate" type="application/rss+xml">` is emitted anywhere, so readers/browsers can't auto-detect the feed — add `alternates.types` to the blog metadata; (2) `<link>`/`<guid>` URLs are interpolated without XML-escaping (harmless today, inconsistent with `escapeXmlText` used elsewhere); (3) `lastBuildDate` uses `new Date()` in a statically generated route, so it's frozen at build time — either explicitly accept a build-time timestamp (optionally with `force-static`) or make the route dynamic/revalidated if freshness matters; (4) optionally list `/blog/feed.xml` in the sitemap.

### PQW-010: Add canonical URLs to /, /blog, and blog posts
**Priority**: Medium
**Description**: Product and docs pages set `alternates.canonical`, but `/` (layout), `/blog`, and `/blog/[slug]` do not. `/blog` is filterable via `?tag=`, so tag URLs risk duplicate-content indexing with no canonical back to `/blog`. Add canonicals to all three.

### PQW-011: Use next/link for the FinalCta internal link
**Priority**: Medium
**Description**: `src/components/FinalCta.tsx` links to `/cli#how-it-works` with a plain `<a>`, causing a full document reload with no prefetch. Switch to `<Link>`. (Same-page hash anchors elsewhere are fine as `<a>`.)

### PQW-012: Newsletter form cleanup
**Priority**: Medium
**Description**: `src/components/blog/PostFooter.tsx` puts `rel="noopener noreferrer"` on the `<form>` element, which is not a valid attribute there — remove it. Also verify the Buttondown action URL (`https://buttondown.com/api/emails/embed-subscribe/prowl`) matches the live account (Buttondown has used both `buttondown.email` and `buttondown.com` hosts).

### PQW-013: Decide canonical product naming on the site
**Priority**: Medium
**Description**: The site says "Prowl Code Review," but the workspace's canonical product name is **"Prowl Review"** (npm `prowl-review`). The site says "Prowl Infra," while the live satellite site titles itself **"Prowl Infra Hub."** Decide the customer-facing names, then update `name` in `src/lib/products.ts` (propagates to nav, footer, showcase) plus page titles in `src/app/code-review/page.tsx` and the `Prowl Suite · Code Review` badge in `src/components/CodeReview.tsx`.

## Low Priority

### PQW-003: Re-link the Genkei Labs footer to genkeilabs.com
**Priority**: Low
**Description**: The footer says "Brought to you by Genkei Labs," and during the rebrand it linked to https://genkeilabs.com — but that site isn't built yet, so the link was removed (a dead link is worse than none) and the text left in place. Once the Genkei Labs site is live, re-wrap "Genkei Labs" in the footer with the link to https://genkeilabs.com. See the `TODO(PQW-003)` comment in `src/components/Footer.tsx`.

### PQW-014: Code hygiene sweep (dead exports, button types, React keys)
**Priority**: Low
**Description**: (1) Remove or wire up unused exports: `getAllTags` (`src/lib/blog.ts`), `fadeIn`/`scaleIn` (`src/lib/animations.ts`), and the unused `'exit'` icon case in `src/components/AgentEfficiency.tsx`. (2) Add `type="button"` to non-submit buttons in `Nav.tsx`, `ui/ThemeToggle.tsx`, and `Install.tsx`. (3) Replace index-based React keys with stable fields in `ui/TypingEffect.tsx`, `CodeExample.tsx`, and `Install.tsx`.

### PQW-015: Guard against duplicate `<h1>` in MDX blog posts
**Priority**: Low
**Description**: `mdx-components.tsx` maps markdown `#` to `<h1>`, but `PostHeader` already renders the post title as `<h1>` — a post body starting with `#` would produce two. Downshift the MDX `h1` mapping to `<h2>`, or document that post bodies must start at `##`.

### PQW-016: Footer copyright year is baked at build time
**Priority**: Low
**Description**: `new Date().getFullYear()` in `src/components/Footer.tsx` runs at build time in a static page, so the year only advances on redeploy. Harmless for an actively deployed site — fix opportunistically or accept.
