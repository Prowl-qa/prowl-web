# Prowl Web - Product Backlog

**Repo**: `prowl-tools/prowl-web`
**Stack**: Next.js 16 + Tailwind CSS v4 + TypeScript + Motion
**Hosting**: Vercel at prowl.tools

---

## High Priority

## Medium Priority

### PQW-011: Use next/link for the FinalCta internal link
**Priority**: Medium
**Description**: `src/components/FinalCta.tsx` links to `/cli#how-it-works` with a plain `<a>`, causing a full document reload with no prefetch. Switch to `<Link>`. (Same-page hash anchors elsewhere are fine as `<a>`.)

### PQW-012: Newsletter form cleanup
**Priority**: Medium
**Description**: `src/components/blog/PostFooter.tsx` puts `rel="noopener noreferrer"` on the `<form>` element, which is not a valid attribute there — remove it. Also verify the Buttondown action URL (`https://buttondown.com/api/emails/embed-subscribe/prowl`) matches the live account (Buttondown has used both `buttondown.email` and `buttondown.com` hosts).

### PQW-013: Decide canonical product naming on the site
**Priority**: Medium
**Description**: The site says "Prowl Code Review," but the workspace's canonical product name is **"Prowl Review"** (npm `prowl-review`). The site says "Prowl Infra," while the live satellite site titles itself **"Prowl Infra Hub."** Decide the customer-facing names, then update `name` in `src/lib/products.ts` (propagates to nav, footer, showcase) plus page titles in `src/app/code-review/page.tsx` and the `Prowl Suite · Code Review` badge in `src/components/CodeReview.tsx`.

## Low Priority

### PQW-003: Re-link the Genkei Labs footer to genkeilabs.com
**Priority**: Low
**Description**: The footer says "Brought to you by Genkei Labs," and during the rebrand it linked to https://genkeilabs.com — but that site isn't built yet, so the link was removed (a dead link is worse than none) and the text left in place. Once the Genkei Labs site is live, re-wrap "Genkei Labs" in the footer with the link to https://genkeilabs.com. See the `TODO(PQW-003)` comment in `src/components/Footer.tsx`.

### PQW-014: Code hygiene sweep (dead exports, button types, React keys)
**Priority**: Low
**Description**: (1) Remove or wire up unused exports: `getAllTags` (`src/lib/blog.ts`), `fadeIn`/`scaleIn` (`src/lib/animations.ts`), and the unused `'exit'` icon case in `src/components/AgentEfficiency.tsx`. (2) Add `type="button"` to non-submit buttons in `Nav.tsx`, `ui/ThemeToggle.tsx`, and `Install.tsx`. (3) Replace index-based React keys with stable fields in `ui/TypingEffect.tsx`, `CodeExample.tsx`, and `Install.tsx`.

### PQW-015: Guard against duplicate `<h1>` in MDX blog posts
**Priority**: Low
**Description**: `mdx-components.tsx` maps markdown `#` to `<h1>`, but `PostHeader` already renders the post title as `<h1>` — a post body starting with `#` would produce two. Downshift the MDX `h1` mapping to `<h2>`, or document that post bodies must start at `##`.

### PQW-016: Footer copyright year is baked at build time
**Priority**: Low
**Description**: `new Date().getFullYear()` in `src/components/Footer.tsx` runs at build time in a static page, so the year only advances on redeploy. Harmless for an actively deployed site — fix opportunistically or accept.