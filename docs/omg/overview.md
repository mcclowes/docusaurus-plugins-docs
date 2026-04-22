---
id: overview
title: omg
sidebar_label: Overview
---

# `docusaurus-plugin-omg`

Embed [omg.lol](https://omg.lol/) content — statuses, weblog posts, and pastes — directly in your Docusaurus site, fetched at build time and rendered as static HTML.

## Why use it

- You have an omg.lol address and want to surface its content on your docs/blog
- You want zero client-side fetches, no CORS, no auth
- You want your status, your latest post, or a pinned paste to appear inline in MDX

## At a glance

- Three drop-in MDX components: `<OmgStatus>`, `<OmgWeblogLatest>`, `<OmgPaste>`
- Build-time fetch, static HTML output
- Per-fetch error isolation — one missing address won't break your build
- TypeScript types exported
- No authentication required (uses public omg.lol API endpoints)

## Next

- See [Getting started](./getting-started.md) for install + minimum config
- See [Configuration](./configuration.md) for the full option list
- See [Freshness](./advanced/freshness.md) for the build-time-only tradeoff
