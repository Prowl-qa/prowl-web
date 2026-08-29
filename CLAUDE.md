# CLAUDE.md — Prowl Tools Marketing Site

> Workspace-wide conventions (mission, branding, repo map, stack baseline, git/backlog policy)
> live in the **workspace `CLAUDE.md`** (`../../CLAUDE.md`) and load automatically. This file
> covers only what is specific to `prowl-web`.

## Project
The Prowl Tools marketing landing page. Hosted at **prowl.tools** (Vercel). The site presents
**one product — the Prowl CLI — desktop-first** (native macOS apps first, web second; see the
workspace "Focus & direction"). The homepage *is* the product page; there are no per-product
routes any more (`/cli`, `/docs`, `/hub`, `/infra` are permanent redirects).

## Design Principles
- Clean, modern aesthetic with generous whitespace
- Dark/light mode support
- Mobile-first responsive design
- Code examples use YAML hunt syntax and terminal output
- Lead with the mission (self-sovereign data, BYOK/model choice, no lock-in or metered pricing)
- CTAs point to the CLI docs (`docs.prowl.tools`) and GitHub (`github.com/prowl-tools`)
- Comparison claims (`src/lib/comparison-data.ts`) must stay factual and verifiable
  (prowl LEGAL-004); do not advertise the macOS setup as easier than it is until the
  bundled helper ships (prowl PROWL-074)
