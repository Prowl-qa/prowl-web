export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Who is Prowl for?",
    answer:
      "Indie and small-team Mac developers who need end-to-end tests for a desktop app, and web developers who want the same YAML-driven coverage for a browser app — without writing test code in Swift or JavaScript.",
  },
  {
    question: "Can Prowl test a native macOS app?",
    answer:
      "Yes. Set target.type to macos and target.app to a bundle id or .app path, and Prowl drives the app through Apple's Accessibility API — windows, sheets, and menu bar extras included, with statusItem and menu= selectors for status menus. The target is labelled experimental: its helper binary is built from source today, and a prebuilt, signed helper is the next milestone.",
  },
  {
    question: "Do I need to know Playwright or XCUITest?",
    answer:
      "No. You write hunts in YAML. On the web target Prowl runs Playwright under the hood; on macOS it talks to the Accessibility API. Portable steps run on both, and web-only steps are rejected up front on native targets with a clear error.",
  },
  {
    question: "What about iOS and Android?",
    answer:
      "Experimental. Prowl 0.1.5 added Android (emulator and USB device) and iOS Simulator targets that run the same portable steps. They are usable today but the selector dialect and step coverage may still change, and real iOS devices are out of scope for now.",
  },
  {
    question: "Can we run this in CI?",
    answer:
      "Yes. prowl ci runs a suite with deterministic exit codes, JSON and JUnit XML output, and artifacts for the pipeline. Web hunts run on any hosted runner; macOS-app hunts need a runner that has been granted Accessibility permission, which in practice means a self-hosted or MDM-managed Mac.",
  },
  {
    question: "Can AI agents use Prowl?",
    answer:
      "Yes, two ways. Agents can drive the structured CLI directly — prowl analyze extracts page structure as JSON, prowl generate turns that into a runnable hunt from a natural language intent, and prowl run --json returns structured results with exit codes. Or run prowl mcp to expose Prowl as a native MCP server, so any MCP-capable agent calls it as named tools. You can also import Prowl as a Node library.",
  },
  {
    question: "Does Prowl have an MCP server?",
    answer:
      "Yes. Run prowl mcp to start an MCP server (stdio) that exposes Prowl to any MCP-capable agent — Claude Desktop, Cursor, OpenClaw — as a fixed set of named tools: list_hunts, run_hunt, run_suite, and list_projects. The agent triggers runs and reads structured results without shell access, and your guardrails (allowedDomains, forbiddenSelectors, maxSteps) apply to every run. run_suite also auto-logs failures as deduplicated bug tickets in your backlog, and a project registry lets one server drive multiple repos.",
  },
  {
    question: "Why not rely on manual testing only?",
    answer:
      "Manual checks miss regressions in large apps. Prowl gives repeatable coverage of critical user journeys on every release.",
  },
  {
    question: "What is visual regression testing?",
    answer:
      "Visual regression compares screenshots against saved baselines to detect unintended visual changes. Prowl's assertScreenshot step does pixel-level comparison with a configurable threshold. On first run it saves the baseline automatically. Run prowl update-baselines to accept new screenshots as baselines.",
  },
  {
    question: "Can Prowl generate tests automatically?",
    answer:
      "Yes. Run prowl analyze <url> --json (or --app <bundle id> for a Mac app) to extract elements and ranked selectors, then pipe the output to prowl generate --intent 'describe the test' to produce a valid hunt file. Generation uses the model and provider key you configure — your key, paid to your provider — and the YAML is validated against Prowl's schema before output.",
  },
  {
    question: "Does Prowl support network mocking?",
    answer:
      "Yes, on the web target. The mockRoute step intercepts requests matching a URL pattern and returns a custom response — inline JSON or from a file. Use unmockRoute to remove the mock. This lets you test error, loading, and empty states without backend changes.",
  },
];
