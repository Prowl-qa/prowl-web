# CLAUDE.md — Prowl Tools Marketing Site

> Workspace-wide conventions (mission, branding, repo map, stack baseline, git/backlog policy)
> live in the **workspace `CLAUDE.md`** (`../../CLAUDE.md`) and load automatically. This file
> covers only what is specific to `prowl-web`.

## Project
The Prowl Tools marketing landing page. Hosted at **prowl.tools** (Vercel). This is the site
being rebranded to present the full Prowl product family (see the workspace repo map), not just
the CLI.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Structure
- `src/app/` — App Router pages and layouts
- `src/app/page.tsx` — main landing page
- `src/app/layout.tsx` — root layout
- `public/` — static assets

## Design Principles
- Clean, modern aesthetic with generous whitespace
- Dark/light mode support
- Mobile-first responsive design
- Code examples use YAML hunt syntax and terminal output
- Lead with the mission (self-sovereign data, BYOK/model choice, no lock-in or metered pricing)
- CTAs point to the docs sites (`docs.prowl.tools`, `review.prowl.tools`) and GitHub
  (`github.com/prowl-tools`)

## Commands
```bash
npm run dev     # Dev server on localhost:3000
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```
