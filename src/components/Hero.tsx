'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import GradientText from '@/components/ui/GradientText';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-18 sm:pt-22">
      {/* Background gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 dark:opacity-35 blur-3xl"
        style={{
          background: 'radial-gradient(circle at center, var(--cyan) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left column: text content */}
        <div>
          {/* Badge */}
          <motion.p
            variants={fadeUp}
            className="inline-flex rounded-full border border-border bg-surface px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted"
          >
            CLI-First End-to-End Testing
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Ship confident releases with{' '}
            <GradientText shimmer>full-flow coverage</GradientText>{' '}
            in minutes.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Prowl helps QA engineers and developers catch cross-feature regressions
            before users do. Write readable hunts in YAML, run from the terminal, and
            collect debugging artifacts automatically.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="https://www.npmjs.com/package/prowlai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Install the CLI
            </a>
            <a
              href="https://github.com/Prowl-qa/prowl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-cyan/60 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Star on GitHub
            </a>
          </motion.div>

          {/* Install command bar */}
          <motion.div
            variants={fadeUp}
            className="mt-6 max-w-md rounded-xl border border-border bg-code-bg/80 px-4 py-3 font-mono text-xs text-zinc-300"
          >
            <span className="text-muted">$</span> npm install -g prowlai
          </motion.div>
        </div>

        {/* Right column: code card + mascot */}
        <motion.div variants={fadeUp} className="relative hidden lg:block">
          <div className="relative rounded-2xl border border-border bg-surface-elevated p-6 shadow-[0_25px_80px_-35px_rgba(0,0,0,0.55)]">
            {/* Card header */}
            <div className="mb-4 flex items-center justify-between text-xs text-muted">
              <span>release-check.hunt.yaml</span>
              <span>critical-flow suite</span>
            </div>

            {/* YAML code block */}
            <pre className="rounded-lg border border-border-subtle bg-code-bg p-4 text-xs leading-relaxed font-mono text-zinc-300">
              <code>{`name: checkout-flow
steps:
  - navigate: "/cart"
  - click: "Checkout"
  - fill: "Email" "{{TEST_EMAIL}}"
  - click: "Pay now"
  - assert: visible "Order confirmed"`}</code>
            </pre>

            {/* Result bar */}
            <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/12 px-3 py-2 text-xs text-emerald-300">
              PASS 1 hunt, 5 steps, 0 failures
            </div>
          </div>

          {/* Mascot */}
          <Image
            src="/static/img/prowl-mascot.png"
            alt="Prowl mascot"
            width={144}
            height={144}
            className="absolute -bottom-8 -right-6 h-28 w-28"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
