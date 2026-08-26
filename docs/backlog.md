# Prowl Web - Product Backlog

**Repo**: `prowl-tools/prowl-web`
**Stack**: Next.js 16 + Tailwind CSS v4 + TypeScript + Motion
**Hosting**: Vercel at prowl.tools

---

## High Priority

### PQW-024: Announce the mobile targets (Android + iOS) on the landing page
**Priority**: High
**Description**: Prowl v0.1.5 (released 2026-08-21) shipped experimental Android (emulator +
USB device) and iOS Simulator targets — the "major shipped feature" tier the workspace rules
say must reach the landing site. Update prowl.tools to tell the four-target story: **web,
macOS, Android, iOS** — one YAML hunt format, one selector philosophy, local-first, no cloud
required. Concrete surfaces: the hero/feature section (platform coverage), any "how it works"
copy that currently implies web-only, and the competitor comparison table (Maestro requires a
JVM and has no desktop-app story; BrowserStack has no native desktop testing at all — mind the
FTC comparative-advertising guidelines in the CLI repo's LEGAL-004: factual, verifiable claims
only). Label mobile as **experimental** honestly — same wording tier the CLI README uses.
Coordinate messaging with the CLI repo's PROWL-037 (GTM-002 positioning matrix) so claims stay
consistent; don't block on it.

## Medium Priority

## Low Priority

### PQW-003: Re-link the Genkei Labs footer to genkeilabs.com
**Priority**: Low
**Description**: The footer says "Brought to you by Genkei Labs," and during the rebrand it linked to https://genkeilabs.com — but that site isn't built yet, so the link was removed (a dead link is worse than none) and the text left in place. Once the Genkei Labs site is live, re-wrap "Genkei Labs" in the footer with the link to https://genkeilabs.com. See the `TODO(PQW-003)` comment in `src/components/Footer.tsx`.

### PQW-016: Footer copyright year is baked at build time
**Priority**: Low
**Description**: `new Date().getFullYear()` in `src/components/Footer.tsx` runs at build time in a static page, so the year only advances on redeploy. Harmless for an actively deployed site — fix opportunistically or accept.

### PQW-023: Launch a blog newsletter (blocked: needs execution plan)
**Priority**: Low
**Description**: Owner intends to start a newsletter but is holding off until there's a plan for producing content (as of 2026-08-10, no provider account exists and no first-post timeline). When ready: pick a provider, create the account, then restore the newsletter CTA in `src/components/blog/PostFooter.tsx` (removed under PQW-012 — recover the block from git history) pointing at the real signup endpoint, and re-add the blog hunt assertion for the form. Do not un-block this item until the provider account actually exists.

## Sunset Work Items

Decision (2026-08-26): Prowl Hub and Prowl Infra Hub are being retired, prowl-review moves to
maintenance mode as a personal tool, and the Prowl CLI becomes the single product — positioned
desktop-first (macOS) with web as the second target. The site must stop advertising four
products. See the sunset sections in each of those repos' backlogs for the repo-side work.

### PQW-025: Remove Prowl Hub and Prowl Infra Hub from the site
**Priority**: High
**Description**: Delete the `hub` and `infra` entries from `src/lib/products.ts` and everything
that renders from them (homepage showcase, nav/footer, `DocsHub`, `ProductIcon`), remove the
"Community Hub" section in `src/components/Community.tsx` (links to hub.prowl.tools), fix the
`/docs` page description ("the CLI, Code Review, Hub, and Infra"), update `sitemap.ts`, and
add redirects (or 410s) for any retired routes. Update the affected landing hunts in
`.prowl/hunts/` (`homepage.yml`, `nav-desktop.yml`, `nav-mobile.yml`, `footer.yml`,
`docs-page.yml`) so CI stays green. In the same pass, edit the workspace `CLAUDE.md` repo map
and customer-facing display-name decision (it is workspace-level, not in any repo) so the
"single source of truth" stops listing retired products.
**Acceptance**: no mention of Hub/Infra Hub anywhere on prowl.tools; all landing hunts pass;
workspace `CLAUDE.md` updated.

### PQW-026: Demote Prowl Code Review to a footnote
**Priority**: High
**Description**: Counterpart of `prowl-code-review` item 69. Remove the `code-review` product
entry and the `/code-review` route (redirect to the GitHub repo), or replace with a single
honest line ("we also open-sourced the BYOK reviewer we run on our own PRs — maintained, no
roadmap") near the footer/community area. Delete `.prowl/hunts/code-review-page.yml` or
re-point it at whatever remains. Remove the `review.prowl.tools` link once
`prowl-code-review` item 68 takes the docs site down.
**Acceptance**: prowl.tools presents one product; any prowl-review mention links to the repo.

### PQW-027: Reposition the landing page desktop-first (re-scopes PQW-024)
**Priority**: High
**Description**: PQW-024 asked for a "four-target story". The sharper story is: **the only
declarative E2E tool that drives native macOS apps (including menu-bar extras) and your web
app from the same YAML** — lead with macOS where there is no incumbent, keep web as the
second target, and mention Android/iOS as experimental at most. Rewrite the hero, feature
grid, and comparison table accordingly (Maestro: mobile/web, no desktop; Playwright: web only;
XCUITest: Swift + Xcode). Keep claims factual per the CLI repo's LEGAL-004. Blocked on the
macOS target being a two-minute install (`prowl` PROWL-052 / SUNSET-002) — do not advertise a
setup that requires a Swift toolchain. Coordinate wording with `prowl` PROWL-075 (README
headline) and `prowl-docs` PQD-009.
**Acceptance**: hero leads with desktop; comparison table updated; `homepage.yml` and
`cli-page.yml` hunts updated and passing.
