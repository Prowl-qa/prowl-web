'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import { fadeUp, staggerContainer } from '@/lib/animations';

const products = [
  {
    name: 'Prowl Hub',
    text: 'A growing library of community-contributed hunt templates — browse real-world flows, copy the YAML, and adapt it to your app.',
    href: 'https://hub.prowl.tools',
    cta: 'Browse the Hub',
  },
  {
    name: 'Prowl Infra',
    text: 'A catalog of infrastructure test playbooks — validate cloud and Terraform environments before you ship.',
    href: 'https://infra.prowl.tools',
    cta: 'Explore Prowl Infra',
  },
  {
    name: 'Prowl Code Review',
    text: 'BYOK AI code review for pull requests — multi-pass specialists, cross-file context, and committable fixes. Your key, your provider, no rate limits.',
    href: '/code-review',
    cta: 'Learn more',
  },
];

export default function Suite() {
  return (
    <SectionReveal>
      <section id="suite" className="px-6 pb-20 scroll-mt-20">
        <motion.div
          className="mx-auto w-full max-w-7xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-muted">
            The Prowl Suite
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            More than a CLI
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-muted">
            Prowl is a growing suite of testing tools from Genkei Labs. The CLI is the core — these
            build on it.
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-8 grid gap-4 md:grid-cols-3">
            {products.map((product) => (
              <motion.article
                key={product.name}
                variants={fadeUp}
                className="flex flex-col rounded-xl border border-border bg-surface-elevated p-5"
              >
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.text}</p>
                {product.href ? (
                  product.href.startsWith('/') ? (
                    <Link
                      href={product.href}
                      className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-cyan transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
                    >
                      {product.cta} <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-cyan transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
                    >
                      {product.cta} <span aria-hidden="true">→</span>
                    </a>
                  )
                ) : (
                  <span className="mt-4 inline-flex w-fit items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                    {product.cta}
                  </span>
                )}
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </SectionReveal>
  );
}
