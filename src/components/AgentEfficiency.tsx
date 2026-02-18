'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { highlights } from '@/lib/agent-data';
import { fadeUp, staggerContainer } from '@/lib/animations';
import SectionReveal from '@/components/ui/SectionReveal';

const CYAN = 'text-cyan-500 dark:text-cyan-300';
const GREEN = 'text-emerald-500 dark:text-emerald-300';
const PURPLE = 'text-violet-500 dark:text-violet-300';
const MUTED = 'text-zinc-300 dark:text-zinc-400';
const YELLOW = 'text-amber-500 dark:text-amber-300';

/* ---------- Code snippets ---------- */

const mcpCode: ReactNode = (
  <>
    <span className={MUTED}># login.hunt.yaml</span>{'\n'}
    <span className={PURPLE}>name</span><span className={MUTED}>:</span> <span className={GREEN}>login-flow</span>{'\n'}
    <span className={PURPLE}>steps</span><span className={MUTED}>:</span>{'\n'}
    {'  '}<span className={MUTED}>-</span> <span className={CYAN}>navigate</span><span className={MUTED}>:</span> <span className={GREEN}>&quot;/login&quot;</span>{'\n'}
    {'  '}<span className={MUTED}>-</span> <span className={CYAN}>fill</span><span className={MUTED}>:</span> <span className={GREEN}>&quot;Email&quot;</span> <span className={GREEN}>&quot;{'{{TEST_EMAIL}}'}&quot;</span>{'\n'}
    {'  '}<span className={MUTED}>-</span> <span className={CYAN}>fill</span><span className={MUTED}>:</span> <span className={GREEN}>&quot;Password&quot;</span> <span className={GREEN}>&quot;{'{{TEST_PASSWORD}}'}&quot;</span>{'\n'}
    {'  '}<span className={MUTED}>-</span> <span className={CYAN}>click</span><span className={MUTED}>:</span> <span className={GREEN}>&quot;Sign In&quot;</span>{'\n'}
    {'  '}<span className={MUTED}>-</span> <span className={CYAN}>assert</span><span className={MUTED}>:</span> <span className={YELLOW}>visible</span> <span className={GREEN}>&quot;Dashboard&quot;</span>
  </>
);

const prowlCode: ReactNode = (
  <>
    <span className={MUTED}>$</span> <span className={CYAN}>prowlqa</span> analyze <span className={GREEN}>https://app.com/login</span> <span className={YELLOW}>--json</span> \{'\n'}
    {'  '}<span className={MUTED}>|</span> <span className={CYAN}>prowlqa</span> generate <span className={YELLOW}>--intent</span> <span className={GREEN}>&quot;test login&quot;</span> <span className={YELLOW}>--stdout</span>{'\n'}
    {'\n'}
    <span className={MUTED}>$</span> <span className={CYAN}>prowlqa</span> run <span className={GREEN}>login</span> <span className={YELLOW}>--json</span>{'\n'}
    <span className={`${GREEN} font-bold`}>PASS</span> login (622ms) 5/5 steps{'\n'}
    <span className={PURPLE}>exitCode</span><span className={MUTED}>:</span> <span className={YELLOW}>0</span>
  </>
);

/* ---------- Highlight icons ---------- */

function HighlightIcon({ icon }: { icon: string }) {
  const cls = 'w-6 h-6 text-cyan';

  switch (icon) {
    case 'json':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 3H6a2 2 0 0 0-2 2v2" /><path d="M16 3h2a2 2 0 0 1 2 2v2" />
          <path d="M8 21H6a2 2 0 0 1-2-2v-2" /><path d="M16 21h2a2 2 0 0 0 2-2v-2" />
          <path d="M9 12h6" /><path d="M12 9v6" />
        </svg>
      );
    case 'exit':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 12l2 2 4-4" /><rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      );
    case 'api':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 6h2l4 6-4 6H4" /><path d="M20 6h-2l-4 6 4 6h2" />
        </svg>
      );
    case 'analyze':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          <path d="M8 11h6" /><path d="M11 8v6" />
        </svg>
      );
    case 'generate':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l1.09 3.26L16 6l-2.91.74L12 10l-1.09-3.26L8 6l2.91-.74L12 2z" />
          <path d="M5 15l.65 1.95L7.5 17.6l-1.85.65L5 20.2l-.65-1.95L2.5 17.6l1.85-.65L5 15z" />
          <path d="M19 12l.65 1.95 1.85.65-1.85.65L19 17.2l-.65-1.95-1.85-.65 1.85-.65L19 12z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------- Component ---------- */

export default function AgentEfficiency() {
  return (
    <SectionReveal>
      <section id="agent-efficiency" className="px-6 pb-24 max-w-5xl mx-auto scroll-mt-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Built for AI agents</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted">
              Analyze pages, generate tests, and execute hunts — all through the CLI.
              No MCP server, no per-step reasoning, no context tax.
            </p>
          </motion.div>

          {/* Two-column comparison */}
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6 mb-8">
            {/* MCP approach */}
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-border bg-surface-elevated p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">MCP tool-call approach</h3>
                <span className="text-xs font-mono text-muted">~15,000 tokens</span>
              </div>

              <pre className="overflow-x-auto rounded-md border border-border-subtle bg-code-bg p-4 text-xs leading-relaxed text-zinc-300 font-mono mb-4">
                <code>{mcpCode}</code>
              </pre>

              {/* Token bar — 100% (MCP baseline) */}
              <div className="mb-4">
                <div className="h-2 w-full rounded-full bg-red-500/70" />
                <p className="mt-1.5 text-xs text-muted">Token budget consumed per test run</p>
              </div>

              <ul className="space-y-1.5 text-sm text-muted">
                <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span>MCP tool discovery schemas are loaded every session</li>
                <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span>Agent issues per-step MCP calls (navigate/fill/click/assert)</li>
                <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span>Round-trip MCP responses multiply token cost</li>
                <li className="flex gap-2"><span className="text-red-400 shrink-0">-</span>Flaky when agent misinterprets selectors</li>
              </ul>
            </motion.div>

            {/* Prowl approach */}
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-cyan/30 bg-surface-elevated p-6 ring-1 ring-cyan/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Prowl QA CLI</h3>
                <span className="text-xs font-mono text-cyan">~1,000 tokens</span>
              </div>

              <pre className="overflow-x-auto rounded-md border border-border-subtle bg-code-bg p-4 text-xs leading-relaxed text-zinc-300 font-mono mb-4">
                <code>{prowlCode}</code>
              </pre>

              {/* Token bar — ~7% (Prowl) */}
              <div className="mb-4">
                <div className="flex gap-1 items-center">
                  <div className="h-2 w-[7%] rounded-full bg-cyan" />
                  <span className="text-[10px] font-mono text-cyan">~15x fewer</span>
                </div>
                <p className="mt-1.5 text-xs text-muted">Token budget consumed per test run</p>
              </div>

              <ul className="space-y-1.5 text-sm text-muted">
                <li className="flex gap-2"><span className="text-cyan shrink-0">+</span>Analyze a page, generate a hunt, run it — three commands</li>
                <li className="flex gap-2"><span className="text-cyan shrink-0">+</span>Zero agent reasoning about browser steps</li>
                <li className="flex gap-2"><span className="text-cyan shrink-0">+</span>Deterministic — same YAML, same result</li>
                <li className="flex gap-2"><span className="text-cyan shrink-0">+</span>Structured JSON output and exit codes</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={fadeUp} className="text-center text-muted text-sm mb-14">
            Made for agents, controlled by humans.
          </motion.p>

          {/* Highlight cards */}
          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group rounded-xl border border-border bg-surface-elevated p-6 transition-all duration-200 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/5"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-surface p-2.5">
                  <HighlightIcon icon={item.icon} />
                </div>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10 text-center">
            <a
              href="https://docs.prowlqa.dev/guides/agent-integration"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:underline underline-offset-4"
            >
              Agent integration guide
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </SectionReveal>
  );
}
