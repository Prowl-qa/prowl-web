'use client';

import SectionReveal from '@/components/ui/SectionReveal';

const steps = [
  {
    step: '01',
    title: 'Install and initialize',
    detail: 'Install the CLI globally and bootstrap your first hunt in one command.',
    command: 'npm install -g prowlai\nprowl init',
  },
  {
    step: '02',
    title: 'Describe real user flows in YAML',
    detail: 'Capture login, onboarding, checkout, and other critical journeys with human-readable steps.',
    command: 'name: checkout-flow\nsteps:\n  - navigate: "/cart"\n  - click: "Checkout"',
  },
  {
    step: '03',
    title: 'Run locally and in CI',
    detail: 'Execute hunts from terminal, then wire the same commands into your pull request pipeline.',
    command: 'prowl run critical-flows --report json',
  },
  {
    step: '04',
    title: 'Debug with artifacts',
    detail: 'Use screenshots, traces, and logs to resolve issues quickly without reproducing flaky states manually.',
    command: 'PASS critical-flows\nartifacts: ./prowl-artifacts/latest',
  },
];

export default function HowItWorks() {
  return (
    <SectionReveal>
      <section className="px-6 pb-22">
        <div className="mx-auto w-full max-w-6xl rounded-2xl border border-border bg-surface/80 p-6 sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-3 max-w-2xl text-muted">
            A practical workflow for QA engineers, product developers, and teams adopting test discipline.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {steps.map((item) => (
              <article key={item.step} className="rounded-xl border border-border bg-background p-4">
                <p className="font-mono text-xs text-muted">Step {item.step}</p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
                <pre className="mt-3 overflow-x-auto rounded-md border border-border-subtle bg-code-bg p-3 text-xs text-zinc-300 font-mono">
                  <code>{item.command}</code>
                </pre>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
