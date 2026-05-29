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
