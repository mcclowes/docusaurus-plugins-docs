---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-open-with-llm
```

## Register the plugin

Add it to `docusaurus.config.ts` or `docusaurus.config.js`:

```ts
export default {
  plugins: ['docusaurus-plugin-open-with-llm'],
};
```

This adds the menu to docs pages with the default copy, view, download, ChatGPT, and Claude actions.

## Publish Markdown pages

The menu fetches `index.md` from the current docs route. Your export step should produce files like this:

```text
build/guides/payments/index.html
build/guides/payments/index.md
```

If your exporter uses a different filename, configure `markdownFile`:

```ts
export default {
  plugins: [
    [
      'docusaurus-plugin-open-with-llm',
      {
        markdownFile: 'page.md',
      },
    ],
  ],
};
```

Build the site and check a docs route before deploying. Copy, view, and download should all load the exported Markdown file.

See [configuration](./configuration.md) to change the label, prompt, or provider links.
