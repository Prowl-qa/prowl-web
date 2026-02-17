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
  title: "Prowl QA - CLI-First QA Testing for the Web",
  description:
    "Write tests in YAML. Run them from the terminal. Get screenshots, traces, and reports automatically. Powered by Playwright.",
  openGraph: {
    title: "Prowl QA - CLI-First QA Testing for the Web",
    description:
      "Write tests in YAML. Run them from the terminal. Get screenshots, traces, and reports automatically.",
    url: "https://prowlqa.dev",
    siteName: "Prowl QA",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Prowl QA - CLI-First QA Testing for the Web",
    description:
      "Write tests in YAML. Run them from the terminal. Get screenshots, traces, and reports automatically.",
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
