import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WhyE2E from '@/components/WhyE2E';
import HowItWorks from '@/components/HowItWorks';
import CodeExample from '@/components/CodeExample';
import AgentEfficiency from '@/components/AgentEfficiency';
import Features from '@/components/Features';
import Install from '@/components/Install';
import Community from '@/components/Community';
import Suite from '@/components/Suite';
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
        <AgentEfficiency />
        <Features />
        <Install />
        <Community />
        <Suite />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
