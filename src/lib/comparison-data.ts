/**
 * "How Prowl compares" table. Every cell must be a factual, verifiable claim
 * drawn from each project's public documentation (prowl LEGAL-004 — FTC
 * comparative-advertising guidelines): describe what each tool does, never
 * disparage. Re-check `asOf` when editing a cell.
 */

export const comparisonAsOf = "August 2026";

export const comparisonColumns = ["Prowl", "Maestro", "Playwright", "XCUITest"] as const;

export interface ComparisonRow {
  label: string;
  /** One cell per entry in `comparisonColumns`, in order. */
  cells: [string, string, string, string];
}

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Native macOS apps",
    cells: [
      "Yes — Accessibility API, menu bar extras included",
      "No",
      "Electron apps only (experimental)",
      "Yes — apps built with Xcode",
    ],
  },
  {
    label: "Web apps",
    cells: [
      "Yes — Playwright (Chromium, Firefox, WebKit)",
      "Yes",
      "Yes — Chromium, Firefox, WebKit",
      "No",
    ],
  },
  {
    label: "Native mobile apps",
    cells: [
      "Android & iOS Simulator — experimental",
      "Yes — iOS and Android",
      "No",
      "iOS",
    ],
  },
  {
    label: "Tests are written in",
    cells: ["YAML", "YAML", "JavaScript / TypeScript, Python, Java, .NET", "Swift / Objective-C"],
  },
  {
    label: "Runs from",
    cells: ["One CLI — any terminal or CI", "CLI (requires Java)", "Test runner / CLI", "Xcode / xcodebuild"],
  },
];

export const comparisonDisclaimer =
  `Based on each project's public documentation as of ${comparisonAsOf}. Maestro, Playwright, and XCUITest are trademarks of their respective owners; Prowl is not affiliated with or endorsed by them.`;
