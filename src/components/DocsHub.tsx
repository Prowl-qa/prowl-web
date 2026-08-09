'use client';

import { motion } from 'motion/react';
import SectionReveal from '@/components/ui/SectionReveal';
import ProductIcon from '@/components/icons/ProductIcon';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { revealVisible, type RevealMotionProps, useScrollReveal } from '@/lib/reveal';
import { suiteProducts } from '@/lib/products';

/**
 * The federated-docs front door. Each product has its own docs/app site; this
 * routes to all of them from prowl.tools, so the separate Docusaurus sites read
 * as one system. Used both as a homepage section and as the /docs page body.
 */
export default function DocsHub({ standalone = false }: { standalone?: boolean }) {
  if (standalone) {
    return <DocsHubContent standalone reveal={revealVisible} />;
  }

  return <DocsHubReveal />;
}

function DocsHubReveal() {
  const reveal = useScrollReveal();

  return (
    <SectionReveal>
      <DocsHubContent standalone={false} reveal={reveal} />
    </SectionReveal>
  );
}

function DocsHubContent({ standalone, reveal }: { standalone: boolean; reveal: RevealMotionProps }) {
  // On the standalone /docs page this section owns the page's single <h1>; when
  // embedded on the homepage the hero already owns the <h1>, so it stays an <h2>
  // to keep the heading hierarchy correct (no duplicate top-level heading).
  const Heading = standalone ? motion.h1 : motion.h2;

  return (
    <section id="docs" className={`px-6 scroll-mt-20 ${standalone ? 'pt-16 pb-20' : 'pb-20'}`}>
      <motion.div
        className="mx-auto w-full max-w-7xl"
        variants={staggerContainer}
        {...reveal}
      >
        <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-muted">
          Documentation
        </motion.p>
        <Heading variants={fadeUp} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Docs for every tool
        </Heading>
        <motion.p variants={fadeUp} className="mt-3 max-w-3xl text-muted">
          Each product has its own documentation site. Jump straight to the one
          you need — they share the same look and cross-link to each other.
        </motion.p>

        <motion.div variants={staggerContainer} className="mt-8 grid gap-4 md:grid-cols-2">
          {suiteProducts.map((product) => (
            <motion.a
              key={product.slug}
              href={product.docsHref}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="group flex items-center justify-between rounded-xl border border-border bg-surface-elevated p-5 transition-colors hover:border-cyan/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <div className="flex items-center gap-3">
                <ProductIcon slug={product.slug} size={22} />
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-muted">{product.docsHref.replace('https://', '')}</div>
                </div>
              </div>
              <span className="text-cyan transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
