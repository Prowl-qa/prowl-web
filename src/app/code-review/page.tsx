import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CodeReview from "@/components/CodeReview";

const TITLE = "Prowl Code Review — BYOK AI code review for pull requests";
const DESCRIPTION =
  "prowl-review posts a walkthrough summary, inline findings with committable fixes, and an @prowl-review bot on every PR — multi-pass specialists, cross-file context, and linter/SAST grounding. BYOK, no rate limits.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/code-review" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://prowl.tools/code-review",
    siteName: "Prowl",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@prowltools",
  },
};

export default function CodeReviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <CodeReview />
      </main>
      <Footer />
    </div>
  );
}
