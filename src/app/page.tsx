import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WhyE2E from '@/components/WhyE2E';
import HowItWorks from '@/components/HowItWorks';
import CodeExample from '@/components/CodeExample';
import Features from '@/components/Features';
import Comparison from '@/components/Comparison';
import Install from '@/components/Install';
import Faq from '@/components/Faq';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <WhyE2E />
        <HowItWorks />
        <CodeExample />
        <Features />
        <Comparison />
        <Install />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
