---
id: remark-integration
title: Shipping a remark plugin
---

# Shipping a remark plugin

`src/remark/starterRemarkPlugin.ts` shows the pattern for bundling a remark plugin with your Docusaurus plugin. This lets you transform markdown at build time — useful for custom shortcodes, auto-linking (like the glossary plugin), or syntax extensions.

## The shape of a remark plugin

```ts
import type { Plugin } from 'unified';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export interface StarterRemarkOptions {
  marker?: string;
  replacement?: string;
}

export const createStarterRemarkPlugin =
  (options: StarterRemarkOptions = {}): Plugin<[], Root> =>
  () =>
  (tree) => {
    const marker = options.marker ?? 'NOTE';
    const replacement = options.replacement ?? '💡 NOTE';

    visit(tree, 'text', (node) => {
      if (node.value.includes(marker)) {
        node.value = node.value.replaceAll(marker, replacement);
      }
    });
  };
```

## Exposing it from your plugin entry

```ts
// src/index.ts
export { default } from './plugin';
export { createStarterRemarkPlugin } from './remark/starterRemarkPlugin';
```

## How users consume it

```js
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
};
```

## AST traversal tips

- Use [`unist-util-visit`](https://github.com/syntax-tree/unist-util-visit) rather than recursing by hand
- Skip `code` / `inlineCode` / `link` nodes if you don't want to transform inside them
- For injecting MDX JSX (like the glossary plugin does), you'll need to add an `import` via an `mdxjsEsm` node plus produce `mdxJsxTextElement` nodes
- If your transform needs async work (file reads, API calls), make the transformer async and return the tree explicitly
