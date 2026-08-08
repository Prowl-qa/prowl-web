# Prowl Web - Resolved Items

### ~~WEB-001: Feature Agent Capabilities on Landing Page~~
**Resolved**: 2026-02-16 (commit 87e5e86, branch: web-fixes)
**Description**: Added standalone AgentEfficiency section to the marketing landing page positioning Prowl QA as the token-efficient alternative to MCP-based testing. Side-by-side comparison cards show MCP tool-call approach (~15,000 tokens) vs Prowl CLI (~1,000 tokens) with syntax-highlighted code blocks and visual token bars. Four highlight cards cover `--json` structured output, structured exit codes, library API, and zero-overhead discovery. Updated "CI ready" feature card to "CI & agent ready", added agent FAQ entry. CTA links to agent integration docs.

### ~~P1.8-002: Marketing Landing Page (prowlqa.dev)~~
**Resolved**: 2026-02-13 (branch: ui-upgrade)
**Description**: Production-quality marketing landing page for Prowl at prowlqa.dev. Upgraded from scaffold to polished, component-based architecture with 11 sections.

**Architecture**:
- Extracted monolithic `page.tsx` into 11+ components (Nav, Hero, WhyE2E, HowItWorks, CodeExample, Features, Comparison, Install, Faq, FinalCta, Footer)
- Design system with CSS custom properties (`globals.css`) and Tailwind v4 `@theme inline` tokens
- Shared animation utilities (`lib/animations.ts`) and data files (`lib/features-data.ts`, `lib/comparison-data.ts`, `lib/faq-data.ts`)

**Features delivered**:
- Dark/light mode toggle with `useSyncExternalStore`, localStorage persistence, system preference fallback, and FOUC prevention via inline `<head>` script
- Framer Motion animations: scroll-triggered section reveals, stagger effects, terminal typing effect
- Hero: two-column layout with gradient headline, code card (YAML + PASS result bar), mascot overlay, install command bar
- WhyE2E: 3-card grid explaining end-to-end testing value
- HowItWorks: 4-step workflow with IDE-style syntax-highlighted code snippets
- CodeExample: side-by-side YAML hunt + terminal output with hand-coded syntax coloring and typing animation
- Features: 8-card grid with inline SVG icons and staggered scroll reveal
- Comparison table: Prowl vs Playwright vs Maestro across 8 categories (desktop table + mobile cards)
- Install: numbered steps with per-command copy-to-clipboard buttons
- FAQ: native `<details>`/`<summary>` accordion (4 items)
- FinalCta: two-column CTA with mascot image
- Brand assets: Prowl logo in nav, footer, and browser favicon; mascot in hero and CTA sections
- IDE-style syntax highlighting across Hero, HowItWorks, and CodeExample code blocks (purple keys, cyan actions, green strings, yellow keywords)

**Quality**:
- Responsive: mobile hamburger menu, responsive grids, tested at 375px/768px/1280px
- Accessibility: ARIA labels on icon-only buttons, `aria-hidden` on decorative SVGs, semantic HTML, focus-visible rings, table `<caption>` and `scope` attributes, `<nav aria-label>` on footer
- Security: `rel="noopener noreferrer"` and `target="_blank"` on all external links, clipboard error handling
- Hydration safety: consistent server/client DOM rendering, `suppressHydrationWarning` on `<html>`, `useSyncExternalStore` for theme state
- Build: `npm run lint` and `npm run build` passing with zero errors

### ~~WEB-002: Update Marketing Site with Shipped CLI Features~~
**Resolved**: 2026-02-18 (commit 8966009, branch: web-fixes)
**Description**: Updated the marketing site to reflect all CLI features shipped since launch. SEO metadata updated to mention visual regression, AI generation, and 26 step types. Hero description surfaces visual regression and AI generation. Features section replaced 4 cards (watch mode, credential redaction, zero config, old CI card) with visual regression, network mocking, conditional logic, and updated CI & agent ready; step count corrected 16→26. Agent Efficiency section overhauled to showcase the analyze→generate→run pipeline with new code snippet, updated bullets, and pipeline-focused highlight cards. Three new FAQ items added (visual regression, AI generation, network mocking) and existing agent FAQ answer rewritten to mention analyze and generate commands.

### ~~WEB-003: Fix CLI Binary Name Inconsistencies~~
**Resolved**: 2026-02-18 (commit 8966009, branch: web-fixes)
**Description**: Fixed all CLI binary name inconsistencies across the landing page. HowItWorks steps 1 and 3: `prowl` → `prowlqa`. Install section: `prowlai` → `prowlqa` (step 1), `prowl` → `prowlqa` (steps 3 and 4). Grep verified no remaining bare `prowl` or `prowlai` binary references in code examples.

### ~~WEB-004: Remove Competitor Comparison Table~~
**Resolved**: 2026-02-18 (commit 8966009, branch: web-fixes)
**Description**: Deleted `src/components/Comparison.tsx` and `src/lib/comparison-data.ts` — dead code not imported in `page.tsx`. No remaining imports or references. Focus shifted to own product value proposition rather than competitor positioning.

### ~~DOCS-003: Cross-linking to Community Hub and Landing Page~~
**Resolved**: 2026-02-18 (commit ef934b4, branch: hot-fixes)
**Description**: Updated all community hub links from GitHub repo URL to live site at `hub.prowlqa.dev`. Added "Hub" navbar link. Updated footer link and all 6 inline links in `agents.mdx`. Landing page links (`prowlqa.dev`) were already in place in both navbar and footer.

### ~~P4-004: `copyText` Step Type~~
**Resolved**: 2026-03-21 (branch: feature/copytext-random-download)
**Description**: Added `copyText: { selector, as }` step type that extracts `textContent` from an element and stores it as a runtime variable for `{{VAR}}` interpolation in subsequent steps. Includes forbidden selector check, null text content error handling, schema validation, interpolation support, and unit tests.

### ~~P4-009: `waitForDownload` Step Type~~
**Resolved**: 2026-03-21 (branch: feature/copytext-random-download)
**Description**: Added `waitForDownload` step type that captures file downloads via `page.waitForEvent('download')`. Supports bare form (`waitForDownload:` / null), optional `filename` assertion against `download.suggestedFilename()`, and configurable `timeout` (default 30s). Downloaded files saved to run artifacts directory. Schema validation, interpolation support, and unit tests included.

### ~~P6-004: Random Data Generators~~
**Resolved**: 2026-03-21 (branch: feature/copytext-random-download)
**Description**: Added built-in `{{RANDOM_*}}` variables generated once per hunt run: `RANDOM_EMAIL` (prowl_<hex>@test.com), `RANDOM_NAME` (random first+last), `RANDOM_NUMBER` (4-digit integer), `RANDOM_UUID` (v4 UUID), `RANDOM_TEXT` (8-char alphanumeric). Generated at lowest priority so env vars and hunt vars can override. Consistent within a single hunt run.

### ~~PQW-002: Add MCP / agent-native messaging to the marketing site (shipped in prowlqa 0.1.1)~~
**Resolved**: 2026-05-29 (commit e6dbfd2, branch: site-updates)
**Description**: Surfaced the agent-native MCP features shipped in prowlqa 0.1.1 on the marketing site. Added a dedicated "Native MCP server" panel to the AgentEfficiency section covering `prowlqa mcp`, the four exposed tools (`list_hunts`, `run_hunt`, `run_suite`, `list_projects`), MCP client config, no-shell-access, guardrail enforcement, automated bug-logging, and the multi-project registry. Updated the section intro to note the CLI or native MCP server, the "CI & agent ready" Features card to mention the MCP server, and reworked the AI-agents FAQ answer to present both CLI and MCP paths plus a dedicated "Does Prowl QA have an MCP server?" entry. Competitor comparison (AC #3) skipped — the only comparison table is unused/not rendered.

### ~~PQW-001: Add Links to Documentation Site and Community Hub~~
**Resolved**: 2026-06-01 (commit ee1117c, branch: close-out)
**Description**: Unblocked once the hub went live at hub.prowlqa.dev (verified HTTP 200). Updated the footer "Community Hub" link from the prowl-hub GitHub repo to hub.prowlqa.dev. Added a dedicated Community section to the landing page (after Install) highlighting the hub — ready-made hunt templates, plain copy-paste YAML, and contribute-back — with CTAs to the Hub and the prowl-hub repo. Added a "Hub" link to the nav (desktop + mobile) for prominence. Docs links were already in place (nav, hero, footer); no changes needed there.

### ~~Rebrand: Prowl QA → Prowl + suite hub (marketing site)~~
**Resolved**: 2026-06-05 (branch: rebrand-to-prowl-tools)
**Description**: Final repo of the suite rebrand. Mechanical rename across the site: ProwlQA/Prowl QA/ProwlAI→Prowl, `prowlqa` command→`prowl`, install/package→`prowl-tools` (`npm install -g prowl-tools`, `brew tap prowl-tools/tap && brew install prowl`), `prowlqa.dev`→`prowl.tools` (+ docs/hub subdomains, RSS author email), `github.com/Prowl-qa`→`prowl-tools`, and `metadata`/OG/`sitemap`/`robots`/blog-feed → `prowl.tools`. Footer now carries a "Brought to you by Genkei Labs" attribution (linking genkeilabs.com) and the copyright holder is Genkei Labs. Restructured toward a suite hub: hero still leads with the CLI, plus a new `Suite` showcase section with cards for Prowl Hub (hub.prowl.tools), Prowl Infra (infra.prowl.tools), and Prowl Code Review (coming soon). Preserved: `@prowlqa` X handle/creator, the local `Prowl-QA` assets path, and the `introducing-prowl-qa-blog` slug (URL stability). lint + build green. Note: subdomain links (hub./infra.) and the genkeilabs.com link go live with the DNS cutover.

### ~~PQW-017: Install and initialize the Prowl CLI (dogfooding)~~
**Resolved**: 2026-08-05 (commit 8b9f442, branch: prowl-cli-setup)
**Description**: Prowl CLI installed for dogfooding on the marketing site: `prowl-tools@0.1.3` pinned as a devDependency (reproducible in CI, not a global install), `.prowl/` scaffolded via `prowl init` with config targeting `http://localhost:3002` and a starter `hello` hunt, `npm run prowl:install-browsers` added to provision Playwright Chromium on demand, and run artifacts (`.prowl/runs/`, `history.json`) gitignored while config and hunts stay committed. Verified end-to-end: `npx prowl run hello` passes 2/2 steps against the production build. Note: the CLI is repo-local — invoke as `npx prowl` (no global command). Newer CLI versions ship a single starter hunt, so no starter-hunt pruning was needed.

### ~~PQW-018: Author hunts covering the marketing site~~
**Resolved**: 2026-08-06 (commit 06bff10, branch: prowl-hunts)
**Description**: Authored a 10-hunt suite exercising every user-facing surface of prowl.tools: homepage hero, desktop nav (Products dropdown verified opening via hover), mobile hamburger nav, `/cli`, `/code-review`, and `/docs` pages with heading and CTA checks (docs.prowl.tools / product satellite links / GitHub), blog index + `?tag=` filtering + post page, newsletter form presence, dark/light theme toggle (hydration-aware, works from either starting theme), and footer links. Hunts tagged `smoke` (4-hunt fast set, ~3s), `full`, and `mobile` (run with `--viewport mobile`) for CI filtering via `--include-tags`; starter `hello` hunt superseded and removed. All 10 verified passing against the production build.

### ~~PQW-021: Add page-specific Twitter metadata for the blog index~~
**Resolved**: 2026-08-07 (commit 6b97f07, branch: twitter-updates)
**Description**: Added a `twitter` block to the `/blog` metadata in `src/app/blog/page.tsx` so the blog index emits its own Twitter card (title `Blog - Prowl`, blog description, `card: "summary"`, `creator: "@prowltools"`) instead of inheriting the root layout's homepage Twitter title/description. lint + build green.

### ~~PQW-022: Point X/Twitter links and metadata at @prowltools~~
**Resolved**: 2026-08-07 (commit 65aabb1, branch: twitter-updates)
**Description**: Repointed every X/Twitter reference from the unowned `@prowl` handle to the live `@prowltools` account: `twitter.creator` in `src/app/layout.tsx`, `src/app/cli/page.tsx`, `src/app/docs/page.tsx`, and `src/app/code-review/page.tsx`; the footer social link in `src/components/Footer.tsx` (`https://x.com/prowltools`); and the matching footer hunt assertion in `.prowl/hunts/footer.yml`. The `@prowl-review` PR-bot name was deliberately left untouched. lint + build green.

### ~~PQW-019: CI workflow running lint, build, and Prowl hunts~~
**Resolved**: 2026-08-07 (commit 8dbf728, branch: ci-workflow)
**Description**: Added `.github/workflows/ci.yml` running on pull requests and pushes to `main`: `npm ci`, `npm run lint`, `npm run build`, then serves the production build (`npm run start`, port 3002) and polls it with a `curl` retry loop until ready before running the Prowl hunt suite. Uses the dedicated `prowl ci` command against `http://localhost:3002` in two passes — desktop hunts via `--include-tags full`, and the `mobile`-tagged hunt via `--include-tags mobile --viewport mobile` (matching how the PQW-018 suite is authored). Chromium is provisioned with `playwright install --with-deps chromium`; the npm cache (via `actions/setup-node`) and `~/.cache/ms-playwright` (keyed on the installed Playwright version, 1.62.1) are cached; and `.prowl/runs/` plus the server log upload as artifacts on failure. Validated locally: actionlint clean, and a full dry-run of build → start → poll → both `prowl ci` passes green (9 desktop hunts + 1 mobile hunt), with `prowl ci` confirmed to exit 0 on pass / 1 on failure for CI gating. The follow-up PQW-020 (branch protection / deploy gating) remains open.
