---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-marginalia
```

## Register the plugin

Add it to your `docusaurus.config.ts` (or `.js`):

```ts
// docusaurus.config.ts
export default {
  plugins: ['docusaurus-plugin-marginalia'],
};
```

No options are required — the plugin registers its theme components under
`@theme/Marginalia` and injects a small global stylesheet that widens the
article column when a page mounts `<Marginalia>`.

## Use the components in MDX

```mdx
import { Marginalia, Aside, Endpoint } from '@theme/Marginalia';

<Marginalia>

The concept of <Aside anchor="pattern languages" kind="concept" title="Christopher Alexander" meta={["1977", "253 patterns"]}>*A Pattern Language* catalogued 253 design patterns for towns and buildings.</Aside> has shaped software thinking.

Request a session with <Endpoint method="POST" path="/sessions" />.

</Marginalia>
```

The page automatically picks up a two-column reading layout with cards
floating in the right gutter.

## Next

- See [Configuration](./configuration.md) for the component API
- See [Theming](./advanced/theming.md) to customize colors and fonts
