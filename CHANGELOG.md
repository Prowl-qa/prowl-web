# Changelog

All notable changes to the Prowl Tools marketing site (`prowl.tools`) are documented here.

## [Unreleased]

### Added
- Prowl CLI dogfooding setup (PQW-017): `prowl-tools` pinned as a devDependency, `.prowl/`
  scaffolded via `prowl init` (config targets `http://localhost:3002`, starter `hello` hunt),
  Chromium provisioned during install, and `.prowl/runs/` gitignored while config and hunts
  stay committed.

### Changed
- Prowl Hub and Prowl Infra links (homepage tiles, nav, footer, docs hub) now point at the
  live satellite sites `hub.prowl.tools` and `infra.prowl.tools` instead of internal
  marketing pages.
- Completed the staged Code Review docs flip: all Prowl Code Review docs CTAs now point at
  `review.prowl.tools` (live) instead of `docs.prowl.tools`.

### Fixed
- Replaced the legacy `@prowlqa` social handle with `@prowl` everywhere (footer X link and
  all page `twitter.creator` metadata).
- Removed legacy "Prowl QA" branding from the site title metadata and hero badge; README now
  says Next.js 16.

### Removed
- Internal `/hub` and `/infra` marketing pages and the `SatelliteProductLanding` component;
  the old URLs permanently redirect to the live satellite sites.
