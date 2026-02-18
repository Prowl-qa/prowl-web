export interface Feature {
  title: string;
  desc: string;
  icon: string;
}

export const features: Feature[] = [
  {
    title: 'YAML-first',
    desc: 'Write tests in readable YAML. No JavaScript required. 26 step types cover navigation, forms, assertions, conditionals, mocking, and more.',
    icon: 'yaml',
  },
  {
    title: 'Playwright precision',
    desc: 'Full Playwright selector engine under the hood. data-testid, ARIA roles, text matching, CSS — use whatever works.',
    icon: 'target',
  },
  {
    title: 'Safety guardrails',
    desc: 'Forbidden selectors, allowed domains, and max step limits prevent tests from going off the rails.',
    icon: 'shield',
  },
  {
    title: 'Rich artifacts',
    desc: 'Every run generates screenshots, console logs, network data, and Playwright traces. Debug failures instantly.',
    icon: 'artifacts',
  },
  {
    title: 'Visual regression',
    desc: 'Compare screenshots against baselines to catch unintended visual changes. Pixel-level diff images show exactly what shifted.',
    icon: 'eye',
  },
  {
    title: 'Network mocking',
    desc: 'Intercept API requests and return custom responses. Test error states, loading states, and empty states without touching your backend.',
    icon: 'mock',
  },
  {
    title: 'Conditional logic',
    desc: 'Handle cookie banners, optional modals, and dynamic UI with if/repeat steps. Real-world flows need real-world control flow.',
    icon: 'branch',
  },
  {
    title: 'CI & agent ready',
    desc: 'JSON output, JUnit XML reports, structured exit codes, and parallel execution. Plugs into any CI pipeline or AI agent workflow.',
    icon: 'ci',
  },
];
