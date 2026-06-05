# CLAUDE.md - Prowl Marketing Site

## Project
This is the Prowl marketing landing page built with Next.js 15 + Tailwind CSS.
Hosted at prowl.tools.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Structure
- `src/app/` — App Router pages and layouts
- `src/app/page.tsx` — Main landing page
- `src/app/layout.tsx` — Root layout
- `public/` — Static assets

## Design Principles
- Clean, modern aesthetic with generous whitespace
- Dark/light mode support
- Mobile-first responsive design
- Code examples should use YAML hunt syntax and terminal output
- CTAs point to docs site (docs.prowl.tools) and GitHub (github.com/prowl-tools/prowl)

## Commands
```bash
npm run dev     # Dev server on localhost:3000
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Related Repos

Use `<local_repo_root>` as a placeholder and replace it with your own local base path.
Example: `./repos` or `~/work`.

| Repo | Purpose | Local Path |
|------|---------|------------|
| `prowl-tools/prowl` | CLI tool (source of truth) | `<local_repo_root>/prowl` |
| `prowl-tools/prowl-docs` | Docs site (docs.prowl.tools) | `<local_repo_root>/prowl-docs` |
| `prowl-tools/prowl-hub` | Community hunt templates | `<local_repo_root>/prowl-hub` |
| `prowltools/prowl-twitter-bot` | Twitter bot (@prowlqa) | `<local_repo_root>/prowl-twitter-bot` |

**Backlogs**: `<local_backlog_root>/Prowl`
**Assets**: `<local_assets_root>/Prowl-QA`
