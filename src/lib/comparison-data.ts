export interface ComparisonRow {
  category: string;
  prowl: string;
  playwright: string;
  maestro: string;
  prowlWins: boolean;
}

export const comparisonData: ComparisonRow[] = [
  {
    category: 'Test authoring',
    prowl: 'YAML — no code',
    playwright: 'JavaScript / TypeScript',
    maestro: 'YAML',
    prowlWins: true,
  },
  {
    category: 'Selector precision',
    prowl: 'Full Playwright engine',
    playwright: 'Full Playwright engine',
    maestro: 'Limited selectors',
    prowlWins: true,
  },
  {
    category: 'Web support',
    prowl: 'Web-first, multi-browser',
    playwright: 'Multi-browser',
    maestro: 'Mobile-first, limited web',
    prowlWins: true,
  },
  {
    category: 'Safety guardrails',
    prowl: 'Built-in domain & selector rules',
    playwright: 'Manual setup',
    maestro: 'None',
    prowlWins: true,
  },
  {
    category: 'Credential protection',
    prowl: 'Auto-redacted in reports',
    playwright: 'Manual handling',
    maestro: 'Manual handling',
    prowlWins: true,
  },
  {
    category: 'Artifacts',
    prowl: 'Screenshots, traces, logs, network',
    playwright: 'Screenshots, traces, video',
    maestro: 'Screenshots only',
    prowlWins: true,
  },
  {
    category: 'Setup complexity',
    prowl: 'npm install + 1 command',
    playwright: 'npm install + config file',
    maestro: 'Separate installer',
    prowlWins: true,
  },
  {
    category: 'Learning curve',
    prowl: 'Minutes — just YAML',
    playwright: 'Hours — JS + API knowledge',
    maestro: 'Minutes — YAML',
    prowlWins: true,
  },
];
