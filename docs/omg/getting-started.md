---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-omg
```

## Minimum config

Add the plugin to `docusaurus.config.ts` (or `.js`) and pre-declare the addresses you want available:

```ts
// docusaurus.config.ts
export default {
  plugins: [
    [
      'docusaurus-plugin-omg',
      {
        addresses: ['adam'],
      },
    ],
  ],
}
```

This fetches the latest status and the latest weblog post for `adam` at build time.

## Use the components

In any `.md` or `.mdx` file:

```mdx
import OmgStatus from '@theme/OmgStatus';
import OmgWeblogLatest from '@theme/OmgWeblogLatest';

<OmgStatus address="adam" />

<OmgWeblogLatest address="adam" />
```

To embed a paste, declare it in plugin options first:

```ts
{
  addresses: ['adam'],
  pastes: [{ address: 'adam', paste: 'my-snippet' }],
}
```

```mdx
import OmgPaste from '@theme/OmgPaste';

<OmgPaste address="adam" paste="my-snippet" language="bash" />
```

## Next

- See [Configuration](./configuration.md) for the full option list and component props
- See [Freshness](./advanced/freshness.md) if your content updates frequently
