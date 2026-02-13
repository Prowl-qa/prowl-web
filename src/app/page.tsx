import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import CodeExample from '@/components/CodeExample';
import Features from '@/components/Features';
import Comparison from '@/components/Comparison';
import Install from '@/components/Install';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <CodeExample />
        <Features />
        <Comparison />
        <Install />
      </main>
      <Footer />
    </div>
  );
}
