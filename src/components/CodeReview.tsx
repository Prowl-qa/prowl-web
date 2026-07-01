'use client';

import { motion } from 'motion/react';
import GradientText from '@/components/ui/GradientText';
import SectionReveal from '@/components/ui/SectionReveal';
import { fadeUp, staggerContainer } from '@/lib/animations';

const DOCS_URL = 'https://review.prowl.tools';
const REPO_URL = 'https://github.com/prowl-tools/prowl-code-review';

const differentiators = [
  {
    title: 'Agentic cross-file context',
    text: 'The reviewer reads callers, definitions, and related files on demand — no vector DB, no indexing — so it catches broken callers and contract violations a diff-only pass misses.',
  },
  {
    title: 'Multi-pass specialists + judge',
    text: 'Parallel correctness, security, performance, and test lenses are merged and de-duplicated by a judge pass into one clean, ranked result — optionally across multiple providers at once.',
  },
  {
    title: 'Linter / SAST grounding',
    text: 'ESLint, Ruff, Gitleaks, Semgrep, and osv-scanner feed real signals into the review, so deterministic issues are caught and hallucinations are curbed.',
  },
  {
    title: 'False-positive verification',
    text: 'A skeptical second pass plus confidence scoring and a severity threshold keep the output high-signal — fewer nitpicks, more real bugs.',
  },
];

const byok = [
  { k: 'Your key', v: 'Bring your own Claude, OpenAI, or Gemini API key. It never leaves your runner.' },
  { k: 'Your provider', v: 'Inference goes straight to your provider — no proxy, no prowl-review server, no telemetry.' },
  { k: 'No rate limits', v: 'You pay the provider directly, so we never meter usage. Per-review cost stays in cents.' },
];

export default function CodeReview() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-16 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[760px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 dark:opacity-35 blur-3xl"
          style={{ background: 'radial-gradient(circle at center, var(--cyan) 0%, transparent 70%)' }}
        />
        <motion.div
          className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="inline-flex rounded-full border border-border bg-surface px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted"
            >
              Prowl Suite · Code Review
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              AI code review that{' '}
              <GradientText shimmer>catches real bugs</GradientText>
              , on your own key.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              prowl-review posts a walkthrough summary, inline findings with
              committable fixes, and an <code>@prowl-review</code> chat bot on every
              pull request — using multi-pass specialists, cross-file context, and
              linter/SAST grounding. BYOK, zero hosting, no rate limits.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Add to your repo
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-cyan/60 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                View on GitHub
              </a>
            </motion.div>
          </div>

          {/* Mock published review card */}
          <motion.div variants={fadeUp} className="relative hidden lg:block">
            <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-[0_25px_80px_-35px_rgba(0,0,0,0.55)]">
              <div className="mb-4 flex items-center justify-between text-xs text-muted">
                <span>🦝 prowl-review</span>
                <span>#128 · Add OAuth token refresh</span>
              </div>
              <div className="rounded-lg border border-border-subtle bg-code-bg p-4 text-xs leading-relaxed font-mono text-zinc-300">
                <div className="text-zinc-400">Impact: Low · Findings: 🔴 1 🟠 1</div>
                <div className="mt-3 text-red-400">🔴 critical · src/auth/refresh.ts:42</div>
                <div className="text-zinc-300">Refresh failure swallowed — caller sees a stale token.</div>
                <div className="mt-3 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-300">
                  ＋ suggestion
                  <br />
                  if (!res.ok) throw new TokenRefreshError(res.status);
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Differentiators */}
      <SectionReveal>
        <section className="px-6 pb-20">
          <motion.div
            className="mx-auto w-full max-w-7xl"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-muted">
              Not another diff-only reviewer
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Four techniques that catch what single-pass review misses
            </motion.h2>
            <motion.div variants={staggerContainer} className="mt-8 grid gap-4 md:grid-cols-2">
              {differentiators.map((d) => (
                <motion.article
                  key={d.title}
                  variants={fadeUp}
                  className="rounded-xl border border-border bg-surface-elevated p-5"
                >
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </SectionReveal>

      {/* BYOK strip */}
      <SectionReveal>
        <section className="px-6 pb-20">
          <div className="mx-auto w-full max-w-7xl rounded-2xl border border-border bg-surface-elevated p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              <GradientText>Your key. Your provider. No rate limits.</GradientText>
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {byok.map((b) => (
                <div key={b.k}>
                  <h3 className="text-sm font-semibold text-cyan">{b.k}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{b.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Install */}
      <SectionReveal>
        <section className="px-6 pb-20">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Get started in two steps</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Add it to a repo</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Add your provider key as the <code>PROWL_AI_KEY</code> secret, then drop
              in the workflow. Open a PR and prowl-review posts a review.
            </p>
            <pre className="mt-6 max-w-3xl overflow-x-auto rounded-xl border border-border bg-code-bg p-5 text-xs leading-relaxed font-mono text-zinc-300">
              <code>{`# .github/workflows/prowl-review.yml
name: prowl-review
on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
permissions:
  pull-requests: write
  issues: write
  checks: write
  contents: read
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: prowl-tools/prowl-code-review@v1
        with:
          ai-key: \${{ secrets.PROWL_AI_KEY }}`}</code>
            </pre>
            <div className="mt-6">
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-cyan transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
              >
                Read the docs <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA */}
      <SectionReveal>
        <section className="px-6 pb-24">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface-elevated p-10 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Ship with a reviewer that pays for itself in bugs caught.</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Free forever, BYOK. Made for agents, controlled by humans.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Get started
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-cyan/60 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                Star on GitHub
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>
    </>
  );
}
