'use client';

import { useState, useCallback } from 'react';
import SectionReveal from '@/components/ui/SectionReveal';

interface Step {
  label: string;
  command: string;
  alt?: string;
}

const steps: Step[] = [
  { label: 'Install the CLI', command: 'npm install -g prowl-tools', alt: 'brew tap prowl-tools/tap && brew install prowl' },
  { label: 'Install a browser for the web target', command: 'npx playwright install chromium' },
  { label: 'Initialize your project', command: 'prowl init' },
  { label: 'Run the starter hunt', command: 'prowl run hello' },
];

function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for non-secure contexts
  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copyToClipboard(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Silently fail — clipboard may be unavailable
      });
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      className="shrink-0 rounded-md p-1.5 text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

function CopyAllButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    copyToClipboard(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Silently fail
      });
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'All commands copied!' : 'Copy all commands to clipboard'}
      className="text-sm text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-md px-3 py-1.5"
    >
      {copied ? 'Copied!' : 'Copy all commands'}
    </button>
  );
}

export default function Install() {
  const allCommands = steps.map((s) => s.command).join('\n');

  return (
    <SectionReveal>
      <section className="px-6 pb-24 max-w-3xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 border border-border p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
            Get started in seconds
          </h2>
          <p className="text-center text-muted mb-10">
            Four commands to a green web hunt. Testing a Mac app takes one more step today — see below.
          </p>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.command} className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-cyan/10 text-cyan text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted mb-1.5">{step.label}</p>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5">
                    <p className="flex-1 min-w-0 truncate text-sm font-medium text-foreground">
                      {step.command}
                    </p>
                    <CopyButton text={step.command} />
                  </div>
                  {'alt' in step && step.alt && (
                    <>
                      <p className="text-xs text-muted mt-2 mb-1.5">Or with Homebrew:</p>
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5">
                        <p className="flex-1 min-w-0 truncate text-sm font-medium text-foreground">
                          {step.alt}
                        </p>
                        <CopyButton text={step.alt} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <CopyAllButton text={allCommands} />
          </div>

          {/* Honest macOS status: the helper is not bundled yet (prowl PROWL-074). Update when it ships. */}
          <div className="mt-8 rounded-xl border border-border bg-background/70 p-5 text-sm">
            <p className="font-semibold">Testing a native Mac app?</p>
            <p className="mt-1.5 leading-relaxed text-muted">
              The macOS target ships in the CLI, but its Accessibility helper,{' '}
              <code className="font-mono text-xs">prowl-macdriver</code>, is not bundled in the npm package yet — you build it
              once from the source checkout with the Swift toolchain, then set{' '}
              <code className="font-mono text-xs">target.type: macos</code> and grant Accessibility permission to your terminal.
              A prebuilt, signed helper is the next release milestone.
            </p>
            <a
              href="https://docs.prowl.tools/macos-target"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm"
            >
              macOS target guide
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
