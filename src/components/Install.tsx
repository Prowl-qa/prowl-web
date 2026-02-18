'use client';

import { useState, useCallback } from 'react';
import SectionReveal from '@/components/ui/SectionReveal';

const steps = [
  { label: 'Install the CLI', command: 'npm install -g prowlqa' },
  { label: 'Install browser engine', command: 'npx playwright install chromium' },
  { label: 'Initialize your project', command: 'prowlqa init' },
  { label: 'Run your first hunt', command: 'prowlqa run homepage' },
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
            Four commands. Zero config files. You&apos;re testing in under a minute.
          </p>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
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
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <CopyAllButton text={allCommands} />
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
