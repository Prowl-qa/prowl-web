'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import ProductIcon from '@/components/icons/ProductIcon';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { isExternalHref, suiteProducts } from '@/lib/products';

export default function ProductShowcase() {
  return (
    <SectionReveal>
      <section id="products" className="px-6 pb-20 scroll-mt-20">
        <motion.div
          className="mx-auto w-full max-w-7xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-muted">
            The tools
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Four tools, one testing philosophy
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-muted">
            Each product stands on its own and shares the same DNA — CLI-first,
            agent-ready, and yours to own. Start anywhere.
          </motion.p>

          <motion.div variants={staggerContainer} className="mt-8 grid gap-4 md:grid-cols-2">
            {suiteProducts.map((product) => (
              <motion.article
                key={product.slug}
                variants={fadeUp}
                className="flex flex-col rounded-xl border border-border bg-surface-elevated p-6"
              >
                <div className="flex items-center gap-3">
                  <ProductIcon slug={product.slug} size={22} />
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{product.tagline}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
                  {product.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-0.5 text-cyan" aria-hidden="true">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  {isExternalHref(product.href) ? (
                    <a
                      href={product.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-gradient-from to-gradient-to px-4 py-2 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                    >
                      Learn more <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-gradient-from to-gradient-to px-4 py-2 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  {product.docsHref !== product.href && (
                    <a
                      href={product.docsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-cyan transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
                    >
                      {product.docsLabel} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </SectionReveal>
  );
}
