---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-embeds
```

## Register the plugin

Add it to `docusaurus.config.ts` or `docusaurus.config.js`:

```ts
export default {
  plugins: ['docusaurus-plugin-embeds'],
};
```

## Add an embed

The components are available in any MDX document without an import:

```mdx
<GitHubRepoCard repo="facebook/docusaurus" />

<NpmPackageCard package="@docusaurus/core" />

<YouTube id="dQw4w9WgXcQ" title="A useful description of the video" />

<RichLinkCard url="https://docusaurus.io/blog/releases/3.0" />
```

`LinkCard` is also available as an alias for `RichLinkCard` in MDX.

## Use components in React

Code outside MDX can import the components directly. Import the stylesheet once near the root of your app:

```tsx
import 'docusaurus-plugin-embeds/styles.css';
import {
  GitHubRepoCard,
  NpmPackageCard,
  RichLinkCard,
  YouTube,
} from 'docusaurus-plugin-embeds/client';
```

See [configuration](./configuration.md) for component props and rich-link cache settings.
