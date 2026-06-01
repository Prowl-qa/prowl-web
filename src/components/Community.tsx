'use client';

import { motion } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import { fadeUp, staggerContainer } from '@/lib/animations';

const points = [
  {
    title: 'Ready-made hunts',
    text: 'Battle-tested templates for common flows — login, checkout, search, form validation. Copy a hunt, swap in your selectors, and run.',
  },
  {
    title: 'Plain copy-paste YAML',
    text: 'Every template is readable YAML with no setup. Drop it into your .prowlqa/ directory and you have coverage in minutes.',
  },
  {
    title: 'Contribute back',
    text: 'Built a useful hunt? Share it with the community through a pull request to the hub so the next team starts even faster.',
  },
];

export default function Community() {
  return (
    <SectionReveal>
      <section id="community" className="px-6 pb-20 scroll-mt-20">
        <motion.div
          className="mx-auto w-full max-w-7xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-muted">
            Community Hub
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Don&apos;t start from scratch
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-muted">
            The Prowl QA Hub is a growing library of community-contributed hunt templates. Browse
            real-world flows, copy the YAML, and adapt it to your app — then give back the hunts your
            team builds along the way.
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-8 grid gap-4 md:grid-cols-3">
            {points.map((point) => (
              <motion.article
                key={point.title}
                variants={fadeUp}
                className="rounded-xl border border-border bg-surface-elevated p-5"
              >
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.text}</p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://docs.prowlqa.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Browse the Hub
            </a>
            <a
              href="https://github.com/Prowl-qa/prowl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background/85 px-6 py-3 text-sm font-semibold transition hover:border-cyan/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Contribute on GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>
    </SectionReveal>
  );
}
