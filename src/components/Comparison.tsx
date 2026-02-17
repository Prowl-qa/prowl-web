'use client';

import { motion } from 'motion/react';
import { comparisonData } from '@/lib/comparison-data';
import { fadeUp, staggerContainer } from '@/lib/animations';

function CheckIcon() {
  return (
    <svg className="inline-block w-4 h-4 text-cyan mr-1.5 -mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function DesktopTable() {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="sr-only">Feature comparison between Prowl QA, Playwright, and Maestro</caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="text-left py-4 px-4 font-medium text-muted w-1/4">Category</th>
            <th scope="col" className="text-left py-4 px-4 font-semibold w-1/4 bg-cyan/5 rounded-tl-lg">
              <span className="text-cyan">Prowl QA</span>
            </th>
            <th scope="col" className="text-left py-4 px-4 font-medium text-muted w-1/4">Playwright</th>
            <th scope="col" className="text-left py-4 px-4 font-medium text-muted w-1/4">Maestro</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, i) => (
            <motion.tr
              key={row.category}
              variants={fadeUp}
              className={`border-b border-border-subtle ${i === comparisonData.length - 1 ? 'border-b-0' : ''}`}
            >
              <td className="py-3.5 px-4 font-medium">{row.category}</td>
              <td className="py-3.5 px-4 bg-cyan/5 font-medium">
                {row.prowlWins && <CheckIcon />}
                {row.prowl}
              </td>
              <td className="py-3.5 px-4 text-muted">{row.playwright}</td>
              <td className="py-3.5 px-4 text-muted">{row.maestro}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MobileCards() {
  return (
    <div className="md:hidden space-y-4" aria-label="Feature comparison between Prowl QA, Playwright, and Maestro" role="region">
      {comparisonData.map((row) => (
        <motion.div
          key={row.category}
          variants={fadeUp}
          className="rounded-xl border border-border bg-surface-elevated p-4"
        >
          <h4 className="font-semibold mb-3 text-sm">{row.category}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-start">
              <span className="text-cyan font-medium">Prowl QA</span>
              <span className="text-right max-w-[60%]">
                {row.prowlWins && <CheckIcon />}
                {row.prowl}
              </span>
            </div>
            <div className="flex justify-between items-start text-muted">
              <span>Playwright</span>
              <span className="text-right max-w-[60%]">{row.playwright}</span>
            </div>
            <div className="flex justify-between items-start text-muted">
              <span>Maestro</span>
              <span className="text-right max-w-[60%]">{row.maestro}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Comparison() {
  return (
    <section className="px-6 pb-24 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-center mb-4">
          How Prowl QA compares
        </motion.h2>
        <motion.p variants={fadeUp} className="text-center text-muted mb-12 max-w-xl mx-auto">
          Purpose-built for CLI-driven web testing. No boilerplate, no complex setup.
        </motion.p>
        <motion.div
          variants={staggerContainer}
          className="rounded-xl border border-border bg-surface-elevated overflow-hidden"
        >
          <DesktopTable />
          <MobileCards />
        </motion.div>
      </motion.div>
    </section>
  );
}
