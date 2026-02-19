import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-0">
      {/* Gradient divider */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-gradient-from to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-8 text-sm">
        {/* Left: Logo + tagline + social icons */}
        <div>
          <div className="flex items-start gap-3">
            <Image
              src="/static/img/prowl-logo.png"
              alt="Prowl QA logo"
              width={36}
              height={36}
              className="h-9 w-9 mt-0.5"
            />
            <div>
              <span className="text-lg font-bold tracking-tight">Prowl QA</span>
              <p className="mt-1 text-muted text-sm">CLI-first QA testing for the web.</p>
              <p className="mt-1 text-muted text-sm">Built for agents, controlled by humans.</p>
            </div>
          </div>

          {/* Social icons */}
          <div className="mt-5 flex items-center gap-3">
            {/* X / Twitter */}
            <a
              href="https://x.com/prowlqa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on X"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 text-muted transition-colors hover:bg-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/Prowl-qa/prowl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prowl QA on GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 text-muted transition-colors hover:bg-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:info@prowlqa.dev"
              aria-label="Email us"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground/10 text-muted transition-colors hover:bg-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Link groups */}
        <nav aria-label="Footer" className="flex gap-12 sm:gap-16">
          <div>
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted">Product</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <a href="https://docs.prowlqa.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  Docs
                </a>
              </li>
              <li>
                <a href="https://docs.prowlqa.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/prowlqa" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  npm
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted">Community</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <a href="https://github.com/Prowl-qa/prowl" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/Prowl-qa/prowl-hub" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  Community Hub
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto mt-10 text-xs text-muted">
        &copy; {new Date().getFullYear()} Prowl QA
      </div>
    </footer>
  );
}
