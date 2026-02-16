'use client';

import { type ReactNode } from 'react';
import SectionReveal from '@/components/ui/SectionReveal';

// Fixed colors for dark code backgrounds — intentionally not themed
const CYAN = 'text-cyan-light';
const GREEN = 'text-green-400';
const PURPLE = 'text-purple-400';
const MUTED = 'text-zinc-500';
const YELLOW = 'text-yellow-300';

const steps: { step: string; title: string; detail: string; code: ReactNode }[] = [
  {
    step: '01',
    title: 'Install and initialize',
    detail: 'Install the CLI globally and bootstrap your first hunt in one command.',
    code: (
      <>
        <span className={MUTED}>$</span> <span className={CYAN}>npm</span> install -g <span className={GREEN}>prowlqa</span>{'\n'}
        <span className={MUTED}>$</span> <span className={CYAN}>prowl</span> init
      </>
    ),
  },
  {
    step: '02',
    title: 'Describe real user flows in YAML',
    detail: 'Capture login, onboarding, checkout, and other critical journeys with human-readable steps.',
    code: (
      <>
        <span className={PURPLE}>name</span><span className={MUTED}>:</span> <span className={GREEN}>checkout-flow</span>{'\n'}
        <span className={PURPLE}>steps</span><span className={MUTED}>:</span>{'\n'}
        {'  '}<span className={MUTED}>-</span> <span className={CYAN}>navigate</span><span className={MUTED}>:</span> <span className={GREEN}>&quot;/cart&quot;</span>{'\n'}
        {'  '}<span className={MUTED}>-</span> <span className={CYAN}>click</span><span className={MUTED}>:</span> <span className={GREEN}>&quot;Checkout&quot;</span>
      </>
    ),
  },
  {
    step: '03',
    title: 'Run locally and in CI',
    detail: 'Execute hunts from terminal, then wire the same commands into your pull request pipeline.',
    code: (
      <>
        <span className={MUTED}>$</span> <span className={CYAN}>prowl</span> run <span className={GREEN}>critical-flows</span> <span className={YELLOW}>--report</span> json
      </>
    ),
  },
  {
    step: '04',
    title: 'Debug with artifacts',
    detail: 'Use screenshots, traces, and logs to resolve issues quickly without reproducing flaky states manually.',
    code: (
      <>
        <span className={`${GREEN} font-bold`}>PASS</span> critical-flows{'\n'}
        <span className={PURPLE}>artifacts</span><span className={MUTED}>:</span> <span className="text-zinc-400">./prowl-artifacts/latest</span>
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <SectionReveal>
      <section id="how-it-works" className="px-6 pb-22 scroll-mt-20">
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
                <pre className="mt-3 overflow-x-auto rounded-md border border-border-subtle bg-code-bg p-3 text-xs leading-relaxed text-zinc-300 font-mono">
                  <code>{item.code}</code>
                </pre>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
