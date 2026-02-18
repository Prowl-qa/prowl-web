import type { ReactNode } from 'react';

export interface ApproachData {
  label: string;
  code: ReactNode;
  tokenCount: string;
  tokenPercent: number;
  bullets: string[];
}

export interface HighlightItem {
  title: string;
  desc: string;
  icon: string;
}

export const highlights: HighlightItem[] = [
  {
    title: 'Page analysis',
    desc: 'prowlqa analyze <url> --json extracts interactive elements, selectors, and form structure. Agents get a structured page map without browser interaction.',
    icon: 'analyze',
  },
  {
    title: 'AI hunt generation',
    desc: 'prowlqa generate turns a page analysis and natural language intent into a valid, runnable YAML hunt file.',
    icon: 'generate',
  },
  {
    title: 'Structured execution',
    desc: 'Every run returns machine-readable JSON with pass/fail, step timings, and artifact paths. Exit codes let agents branch without parsing.',
    icon: 'json',
  },
  {
    title: 'Library API',
    desc: 'Import prowlqa as a Node module. Run hunts programmatically and get typed results — no shell exec needed.',
    icon: 'api',
  },
];
