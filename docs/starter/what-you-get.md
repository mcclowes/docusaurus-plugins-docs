---
id: what-you-get
title: What's in the repo
---

# What's in the repo

```text
├── src/
│   ├── index.ts                # Package entry – re-exports plugin + helpers
│   ├── plugin.ts               # Lifecycle hooks with typed options
│   ├── client/index.ts         # Minimal client module (logs route updates)
│   ├── components/StarterPage  # Example route wired via addRoute
│   ├── remark/starterRemarkPlugin.ts
│   └── theme/StarterMessage    # Theme component exposed for swizzling
├── __tests__/plugin.test.js    # Lifecycle smoke tests
├── examples/docusaurus-v3/     # Local example site consuming ./dist
├── scripts/                    # Build + watch helpers for copying assets
├── tsconfig.json               # TypeScript config (src → dist)
├── jest.config.cjs             # Jest set up for TS/React
└── README.md
```

## Scripts you get

- `npm run build` — compile TypeScript, copy assets into `dist/`
- `npm run watch` — rebuild on changes (pair with a running example site)
- `npm run test` — Jest against TypeScript sources
- `npm run example:start | build | serve` — helpers for the bundled example site

## Files you'll edit vs. files you'll leave alone

**Edit heavily:**

- `src/plugin.ts` — your plugin's actual logic
- `src/types.ts` (you'll add this) — option types
- `README.md` — your documentation
- `package.json` — name, description, keywords

**Edit lightly:**

- `src/client/index.ts` — extend or simplify the client module
- `src/theme/` + `src/components/` — swap for your real components
- `examples/docusaurus-v3/docusaurus.config.js` — configure your plugin in the example

**Leave alone initially:**

- `scripts/` — build/copy helpers
- `tsconfig.json`, `jest.config.cjs` — tune only when you hit a limit
