# Prowl Web - Product Backlog

**Repo**: `Prowl-qa/prowl-web`
**Local path**: `~/Desktop/prowl-web`
**Branch**: `ui-upgrade`
**Stack**: Next.js 15 + Tailwind CSS v4 + TypeScript + Framer Motion
**Hosting**: Vercel at prowlqa.dev

---

## High Priority

{PQW-002} **Add MCP / agent-native messaging to the marketing site (shipped in prowlqa 0.1.1)**
   ProwlQA 0.1.1 shipped an MCP server (`prowlqa mcp`) that lets any MCP-capable AI agent (Claude Desktop, Cursor, OpenClaw, etc.) drive QA through named tools, plus automated bug-logging and multi-project support. This is a major differentiator for the agent-native positioning but isn't reflected on the site yet.

**Acceptance Criteria**:
- Feature/landing copy highlighting "agent-native QA via MCP" (run hunts as tools, auto-logged bugs, no shell access required)
- Update the `/for/ai-agents` use-case page (or equivalent) with the MCP integration story
- Update any competitor comparison so the MCP/agent integration line reflects what actually shipped (not "planned")

## Medium Priority

{PQW-001} **WEB-001: Add Links to Documentation Site and Community Hub**
   Ensure the landing page (prowlqa.dev) has visible links to the documentation site (docs.prowlqa.dev) and the community hub (hub.prowlqa.dev). Docs links already exist in nav, hero, and footer. The footer currently links to the GitHub repo (github.com/Prowl-qa/prowl-hub) — update to hub.prowlqa.dev once the hub site is live. Consider adding a dedicated "Community" or "Templates" section for more prominence.

**Blocked**: Waiting on hub site to be built and hosted at hub.prowlqa.dev
**Acceptance Criteria**:
- Update footer hub link from GitHub repo to hub.prowlqa.dev
- Consider a "Community" or "Templates" section on the landing page highlighting the hub
- Docs links already in place (nav, hero, footer) — no changes needed

## Low Priority

*No active items.*
