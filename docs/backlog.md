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