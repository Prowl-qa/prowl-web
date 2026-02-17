export interface Feature {
  title: string;
  desc: string;
  icon: string;
}

export const features: Feature[] = [
  {
    title: 'YAML-first',
    desc: 'Write tests in readable YAML. No JavaScript required. 16 step types cover clicks, fills, assertions, waits, and more.',
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
    title: 'Credential redaction',
    desc: 'Variables from {{VAR}} interpolation are automatically redacted in reports. No credential leaks.',
    icon: 'lock',
  },
  {
    title: 'Watch mode',
    desc: 'Edit a hunt, save, and see results instantly. 300ms debounce keeps feedback tight during authoring.',
    icon: 'watch',
  },
  {
    title: 'CI & agent ready',
    desc: 'Run hunts in any CI pipeline or from AI agents. JSON output, exit codes, and artifact paths work with any automation.',
    icon: 'ci',
  },
  {
    title: 'Zero config',
    desc: 'One install command. No config files needed. Convention over configuration gets you running in seconds.',
    icon: 'zap',
  },
];
