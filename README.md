# prowl-web

Marketing landing page for [Prowl](https://github.com/prowl-tools/prowl), built with Next.js 16 + Tailwind CSS.

Live at [prowl.tools](https://prowl.tools).

## Development

```bash
npm install
npm run dev
```

## Prowl Hunts

Prowl keeps web QA self-sovereign: data stays under your control, BYOK/model choice remain open, and the workflow avoids vendor lock-in or metered test pricing. For deeper setup, see [docs.prowl.tools](https://docs.prowl.tools), [review.prowl.tools](https://review.prowl.tools), and [github.com/prowl-tools](https://github.com/prowl-tools).

Keep the development server running in one terminal:

```console
$ npm run dev
```

Then install the browser and run the starter hunt in a second terminal:

```console
$ npm run prowl:install-browsers
$ npx prowl run hello
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
