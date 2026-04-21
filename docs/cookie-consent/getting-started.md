---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-cookie-consent
```

## Minimum config

```ts
// docusaurus.config.ts
import type { Config } from '@docusaurus/types';

const config: Config = {
  plugins: [
    [
      'docusaurus-plugin-cookie-consent',
      {
        title: 'Cookie Consent',
        description: 'We use cookies to enhance your browsing experience and analyze our traffic.',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Cookie Policy', href: '/cookies' },
        ],
      },
    ],
  ],
};

export default config;
```

The banner automatically appears on first visit and disappears once the user makes a choice. Preferences persist in `localStorage` under `cookie-consent-preferences` (override with `storageKey`).

## Next

- [Configuration](./configuration.md) — every option
- [Using the hook](./hook.md) — gate your analytics scripts
- [Google Consent Mode v2](./advanced/google-consent-mode.md) — GTM/GA4 integration
