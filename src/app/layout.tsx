import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RevealHydrationProvider } from "@/lib/reveal";
import { rssAlternateTypes } from "@/lib/rss";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SUITE_TITLE = "Prowl — the testing suite made for agents, controlled by humans";
const SUITE_DESCRIPTION =
  "Prowl is a QA suite from Genkei Labs: deterministic E2E testing in YAML, infrastructure validation, and BYOK AI code review — CLI-first, agent-ready, no runaway cost.";

export const metadata: Metadata = {
  metadataBase: new URL("https://prowl.tools"),
  title: SUITE_TITLE,
  description: SUITE_DESCRIPTION,
  // Site-wide RSS autodiscovery for the single blog feed (PQW-009). Placed in
  // the root layout as the conventional default so any route inherits it.
  // NOTE: Next shallow-merges `alternates`, so pages that set their own
  // `alternates.canonical` (PQW-010: /, /blog, blog posts, and the product
  // pages) replace this object; those we control re-include `rssAlternateTypes`
  // to keep the feed link. Deliberately no layout-level `canonical` here — that
  // would be inherited by every child and stamp `/` onto unrelated pages.
  alternates: {
    types: rssAlternateTypes,
  },
  openGraph: {
    title: SUITE_TITLE,
    description: SUITE_DESCRIPTION,
    url: "https://prowl.tools",
    siteName: "Prowl",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SUITE_TITLE,
    description: SUITE_DESCRIPTION,
    creator: "@prowltools",
  },
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <RevealHydrationProvider>
            {children}
          </RevealHydrationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
