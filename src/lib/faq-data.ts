export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Is this only for QA engineers?",
    answer:
      "No. Prowl is designed for QA, product engineers, and teams new to end-to-end testing who need a simple CLI path to reliable flow coverage.",
  },
  {
    question: "Do I need to know Playwright APIs?",
    answer:
      "No. You write hunts in YAML while Prowl handles browser automation and artifacts under the hood.",
  },
  {
    question: "Can we run this in CI?",
    answer:
      "Yes. Prowl is built for CI execution with deterministic exit codes and artifact outputs suitable for pipelines and pull requests.",
  },
  {
    question: "Why not rely on manual testing only?",
    answer:
      "Manual checks miss regressions in large apps. Prowl gives repeatable coverage of critical user journeys on every release.",
  },
];
