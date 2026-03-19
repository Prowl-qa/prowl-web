export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Is this only for QA engineers?",
    answer:
      "No. Prowl QA is designed for QA, product engineers, and teams new to end-to-end testing who need a simple CLI path to reliable flow coverage.",
  },
  {
    question: "Do I need to know Playwright APIs?",
    answer:
      "No. You write hunts in YAML while Prowl QA handles browser automation and artifacts under the hood.",
  },
  {
    question: "Can we run this in CI?",
    answer:
      "Yes. Prowl QA is built for CI execution with deterministic exit codes and artifact outputs suitable for pipelines and pull requests.",
  },
  {
    question: "Can AI agents use Prowl QA?",
    answer:
      "Yes. Prowl QA exposes a structured CLI that agents can drive directly. prowlqa analyze extracts page structure as JSON, prowlqa generate turns that into a runnable hunt from a natural language intent, and prowlqa run --json returns structured results with exit codes. You can also import Prowl QA as a Node library. The CLI works standalone or alongside other agent tools in your stack.",
  },
  {
    question: "Why not rely on manual testing only?",
    answer:
      "Manual checks miss regressions in large apps. Prowl QA gives repeatable coverage of critical user journeys on every release.",
  },
  {
    question: "What is visual regression testing?",
    answer:
      "Visual regression compares screenshots against saved baselines to detect unintended visual changes. Prowl QA's assertScreenshot step does pixel-level comparison with a configurable threshold. On first run it saves the baseline automatically. Run prowlqa update-baselines to accept new screenshots as baselines.",
  },
  {
    question: "Can Prowl QA generate tests automatically?",
    answer:
      "Yes. Run prowlqa analyze <url> --json to extract page elements, then pipe the output to prowlqa generate --intent 'describe the test' to produce a valid hunt file. The generated YAML is validated against Prowl's schema before output.",
  },
  {
    question: "Does Prowl support network mocking?",
    answer:
      "Yes. The mockRoute step intercepts requests matching a URL pattern and returns a custom response — inline JSON or from a file. Use unmockRoute to remove the mock. This lets you test error, loading, and empty states without backend changes.",
  },
];
