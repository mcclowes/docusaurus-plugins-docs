---
id: manual-configuration
title: Manual (non-preset) configuration
---

# Manual configuration

You may want to skip the preset if you're already using a custom preset, or if you only want the glossary page (no auto-linking).

## With the classic preset and auto-linking

Configure the remark plugin yourself using the `getRemarkPlugin` helper:

```js
const glossaryPlugin = require('docusaurus-plugin-glossary');

module.exports = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [
            glossaryPlugin.getRemarkPlugin(
              { glossaryPath: 'glossary/glossary.json', routePath: '/glossary' },
              { siteDir: __dirname },
            ),
          ],
        },
        pages: {
          remarkPlugins: [
            glossaryPlugin.getRemarkPlugin(
              { glossaryPath: 'glossary/glossary.json', routePath: '/glossary' },
              { siteDir: __dirname },
            ),
          ],
        },
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-glossary',
      { glossaryPath: 'glossary/glossary.json', routePath: '/glossary' },
    ],
  ],
};
```

## Using the raw `remarkPlugin` export

If you need full control:

```js
const glossaryPlugin = require('docusaurus-plugin-glossary');

module.exports = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          remarkPlugins: [
            [
              glossaryPlugin.remarkPlugin,
              {
                glossaryPath: 'glossary/glossary.json',
                routePath: '/glossary',
                siteDir: __dirname,
              },
            ],
          ],
        },
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-glossary',
      { glossaryPath: 'glossary/glossary.json', routePath: '/glossary' },
    ],
  ],
};
```

## Just the page, no auto-linking

Skip the remark plugin entirely. The `/glossary` route and manual `<GlossaryTerm>` usage still work:

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-glossary',
      { glossaryPath: 'glossary/glossary.json', routePath: '/glossary' },
    ],
  ],
};
```
