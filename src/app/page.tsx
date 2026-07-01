import Nav from '@/components/Nav';
import SuiteHero from '@/components/SuiteHero';
import ProductShowcase from '@/components/ProductShowcase';
import WhyProwl from '@/components/WhyProwl';
import DocsHub from '@/components/DocsHub';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

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
