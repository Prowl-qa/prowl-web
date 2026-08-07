# Changelog

All notable changes to the Prowl Tools marketing site (`prowl.tools`) are documented here.

## [Unreleased]

### Added
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

### Changed
- Prowl Hub and Prowl Infra links (homepage tiles, nav, footer, docs hub) now point at the
  live satellite sites `hub.prowl.tools` and `infra.prowl.tools` instead of internal
  marketing pages.

### Fixed
- Pointed all X/Twitter links and metadata at the live `@prowltools` account (PQW-022):
  the footer X link (`https://x.com/prowltools`) and every page's `twitter.creator`. Replaces
  the earlier `@prowl` handle, which is not ours (`@prowl` was unavailable when the account was
  renamed from the legacy `@prowlqa`). Does not touch the `@prowl-review` PR bot name.
- Removed legacy "Prowl QA" branding from the site title metadata and hero badge; README now
  says Next.js 16.

### Removed
- Internal `/hub` and `/infra` marketing pages and the `SatelliteProductLanding` component;
  the old URLs permanently redirect to the live satellite sites.
