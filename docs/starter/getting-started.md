---
id: getting-started
title: Getting started
---

# Getting started

The starter is meant to be **cloned**, not npm-installed. Its `dist/` output is technically publishable, but the value is in the source code and scripts.

## Clone and rename

```bash
git clone https://github.com/mcclowes/docusaurus-plugin-starter my-cool-plugin
cd my-cool-plugin
rm -rf .git
git init
```

Then find-and-replace:

- `docusaurus-plugin-starter` → `my-cool-plugin` in `package.json`, `README.md`, `examples/`
- Rename `StarterMessage`, `StarterPage`, `starterRemarkPlugin`, `/starter` route path
- Update `CHANGELOG.md`

## Build and run the example

```bash
npm install
npm run example:start
```

Open `http://localhost:3000/starter` — the plugin registers a route and renders its example component. Hot reload works in `src/` because `npm run watch` is running via `example:start`.

## The dev loop

1. Edit anything in `src/`
2. The example site hot-reloads
3. Run `npm run build` when you're ready to consume or publish `dist/`

## Try it in consume-mode (without cloning)

If you just want to see it work first:

```bash
npm install docusaurus-plugin-starter
```

```ts
// docusaurus.config.ts
import path from 'path';
import pluginStarter from 'docusaurus-plugin-starter';

export default {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [
            pluginStarter.createStarterRemarkPlugin({
              marker: 'NOTE',
              replacement: '💡 NOTE',
            }),
          ],
        },
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-starter',
      {
        greetingMessage: 'Welcome to the example site!',
        routePath: '/starter',
      },
    ],
  ],
};
```

But the real value kicks in when you fork and strip it down.
