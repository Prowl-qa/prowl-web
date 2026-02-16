'use client';

import { motion } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import { fadeUp, staggerContainer } from '@/lib/animations';

const points = [
  {
    title: 'Most regressions happen between features',
    text: 'Unit tests can pass while user journeys fail. Prowl QA validates real flow behavior across routes, forms, and state changes.',
  },
  {
    title: 'Manual QA does not scale with release speed',
    text: 'As teams ship faster, checklist testing becomes inconsistent. Prowl QA makes critical paths repeatable on every commit.',
  },
  {
    title: 'New builders need guardrails, not complexity',
    text: 'Vibe-coding teams can still ship safely by defining readable hunts and running them in a predictable CLI workflow.',
  },
];

export default function WhyE2E() {
  return (
    <SectionReveal>
      <section className="px-6 pb-20">
        <motion.div
          className="mx-auto w-full max-w-6xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Why end-to-end testing has to be first-class
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-muted">
            Fast shipping only works when critical user flows are always verified. Prowl QA turns that discipline into a lightweight daily habit.
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
