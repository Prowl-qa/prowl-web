import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SatelliteProductLanding from "@/components/SatelliteProductLanding";

const TITLE = "Prowl Infra — infrastructure test playbooks";
const DESCRIPTION =
  "A catalog of infrastructure test playbooks — validate cloud and Terraform environments before you ship, with the same CLI-first, agent-ready philosophy.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/infra" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://prowl.tools/infra", siteName: "Prowl", type: "website", locale: "en_US" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, creator: "@prowlqa" },
};

export default function InfraPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <SatelliteProductLanding slug="infra" />
      </main>
      <Footer />
    </div>
  );
}
