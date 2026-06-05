'use client';

import { motion } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import { fadeUp, staggerContainer } from '@/lib/animations';

const points = [
  {
    title: 'Regressions hide in user flows, not units',
    text: 'Unit tests pass while checkout breaks. Prowl validates real user journeys across routes, forms, and state transitions so regressions surface before users hit them.',
  },
  {
    title: 'Release speed demands repeatable QA',
    text: 'Manual checklists drift as teams ship faster. Prowl gives QA engineers and developers a shared, automated path to verify critical flows on every commit.',
  },
  {
    title: 'Test discipline should be easy to adopt',
    text: 'Teams adopting E2E testing need a low-friction starting point. Readable YAML hunts and a single CLI command make it practical to add flow coverage from day one.',
  },
];

export default function WhyE2E() {
  return (
    <SectionReveal>
      <section className="px-6 pb-20">
        <motion.div
          className="mx-auto w-full max-w-7xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Why end-to-end testing has to be first-class
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-muted">
            Fast shipping only works when critical user flows are always verified. Prowl turns that discipline into a lightweight daily habit.
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
        </motion.div>
      </section>
    </SectionReveal>
  );
}
