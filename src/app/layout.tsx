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

const SITE_TITLE = "Prowl — E2E tests for native macOS and web apps from one YAML file";
const SITE_DESCRIPTION =
  "Prowl is an open-source CLI that runs the same YAML end-to-end test against a native macOS app or a web app. Deterministic runs, artifacts in your repo, bring your own key, no metered pricing.";

export const metadata: Metadata = {
  metadataBase: new URL("https://prowl.tools"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  // Site-wide RSS autodiscovery for the single blog feed (PQW-009). Placed in
  // the root layout as the conventional default so any route inherits it.
  // NOTE: Next shallow-merges `alternates`, so pages that set their own
  // `alternates.canonical` (PQW-010: /, /blog, and blog posts) replace this
  // object; those we control re-include `rssAlternateTypes`
  // to keep the feed link. Deliberately no layout-level `canonical` here — that
  // would be inherited by every child and stamp `/` onto unrelated pages.
  alternates: {
    types: rssAlternateTypes,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://prowl.tools",
    siteName: "Prowl",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
