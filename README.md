# prowl-web

Marketing landing page for [Prowl](https://github.com/prowl-tools/prowl), built with Next.js 16 + Tailwind CSS.

Live at [prowl.tools](https://prowl.tools).

## Development

```bash
npm install
npm run dev
```

## Prowl Hunts

This site dogfoods the Prowl CLI: the landing hunts in `.prowl/hunts/` run against a local server in CI. Prowl keeps E2E testing self-sovereign — hunts, run history, and baselines stay in this repo, BYOK/model choice remain open, and nothing is metered. For the CLI itself, see [docs.prowl.tools](https://docs.prowl.tools) and [github.com/prowl-tools/prowl](https://github.com/prowl-tools/prowl).

Keep the development server running in one terminal:

```console
npm run dev
```

Then install the browser and run the starter hunt in a second terminal:

```console
npm run prowl:install-browsers
npx prowl run hello
```

Starter hunts are plain YAML:

```yaml
steps:
  - navigate: "/"
```

## Build

```bash
npm run build
```
