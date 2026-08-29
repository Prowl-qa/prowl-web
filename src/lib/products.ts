/**
 * The Prowl suite — single source of truth for product metadata, shared by the
 * homepage showcase, the product pages, the nav/footer, and the docs hub, so the
 * suite is marketed consistently everywhere.
 */

export interface SuiteProduct {
  slug: string;
  name: string;
  /** One-line positioning. */
  tagline: string;
  /** 2–3 concrete capabilities for the showcase block. */
  points: string[];
  /** Canonical product destination for nav/footer links. */
  href: string;
  /** Optional homepage card CTA destination when it differs from the product destination. */
  ctaHref?: string;
  /** Approved docs/app destination for this product CTA. */
  docsHref: string;
  /** Label for the docs/repo link. */
  docsLabel: string;
}

export const suiteProducts: SuiteProduct[] = [
  {
    slug: "cli",
    name: "Prowl CLI",
    tagline: "Deterministic end-to-end testing in readable YAML, run with Playwright precision.",
    points: [
      "Write flows as YAML hunts — no brittle test code",
      "Visual regression detection + rich debugging artifacts",
      "CLI-first, agent-ready, with an MCP server",
    ],
    href: "/cli",
    docsHref: "https://docs.prowl.tools",
    docsLabel: "Docs",
  },
  {
    slug: "hub",
    name: "Prowl Hub",
    tagline: "A growing library of community hunt templates — copy real-world flows and adapt them.",
    points: [
      "Browse battle-tested YAML flows by category",
      "Copy, adapt, and contribute back",
      "Wired into the CLI via the Hub API",
    ],
    href: "https://hub.prowl.tools",
    ctaHref: "https://docs.prowl.tools",
    docsHref: "https://hub.prowl.tools",
    docsLabel: "Visit the Hub",
  },
  {
    slug: "infra",
    name: "Prowl Infra Hub",
    tagline: "Infrastructure test playbooks — validate cloud and Terraform environments before you ship.",
    points: [
      "Catalog of reusable infra validation playbooks",
      "Catch misconfigurations pre-deploy",
      "Same CLI-first, agent-ready philosophy",
    ],
    href: "https://infra.prowl.tools",
    ctaHref: "https://docs.prowl.tools",
    docsHref: "https://infra.prowl.tools",
    docsLabel: "Visit Infra",
  },
];

export function getProduct(slug: string): SuiteProduct | undefined {
  return suiteProducts.find((p) => p.slug === slug);
}

/** True for products whose primary destination is an external live site (Hub, Infra). */
export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/** The suite pillars — what makes these one suite rather than four tools. */
export const suitePillars: { title: string; text: string }[] = [
  {
    title: "Made for agents, controlled by humans",
    text: "Every tool is safe to point at agent-generated work — deterministic, bounded, and reviewable — without runaway cost or surprises.",
  },
  {
    title: "Own your keys, no lock-in",
    text: "BYOK where inference is involved, open formats everywhere else. Your data goes to your providers, not ours.",
  },
  {
    title: "CLI-first, zero infrastructure",
    text: "Each tool runs from the terminal or CI with nothing to host. Start in seconds; scale without a control plane.",
  },
  {
    title: "Open source, from Genkei Labs",
    text: "Apache-2.0, transparent, and built in the open as a cohesive QA suite — not a pile of disconnected utilities.",
  },
];
