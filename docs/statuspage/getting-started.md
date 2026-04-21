---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-statuspage
```

## Minimum config

```ts
// docusaurus.config.ts
export default {
  plugins: [
    [
      'docusaurus-plugin-statuspage',
      {
        statuspageUrl: 'https://acme.statuspage.io',
      },
    ],
  ],
};
```

That's it — the plugin reads incidents from `https://acme.statuspage.io/api/v2/summary.json` and shows a bottom-left banner when anything is wrong.

## Verify

1. Start your site with `npm start`
2. Inspect the page — you'll see a `<meta name="docusaurus-statuspage" content="…">` tag in the `<head>`
3. The banner only appears when there's an active incident. To test your setup without waiting for an outage, temporarily point `statuspageUrl` at a page with an ongoing incident (e.g. during an actual GitHub outage: `https://www.githubstatus.com`)

## Next

- [Configuration](./configuration.md) — position, custom labels, disabling
- [How it works](./advanced/how-it-works.md) — API calls and dismissal internals
