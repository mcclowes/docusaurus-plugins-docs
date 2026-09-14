---
id: component
title: The GlossaryTerm component
---

# The `<GlossaryTerm>` component

While the [remark plugin](./advanced/auto-linking.md) handles most cases automatically, the `GlossaryTerm` theme component lets you opt in or override behavior in MDX files directly.

## Import

```mdx
import GlossaryTerm from '@theme/GlossaryTerm';
```

You only need this when you're using the component _explicitly_ — the remark plugin injects this import automatically for auto-linked terms.

## Usage

### Self-closing (term is both the lookup and the display text)

```mdx
This website uses an <GlossaryTerm term="API" /> to fetch data.
```

### With children (custom display text)

```mdx
Our <GlossaryTerm term="API">RESTful API</GlossaryTerm> is available.
```

### With an explicit definition (override the JSON)

```mdx
We use <GlossaryTerm term="REST" definition="Representational State Transfer" /> for our services.
```

## Props

| Prop                | Required | Description                                                                                   |
| ------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `term`              | yes      | Lookup key matching an entry in `glossary.json`.                                              |
| `definition`        | no       | Override the definition from the glossary file.                                               |
| `abbreviation`      | no       | Override the long-form expansion shown in the tooltip.                                        |
| `id`                | no       | Override the glossary entry anchor. Defaults to the configured ID or one derived from `term`. |
| `routePath`         | no       | Override the glossary page route. Defaults to the configured route or `/glossary`.            |
| `documentationPath` | no       | Link to an internal documentation page instead of the glossary entry.                         |
| `children`          | no       | Custom display text. Defaults to `term`.                                                      |

## When to use it manually

- The auto-linker won't touch terms inside code blocks, existing links, or existing MDX components — use the component manually if you want those matched
- When you need a one-off override of the term text or definition (e.g. localized phrasing) without editing `glossary.json`

## Embedding a glossary in a doc

This feature is unreleased. The `Glossary` component renders the built-in search,
alphabet navigation, and term cards without a page layout. A normal docs page
supplies the sidebar, version navigation, and page title.

For a glossary plugin instance named `module`, configure:

```js
plugins: [
  [
    'docusaurus-plugin-glossary',
    {
      id: 'module',
      glossaryPath: 'glossary/module.json',
      routePath: '/my-module/glossary',
      generatePage: false,
    },
  ],
];
```

Use the same `glossaryPath` and `routePath` in that docs instance's
`getRemarkPlugin` configuration. The plugin still provides global data and
inline tooltips; it just skips registering its own page.

Create a doc whose final URL is `/my-module/glossary`:

```mdx
---
title: Module glossary
slug: /glossary
---

import Glossary from 'docusaurus-plugin-glossary/components/Glossary';
import { usePluginData } from '@docusaurus/useGlobalData';

export function ModuleGlossary() {
  const glossaryData = usePluginData('docusaurus-plugin-glossary', 'module');
  return <Glossary glossaryData={glossaryData} showTitle={false} />;
}

<ModuleGlossary />
```

This example assumes the docs instance uses `routeBasePath: 'my-module'`. Add
the doc to that instance's sidebar. For the default glossary instance, omit the
second argument to `usePluginData`. You can also pass imported glossary JSON
directly as `glossaryData`.

| Prop           | Default        | Description                                                                    |
| -------------- | -------------- | ------------------------------------------------------------------------------ |
| `glossaryData` | Empty glossary | Parsed glossary data, including terms, optional title, and description.        |
| `showTitle`    | `true`         | Render the glossary title. Set to `false` when the doc already provides an H1. |
