import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyE2E from "@/components/WhyE2E";
import HowItWorks from "@/components/HowItWorks";
import CodeExample from "@/components/CodeExample";
import AgentEfficiency from "@/components/AgentEfficiency";
import Features from "@/components/Features";
import Install from "@/components/Install";
import Community from "@/components/Community";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

const TITLE = "Prowl CLI — deterministic E2E testing with YAML hunts";
const DESCRIPTION =
  "Write E2E tests in YAML, run them with Playwright precision, and detect visual regressions automatically — all from the CLI. Agent-ready, with an MCP server.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cli" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://prowl.tools/cli",
    siteName: "Prowl",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, creator: "@prowl" },
};

export default function CliPage() {
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
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
