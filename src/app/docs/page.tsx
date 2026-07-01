import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DocsHub from "@/components/DocsHub";

const TITLE = "Prowl docs — documentation for the whole suite";
const DESCRIPTION =
  "Documentation for every Prowl tool: the CLI, Code Review, Hub, and Infra. Jump to the docs site for the product you're using.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/docs" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://prowl.tools/docs", siteName: "Prowl", type: "website", locale: "en_US" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, creator: "@prowlqa" },
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <DocsHub standalone />
      </main>
      <Footer />
    </div>
  );
}
