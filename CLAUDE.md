# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

`docusaurus-plugins-docs` — a Docusaurus v3 documentation site for a family of Docusaurus plugins. The site installs and demos every plugin it documents, so docs and live behaviour stay in sync.

- Entry: `docusaurus.config.ts`
- Content: `docs/` (per-plugin nested structure), `blog/`, `src/pages/`
- Glossary source: `glossary/glossary.json`
- Theme overrides: `src/css/custom.css`

## Plugins documented here

Each is a standalone npm package (not a workspace):

| Directory (this repo) | Package                            | Docs route               |
| --------------------- | ---------------------------------- | ------------------------ |
| —                     | `docusaurus-plugin-banner`         | `/docs/banner/*`         |
| —                     | `docusaurus-plugin-cookie-consent` | `/docs/cookie-consent/*` |
| —                     | `docusaurus-plugin-glossary`       | `/docs/glossary/*`       |
| —                     | `docusaurus-plugin-new-post-toast` | `/docs/new-post-toast/*` |
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

1. Fixes the tsup-generated CJS bug in `docusaurus-plugin-glossary` and `docusaurus-plugin-new-post-toast` where `var import_meta = {}` causes `fileURLToPath(undefined)`. Also patches the same pattern in `docusaurus-plugin-starter` (harmlessly — already uses `__filename`/`__dirname` names).
2. Neutralises `docusaurus-plugin-new-post-toast`'s `validateOptions` export. The plugin's `validateOptions` returns `{valid,errors,warnings}` instead of the validated options, which would wipe the auto-assigned `id: 'default'`.
3. Renames `docusaurus-plugin-new-post-toast`'s `contentLoaded` hook to `allContentLoaded` — the plugin reads `args.allContent`, which Docusaurus only populates in the latter hook.

Root fixes belong in the plugin repos. If a plugin publishes a release with the fix landed, trim that case out of the patch script. `package.json` also pins `webpack: 5.105.4` via `overrides` — webpack 5.106 regressed `ProgressPlugin`'s schema validation in a way that breaks `webpackbar@6.0.1`.

`docusaurus-plugin-starter` is intentionally **not** registered in `docusaurus.config.ts`. It's a template for building new plugins, not a library — its demo route has SSR issues when consumed from a sibling site because it's meant to be forked.

## Out of scope

- Publishing plugins (happens in each plugin's own repo)
- Modifying plugin source from here — if docs drift from implementation, fix the relevant plugin repo
