export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="text-xl font-bold tracking-tight">Prowl</span>
        <div className="flex items-center gap-6 text-sm">
          <a
            href="https://docs.prowlqa.dev"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/Prowl-qa/prowl"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/prowlai"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            npm
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold tracking-tight leading-tight sm:text-6xl">
          YAML tests.{" "}
          <span className="text-cyan-600 dark:text-cyan-400">
            Terminal results.
          </span>
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Write deterministic web tests in YAML. Run them from the CLI. Get
          screenshots, Playwright traces, and reports automatically.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="https://docs.prowlqa.dev/getting-started"
            className="rounded-full bg-cyan-600 px-6 py-3 text-sm font-medium text-white hover:bg-cyan-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="https://github.com/Prowl-qa/prowl"
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Code Example */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
              Hunt file
            </p>
            <pre className="bg-zinc-950 text-zinc-100 rounded-xl p-6 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-geist-mono)]">
              <code>{`name: login-flow
steps:
  - navigate: "/login"
  - fill:
      "Email": "{{TEST_EMAIL}}"
  - fill:
      "Password": "{{TEST_PASSWORD}}"
  - click: "Sign In"
  - assert:
      visible: "Dashboard"`}</code>
            </pre>
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
              Terminal output
            </p>
            <pre className="bg-zinc-950 text-zinc-100 rounded-xl p-6 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-geist-mono)]">
              <code>
                <span className="text-cyan-400">
                  {"  ● Running hunt: login-flow\n"}
                </span>
                <span className="text-green-400">
                  {'    ✓ navigate "/login" (120ms)\n'}
                </span>
                <span className="text-green-400">
                  {'    ✓ fill "Email" (85ms)\n'}
                </span>
                <span className="text-green-400">
                  {'    ✓ fill "Password" (62ms)\n'}
                </span>
                <span className="text-green-400">
                  {'    ✓ click "Sign In" (340ms)\n'}
                </span>
                <span className="text-green-400">
                  {'    ✓ assert visible "Dashboard" (15ms)\n'}
                </span>
                {"\n"}
                <span className="text-green-400 font-bold">
                  {"  PASS "}
                </span>
                {"login-flow (622ms) 5/5 steps"}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for web testing
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "YAML-first",
              desc: "Write tests in readable YAML. No JavaScript required. 16 step types cover clicks, fills, assertions, waits, and more.",
            },
            {
              title: "Playwright precision",
              desc: "Full Playwright selector engine under the hood. data-testid, ARIA roles, text matching, CSS — use whatever works.",
            },
            {
              title: "Safety guardrails",
              desc: "Forbidden selectors, allowed domains, and max step limits prevent tests from going off the rails.",
            },
            {
              title: "Rich artifacts",
              desc: "Every run generates screenshots, console logs, network data, and Playwright traces. Debug failures instantly.",
            },
            {
              title: "Credential redaction",
              desc: "Variables from {{VAR}} interpolation are automatically redacted in reports. No credential leaks.",
            },
            {
              title: "Watch mode",
              desc: "Edit a hunt, save, and see results instantly. 300ms debounce keeps feedback tight during authoring.",
            },
          ].map((feature) => (
            <div key={feature.title} className="space-y-2">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section className="px-6 pb-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Get started in seconds</h2>
        <pre className="bg-zinc-950 text-zinc-100 rounded-xl p-6 text-sm text-left overflow-x-auto font-[family-name:var(--font-geist-mono)]">
          <code>{`npm install -g prowlai
npx playwright install chromium
prowl init
prowl run homepage`}</code>
        </pre>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span>&copy; {new Date().getFullYear()} Prowl</span>
          <div className="flex gap-6">
            <a
              href="https://docs.prowlqa.dev"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/Prowl-qa/prowl"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/prowlai"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              npm
            </a>
            <a
              href="https://github.com/Prowl-qa/prowl-hub"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Community Hub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
