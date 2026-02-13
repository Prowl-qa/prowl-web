'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import GradientText from '@/components/ui/GradientText';
import { fadeUp, staggerContainer } from '@/lib/animations';

export default function Hero() {
  return (
    <section className="relative px-6 pt-24 pb-20 max-w-4xl mx-auto text-center overflow-hidden">
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[800px] h-[600px] rounded-full opacity-20 dark:opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, var(--cyan) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted tracking-wide uppercase">
            Open Source CLI Testing
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          YAML tests.{' '}
          <GradientText shimmer>Terminal results.</GradientText>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Write deterministic web tests in YAML. Run them from the CLI. Get
          screenshots, Playwright traces, and reports automatically.
        </motion.p>

        {/* Mascot */}
        <motion.div variants={fadeUp} className="mt-10">
          <Image
            src="/static/img/prowl-mascot.png"
            alt="Prowl mascot — a raccoon with a magnifying glass hunting for bugs"
            width={180}
            height={180}
            className="mx-auto h-36 w-36 sm:h-44 sm:w-44 drop-shadow-lg"
            priority
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://docs.prowlqa.dev/getting-started"
            className="group relative rounded-full bg-gradient-to-r from-gradient-from to-gradient-to px-7 py-3.5 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get Started
          </a>
          <a
            href="https://github.com/Prowl-qa/prowl"
            className="rounded-full border border-border px-7 py-3.5 text-sm font-semibold hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View on GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
