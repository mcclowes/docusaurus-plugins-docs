# docusaurus-plugins-docs

Documentation site for a family of Docusaurus v3 plugins — and a live demo of all of them. Every plugin documented here is installed and running on this site, so the docs are dogfooded by definition.

## Plugins

| Plugin                                                                                               | Docs                                            |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [`docusaurus-plugin-banner`](https://www.npmjs.com/package/docusaurus-plugin-banner)                 | [`/docs/banner`](./docs/banner)                 |
| [`docusaurus-plugin-cookie-consent`](https://www.npmjs.com/package/docusaurus-plugin-cookie-consent) | [`/docs/cookie-consent`](./docs/cookie-consent) |
| [`docusaurus-plugin-glossary`](https://www.npmjs.com/package/docusaurus-plugin-glossary)             | [`/docs/glossary`](./docs/glossary)             |
| `docusaurus-plugin-marginalia` (not yet published)                                                   | [`/docs/marginalia`](./docs/marginalia)         |
| [`docusaurus-plugin-new-post-toast`](https://www.npmjs.com/package/docusaurus-plugin-new-post-toast) | [`/docs/new-post-toast`](./docs/new-post-toast) |
| [`docusaurus-plugin-omg`](https://www.npmjs.com/package/docusaurus-plugin-omg)                       | [`/docs/omg`](./docs/omg)                       |
| [`docusaurus-plugin-starter`](https://www.npmjs.com/package/docusaurus-plugin-starter)               | [`/docs/starter`](./docs/starter)               |
| [`docusaurus-plugin-statuspage`](https://www.npmjs.com/package/docusaurus-plugin-statuspage)         | [`/docs/statuspage`](./docs/statuspage)         |

## Development

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm start` — dev server
- `npm run build` — production build into `build/`
- `npm run serve` — serve the built site
- `npm run typecheck` — TypeScript check
- `npm run format` / `format:check` — Prettier
- `npm run lint` — ESLint
- `npm run clear` — clear Docusaurus cache

## Adding a new plugin

1. Add it to `package.json` dependencies
2. Wire it up in `docusaurus.config.ts`
3. Create `docs/<plugin-name>/` with at minimum `overview.md`, `getting-started.md`, `configuration.md`
4. Add entries under `advanced/` for non-essential features
5. Register the new section in `sidebars.ts`
6. Add it to `src/pages/index.mdx` and `docs/intro.md`

## Relationship to the plugin repos

This site's directory is a **sibling** to each plugin's own repo — not a parent or a workspace. Each plugin is published independently to npm. Do not introduce workspace configuration, shared `package.json`, or cross-linking that crosses directory boundaries.

## License

MIT
