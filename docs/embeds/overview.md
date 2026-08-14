---
id: overview
title: Embeds
sidebar_label: Overview
---

# `docusaurus-plugin-embeds`

![Banner for docusaurus-plugin-embeds, featuring the plugin's dinosaur mascot](/img/plugin-banners/embeds.png)

Rich MDX embeds for links, GitHub repositories, npm packages, and YouTube videos. The plugin registers each component globally, so you can use it in MDX without imports.

## Why use it

- Turn ordinary links into useful previews without building and maintaining local components
- Keep cards consistent with Docusaurus colors in light and dark modes
- Resolve rich-link metadata at build time, so readers don't make metadata requests
- Add responsive, privacy-enhanced YouTube videos with one component

## Components

| Component          | What it displays                                                      |
| ------------------ | --------------------------------------------------------------------- |
| `<RichLinkCard>`   | Open Graph, Twitter Card, or standard metadata for any public URL     |
| `<GitHubRepoCard>` | Description, stars, forks, language, license, update date, and topics |
| `<NpmPackageCard>` | Version, weekly downloads, license, update date, and keywords         |
| `<YouTube>`        | A responsive, lazy-loaded video from YouTube's privacy-enhanced host  |

## How data is loaded

Rich-link metadata is fetched and cached during the build. GitHub and npm cards fetch public API data in the reader's browser after hydration, with a working link available during loading or if an API request fails.

## Compatibility

- Docusaurus `^3.0.0`
- React `^18.0.0` or `^19.0.0`
- Node.js `>=20`

See the [example site](https://github.com/mcclowes/docusaurus-plugin-embeds/tree/main/examples/site) for every component in use.
