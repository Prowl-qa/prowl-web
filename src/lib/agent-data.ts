export interface HighlightItem {
  title: string;
  desc: string;
  icon: string;
}

export const highlights: HighlightItem[] = [
  {
    title: 'Page analysis',
    desc: 'prowl analyze <url> --json (or --app <bundle id>) extracts interactive elements with ranked selectors. Agents get a structured map of a page or an app without driving it.',
    icon: 'analyze',
  },
  {
    title: 'AI hunt generation',
    desc: 'prowl generate turns an analysis and a natural-language intent into a valid, runnable YAML hunt — using the model and key you choose.',
    icon: 'generate',
  },
  {
    title: 'Structured execution',
    desc: 'Every run returns machine-readable JSON with pass/fail, step timings, and artifact paths. Exit codes let agents branch without parsing.',
    icon: 'json',
  },
  {
    title: 'Library API',
    desc: 'Import prowl-tools as a Node module. Run hunts programmatically and get typed results — no shell exec needed.',
    icon: 'api',
  },
];
