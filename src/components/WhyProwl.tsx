'use client';

import { motion } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { suitePillars } from '@/lib/products';

export default function WhyProwl() {
  return (
    <SectionReveal>
      <section id="why" className="px-6 pb-20 scroll-mt-20">
        <motion.div
          className="mx-auto w-full max-w-7xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-muted">
            Why Prowl
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            What makes it a suite, not a toolbox
          </motion.h2>

          <motion.div variants={staggerContainer} className="mt-8 grid gap-4 md:grid-cols-2">
            {suitePillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="rounded-xl border border-border bg-surface-elevated p-6"
              >
                <h3 className="text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </SectionReveal>
  );
}
