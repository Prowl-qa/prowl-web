/**
 * Why Prowl — the mission, stated as four concrete commitments. Rendered by
 * the homepage `WhyProwl` section.
 */
export interface Pillar {
  title: string;
  text: string;
}

export const pillars: Pillar[] = [
  {
    title: "Made for agents, controlled by humans",
    text: "Hunts are deterministic, bounded by guardrails, and reviewable in a pull request — safe to point at agent-generated work, with structured output an agent can branch on.",
  },
  {
    title: "Your tests and data stay in your repo",
    text: "Hunts, run history, screenshots, and visual baselines live under .prowl/ in your repository. There is no dashboard to sign into and nothing to host.",
  },
  {
    title: "Bring your own key",
    text: "The AI-assisted steps — like prowl generate — run on your own provider key, paid directly to the provider. No usage caps and no metered pricing from us.",
  },
  {
    title: "Open source, Apache-2.0",
    text: "Built in the open by Genkei Labs. Read the code, run it anywhere, and never get locked into a vendor's ecosystem.",
  },
];
