import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://prowlqa.dev"),
  title: "Prowl QA - YAML-Powered E2E Testing with Visual Regression and AI Generation",
  description:
    "Write end-to-end tests in YAML, catch visual regressions automatically, and generate tests with AI. 26 step types, Playwright precision, and rich debugging artifacts — all from the terminal.",
  openGraph: {
    title: "Prowl QA - YAML-Powered E2E Testing with Visual Regression and AI Generation",
    description:
      "Write end-to-end tests in YAML, catch visual regressions automatically, and generate tests with AI. 26 step types, Playwright precision, and rich debugging artifacts — all from the terminal.",
    url: "https://prowlqa.dev",
    siteName: "Prowl QA",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Prowl QA - YAML-Powered E2E Testing with Visual Regression and AI Generation",
    description:
      "Write end-to-end tests in YAML, catch visual regressions automatically, and generate tests with AI. 26 step types, Playwright precision, and rich debugging artifacts — all from the terminal.",
    creator: "@prowlqa",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
