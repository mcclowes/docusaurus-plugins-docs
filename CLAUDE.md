# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

`docusaurus-plugins-docs` — a Docusaurus v3 documentation site for a family of Docusaurus plugins. The site installs and demos most plugins it documents, so docs and live behaviour stay in sync. Exceptions (`starter`, `marginalia`) are called out below.

- Entry: `docusaurus.config.ts`
- Content: `docs/` (per-plugin nested structure), `blog/`, `src/pages/`
- Glossary source: `glossary/glossary.json`
- Theme overrides: `src/css/custom.css`

## Plugins documented here

Each is a standalone npm package (not a workspace). Most install from the npm registry; `new-post-toast` and `starter` install from local tarballs in `vendor/` (see `package.json` — `file:./vendor/*.tgz`) because the published versions need the workarounds documented below:

| Directory (this repo) | Package                            | Docs route               |
| --------------------- | ---------------------------------- | ------------------------ |
| —                     | `docusaurus-plugin-banner`         | `/docs/banner/*`         |
| —                     | `docusaurus-plugin-cookie-consent` | `/docs/cookie-consent/*` |
| —                     | `docusaurus-plugin-glossary`       | `/docs/glossary/*`       |
| —                     | `docusaurus-plugin-marginalia`     | `/docs/marginalia/*`     |
| —                     | `docusaurus-plugin-mcp`            | `/docs/mcp/*`            |
| —                     | `docusaurus-plugin-new-post-toast` | `/docs/new-post-toast/*` |
| —                     | `docusaurus-plugin-omg`            | `/docs/omg/*`            |
| —                     | `docusaurus-plugin-starter`        | `/docs/starter/*`        |
| —                     | `docusaurus-plugin-statuspage`     | `/docs/statuspage/*`     |

The source of each plugin lives in its own sibling repo under `~/Development/docusaurus/`. **Do not** introduce a monorepo or workspace spanning them — they are maintained as independent repos and that boundary is load-bearing.

## Stack

- Docusaurus `^3.5` with the glossary plugin's preset (wraps `preset-classic`)
- React 18, TypeScript
- npm (not pnpm / yarn)
- Prettier + ESLint
- Node >=18

## Commands

- `npm start` — dev server
- `npm run build` — production build
- `npm run serve` — serve the built site
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` / `format:check` — Prettier
- `npm run lint` — ESLint
- `npm run clear` — clear Docusaurus cache

## Conventions

- Sentence case in docs (not title case)
- Each plugin gets: `overview.md`, `getting-started.md`, `configuration.md`, plus nested `advanced/*.md` pages for deeper features
- Link out to each plugin's real `examples/` folder on GitHub rather than duplicating example code
- Keep option tables in sync with the plugin READMEs when the plugins themselves change
- Prefer well-named functions over inline comments in any `src/` TypeScript

## Task tracking

Use GitHub issues for new work. Reference with `Fixes #N` / `Closes #N` in PRs.

## Known workarounds

The installed plugins have a few published-package bugs the docs site has to work around. `scripts/patch-plugin-cjs.mjs` runs on `postinstall` and:

1. Fixes the tsup-generated CJS bug where `var import_meta = {}; var x = fileURLToPath(import_meta.url)` throws `fileURLToPath(undefined)` under Docusaurus's jiti CJS loader. The script walks every `.cjs` under `dist/` for `docusaurus-plugin-{glossary,new-post-toast,starter,banner,cookie-consent,statuspage}` and rewrites matches to use the CJS-provided `__filename`/`__dirname`. Idempotent — packages without the pattern are left alone, so it's safe to keep all six in the list as the published builds shift.
2. Neutralises `docusaurus-plugin-new-post-toast`'s `validateOptions` export. The plugin's `validateOptions` returns `{valid,errors,warnings}` instead of the validated options, which would wipe the auto-assigned `id: 'default'`.
3. Renames `docusaurus-plugin-new-post-toast`'s `contentLoaded` hook to `allContentLoaded` — the plugin reads `args.allContent`, which Docusaurus only populates in the latter hook.

Root fixes belong in the plugin repos. If a plugin publishes a release with the fix landed, trim that case out of the patch script. `package.json` also pins `webpack: 5.105.4` via `overrides` — webpack 5.106 regressed `ProgressPlugin`'s schema validation in a way that breaks `webpackbar@6.0.1`.

`docusaurus-plugin-starter` is intentionally **not** registered in `docusaurus.config.ts`. It's a template for building new plugins, not a library — its demo route has SSR issues when consumed from a sibling site because it's meant to be forked.

`docusaurus-plugin-marginalia` is currently **documented but not installed**. The plugin exists as a sibling repo (`~/Development/docusaurus/docusaurus-plugin-marginalia`) but isn't yet published to npm. Its docs (`docs/marginalia/*`) and sidebar entry are in place so the install step is a small PR away; don't remove them. Once published, add it to `package.json` and register it in `docusaurus.config.ts` alongside the other plugins.

`docusaurus-plugin-mcp` is registered in `docusaurus.config.ts` and indexes these docs into `build/mcp/snapshot.json` at build time (no visible UI — it has no client-side render). `routeBasePath: '/docs'` is set so generated page URLs match where docs are served. Serve the snapshot locally with `npm run mcp` (reads `build/mcp/snapshot.json` on `:3100`) and point an agent at `http://localhost:3100/mcp`. `npm run mcp:api` is a second demo that also indexes the OMG-generated `static/api/todo.yaml` via the CLI's `--openapi` flag. That spec is **not** wired into the plugin config: it's a build artifact (not git-tracked), and `buildOpenApi` throws on a missing file, so indexing it in-config would break clean builds.

Production serving is wired for Vercel: `api/mcp.ts` is a serverless function that imports `build/mcp/snapshot.json` and serves it via `createNodeHandler`, and `vercel.json` rewrites `/mcp` to `/api/mcp`. Vercel runs the build before tracing the function, so the snapshot exists at bundle time; `build/` is gitignored and never committed. Redeploy to refresh the snapshot. The Docusaurus `url` in the config is still a placeholder — set it to the real domain before deploying.

## Out of scope

- Publishing plugins (happens in each plugin's own repo)
- Modifying plugin source from here — if docs drift from implementation, fix the relevant plugin repo
