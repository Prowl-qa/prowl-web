import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import SuiteHero from '@/components/SuiteHero';
import ProductShowcase from '@/components/ProductShowcase';
import WhyProwl from '@/components/WhyProwl';
import DocsHub from '@/components/DocsHub';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import { rssAlternateTypes } from '@/lib/rss';

// Canonical for the homepage (PQW-010). Set here on the page, NOT on the root
// layout: a layout-level `alternates.canonical` is inherited by every child
// route that doesn't override it, which would stamp `/` onto unrelated pages.
// `types` is re-included because Next shallow-merges `alternates`, so setting
// `canonical` here replaces the layout's `alternates` (dropping autodiscovery).
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    types: rssAlternateTypes,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <SuiteHero />
        <ProductShowcase />
        <WhyProwl />
        <DocsHub />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
