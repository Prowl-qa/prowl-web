export interface Feature {
  title: string;
  desc: string;
  icon: string;
}

export const features: Feature[] = [
  {
    title: 'YAML-first',
    desc: 'Write tests in readable YAML — no JavaScript, no Swift. Step types cover navigation, forms, assertions, conditionals, mocking, and more.',
    icon: 'yaml',
  },
  {
    title: 'Native and browser selectors',
    desc: 'Accessibility ids, roles, and labels on macOS; the full Playwright selector engine on the web. prowl analyze dumps ranked candidates for either.',
    icon: 'target',
  },
  {
    title: 'Safety guardrails',
    desc: 'Forbidden selectors, allowed domains and apps, and max step limits prevent tests from going off the rails.',
    icon: 'shield',
  },
  {
    title: 'Rich artifacts',
    desc: 'Every run saves screenshots, logs, and — on the web — network data and Playwright traces, under .prowl/runs in your repo.',
    icon: 'artifacts',
  },
  {
    title: 'Visual regression',
    desc: 'Compare screenshots against baselines to catch unintended visual changes. Pixel-level diff images show exactly what shifted.',
    icon: 'eye',
  },
  {
    title: 'Network mocking',
    desc: 'On the web target, intercept API requests and return custom responses. Test error, loading, and empty states without touching your backend.',
    icon: 'mock',
  },
  {
    title: 'Conditional logic',
    desc: 'Handle cookie banners, optional modals, and dynamic UI with if/repeat steps. Real-world flows need real-world control flow.',
    icon: 'branch',
  },
  {
    title: 'CI & agent ready',
    desc: 'JSON output, JUnit XML reports, structured exit codes, and a native MCP server. Plugs into any CI pipeline or AI agent workflow.',
    icon: 'ci',
  },
];
