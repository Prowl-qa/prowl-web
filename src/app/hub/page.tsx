import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SatelliteProductLanding from "@/components/SatelliteProductLanding";

const TITLE = "Prowl Hub — community hunt templates";
const DESCRIPTION =
  "Browse a growing library of community-contributed Prowl hunt templates — copy real-world YAML flows and adapt them to your app.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/hub" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://prowl.tools/hub", siteName: "Prowl", type: "website", locale: "en_US" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, creator: "@prowlqa" },
};

export default function HubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <SatelliteProductLanding slug="hub" />
      </main>
      <Footer />
    </div>
  );
}
