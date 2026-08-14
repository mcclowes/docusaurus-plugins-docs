---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-banner
```

## Minimum config

Add the plugin to your `docusaurus.config.ts` (or `.js`):

```ts
// docusaurus.config.ts
export default {
  plugins: [
    [
      'docusaurus-plugin-banner',
      {
        content: '🎉 Welcome to our documentation!',
      },
    ],
  ],
};
```

That's it. The banner appears at the very top of the site and can be dismissed — its state is stored in `localStorage` under `docusaurus-banner-dismissed` by default.

## Next

- See [Configuration](./configuration.md) for the full option list
- See [Banner dismissal versions](./advanced/multiple-banners.md) to control when changed content reappears
