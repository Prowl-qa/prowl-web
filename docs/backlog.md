# Prowl Web - Product Backlog

**Repo**: `prowl-tools/prowl-web`
**Stack**: Next.js 16 + Tailwind CSS v4 + TypeScript + Motion
**Hosting**: Vercel at prowl.tools

---

## High Priority

## Medium Priority

### PQW-028: Update the macOS install copy once the bundled helper ships
**Priority**: Medium
**Description**: The homepage states plainly that the macOS target's Accessibility helper
(`prowl-macdriver`) is built from source today — the "Testing a native Mac app?" callout in
`src/components/Install.tsx`, the "Can Prowl test a native macOS app?" FAQ answer in
`src/lib/faq-data.ts`, and the "experimental" wording in `src/lib/comparison-data.ts`. When
`prowl` PROWL-074 (signed, bundled helper; two-minute install) ships, replace the callout with
the real `prowl init --target macos` flow, drop "experimental" for macOS (or "beta" if a caveat
remains), and re-check the comparison table's `asOf` date. Coordinate with `prowl` PROWL-075
and `prowl-docs` PQD-009 so README, docs, and site agree.
**Acceptance**: no "built from source" language on prowl.tools once the bundled helper is
released; `homepage.yml` still passes.

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

