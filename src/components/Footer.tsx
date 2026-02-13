import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-0">
      {/* Gradient divider */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-gradient-from to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-8 text-sm">
        {/* Left: Logo + tagline */}
        <div className="flex items-start gap-3">
          <Image
            src="/static/img/prowl-logo.png"
            alt="Prowl logo"
            width={36}
            height={36}
            className="h-9 w-9 mt-0.5"
          />
          <div>
            <span className="text-lg font-bold tracking-tight">Prowl</span>
            <p className="mt-1 text-muted text-sm">CLI-first QA testing for the web.</p>
          </div>
        </div>

        {/* Right: Link groups */}
        <div className="flex gap-12 sm:gap-16">
          <div>
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted">Product</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <a href="https://docs.prowlqa.dev" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  Docs
                </a>
              </li>
              <li>
                <a href="https://docs.prowlqa.dev/getting-started" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/prowlai" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  npm
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted">Community</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <a href="https://github.com/Prowl-qa/prowl" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/Prowl-qa/prowl-hub" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-sm">
                  Community Hub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 text-xs text-muted">
        &copy; {new Date().getFullYear()} Prowl
      </div>
    </footer>
  );
}
