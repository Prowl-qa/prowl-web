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
    title: '--json structured output',
    desc: 'Every run returns machine-readable JSON. Pass/fail, step timings, artifact paths — ready for agent consumption.',
    icon: 'json',
  },
  {
    title: 'Structured exit codes',
    desc: 'Exit 0 for pass, 1 for failure, 2 for config error. Agents branch on codes without parsing output.',
    icon: 'exit',
  },
  {
    title: 'Library API',
    desc: 'Import prowlqa as a Node module. Run hunts programmatically and get typed results — no shell exec needed.',
    icon: 'api',
  },
  {
    title: 'Zero-overhead discovery',
    desc: 'YAML hunts are self-describing. Agents read the hunt file, not a tool schema. No MCP handshake, no discovery round-trip.',
    icon: 'discover',
  },
];
