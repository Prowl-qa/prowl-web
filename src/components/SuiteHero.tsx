'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import GradientText from '@/components/ui/GradientText';
import ProductIcon from '@/components/icons/ProductIcon';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { suiteProducts } from '@/lib/products';

export default function SuiteHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-18 sm:pt-22">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle_at_center,var(--cyan)_0%,transparent_70%)] opacity-25 dark:opacity-35 blur-3xl"
      />

      <motion.div
        className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="inline-flex rounded-full border border-border bg-surface px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted"
          >
            The Prowl QA Suite
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            A testing suite{' '}
            <GradientText shimmer>made for agents</GradientText>
            , controlled by humans.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Prowl is a family of QA tools from Genkei Labs — end-to-end testing,
            AI code review, community templates, and infrastructure validation.
            Each is CLI-first, agent-ready, and free to adopt. Pick one, or run
            the whole suite.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Explore the tools
            </a>
            <a
              href="#docs"
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-cyan/60 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Browse the docs
            </a>
          </motion.div>
        </div>

        {/* Right: product chips + mascot */}
        <motion.div variants={fadeUp} className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-3">
            {suiteProducts.map((p) => (
              <div
                key={p.slug}
                className="rounded-xl border border-border bg-surface-elevated p-4"
              >
                <ProductIcon slug={p.slug} size={20} />
                <div className="mt-2 text-sm font-semibold">{p.name}</div>
              </div>
            ))}
          </div>
          <Image
            src="/static/img/prowl-mascot.png"
            alt="Prowl mascot"
            width={144}
            height={144}
            className="absolute -bottom-10 -right-6 h-24 w-24"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
