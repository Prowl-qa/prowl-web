'use client';

import SectionReveal from '@/components/ui/SectionReveal';
import TypingEffect from '@/components/ui/TypingEffect';

function YamlHighlight() {
  const lines = [
    { key: 'name', value: ' login-flow' },
    { key: 'steps', value: '' },
    { key: '  - navigate', value: ' "/login"' },
    { key: '  - fill', value: '' },
    { key: '      "Email"', value: ' "{{TEST_EMAIL}}"' },
    { key: '  - fill', value: '' },
    { key: '      "Password"', value: ' "{{TEST_PASSWORD}}"' },
    { key: '  - click', value: ' "Sign In"' },
    { key: '  - assert', value: '' },
    { key: '      visible', value: ' "Dashboard"' },
  ];

  return (
    <code className="text-sm leading-relaxed">
      {lines.map((line, i) => (
        <span key={i} className="block">
          <span className="text-cyan-light">{line.key}:</span>
          {line.value && <span className="text-green-400">{line.value}</span>}
        </span>
      ))}
    </code>
  );
}

const terminalLines = [
  { text: '  ● Running hunt: login-flow', className: 'text-cyan-light' },
  { text: '    ✓ navigate "/login" (120ms)', className: 'text-green-400' },
  { text: '    ✓ fill "Email" (85ms)', className: 'text-green-400' },
  { text: '    ✓ fill "Password" (62ms)', className: 'text-green-400' },
  { text: '    ✓ click "Sign In" (340ms)', className: 'text-green-400' },
  { text: '    ✓ assert visible "Dashboard" (15ms)', className: 'text-green-400' },
  { text: '', className: '' },
  { text: '  PASS login-flow (622ms) 5/5 steps', className: 'text-green-400 font-bold' },
];

export default function CodeExample() {
  return (
    <SectionReveal>
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* YAML */}
          <div>
            <div className="rounded-t-xl bg-code-surface border border-border-subtle px-4 py-2.5">
              <span className="text-xs font-medium text-muted font-mono">login.hunt.yaml</span>
            </div>
            <pre className="rounded-b-xl bg-code-bg border border-t-0 border-border-subtle p-6 overflow-x-auto font-mono">
              <YamlHighlight />
            </pre>
          </div>

          {/* Terminal */}
          <div>
            <div className="rounded-t-xl bg-code-surface border border-border-subtle px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-medium text-muted font-mono">Terminal</span>
            </div>
            <pre className="rounded-b-xl bg-code-bg border border-t-0 border-border-subtle p-6 overflow-x-auto font-mono text-sm leading-relaxed text-zinc-100">
              <code>
                <TypingEffect lines={terminalLines} />
              </code>
            </pre>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
