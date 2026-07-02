'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'motion/react';
import GradientText from '@/components/ui/GradientText';
import SectionReveal from '@/components/ui/SectionReveal';
import ProductIcon from '@/components/icons/ProductIcon';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { getProduct, suiteProducts } from '@/lib/products';

/**
 * Marketing landing for a suite product whose primary destination is its own
 * satellite site/app (Hub, Infra). Keeps a consistent page template across the
 * suite while pointing users to the live product.
 */
export default function SatelliteProductLanding({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();
  const others = suiteProducts.filter((p) => p.slug !== slug);

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-18 sm:pt-22">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[720px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle_at_center,var(--cyan)_0%,transparent_70%)] opacity-25 dark:opacity-35 blur-3xl"
        />
        <motion.div
          className="relative mx-auto w-full max-w-4xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <ProductIcon slug={product.slug} size={44} />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">
            Prowl Suite
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            <GradientText shimmer>{product.name}</GradientText>
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {product.tagline}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={product.docsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-3 text-sm font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-cyan/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              {product.docsLabel}
            </a>
            <Link
              href="/#products"
              className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-cyan/60 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              See the whole suite
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <SectionReveal>
        <section className="px-6 pb-20">
          <motion.div
            className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {product.points.map((point) => (
              <motion.div
                key={point}
                variants={fadeUp}
                className="rounded-xl border border-border bg-surface-elevated p-6 text-sm leading-relaxed"
              >
                {point}
              </motion.div>
            ))}
          </motion.div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="px-6 pb-24">
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-border bg-surface-elevated p-8">
            <h2 className="text-xl font-semibold">More from the Prowl suite</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="rounded-xl border border-border p-4 transition-colors hover:border-cyan/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <div className="flex items-center gap-2">
                    <ProductIcon slug={p.slug} size={18} />
                    <span className="text-sm font-semibold">{p.name}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{p.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>
    </>
  );
}
