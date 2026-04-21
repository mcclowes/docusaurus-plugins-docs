---
id: overview
title: Starter
sidebar_label: Overview
---

# `docusaurus-plugin-starter`

A lean, batteries-included template for building your own Docusaurus plugin. Use it as a launchpad: rename things, rip out the examples, and focus on your feature without rebuilding the plumbing.

## What's in the box

- **Typed plugin skeleton** — `src/plugin.ts` shows the essential lifecycle hooks with helpful comments
- **Client + theme wiring** — `src/client/index.ts` and `src/theme/StarterMessage` demonstrate browser-side behavior and swizzlable components
- **Remark integration** — `src/remark/starterRemarkPlugin.ts` shows how to ship markdown transforms
- **Example site** — `examples/docusaurus-v3` consumes the plugin locally so you can iterate quickly
- **Tests + build scripts** — Jest, TypeScript, and copying helpers are configured out-of-the-box

## Why use it

If you're about to build a Docusaurus plugin, you'll burn half a day on project setup:

- TypeScript config that keeps source in `src/` and ships compiled output in `dist/`
- A build script that compiles TS _and_ copies non-TS assets (CSS modules, JS components)
- Jest configured for TS + React
- An example Docusaurus site that consumes the built plugin

This starter ships all of it working. Copy, rename, ship.

## Why there's no live `/starter` route here

Unlike the other plugins in this family, `docusaurus-plugin-starter` is a **template**, not a library. It's meant to be forked and remixed, not installed-and-consumed. Its example `StarterPage` route assumes you control the surrounding repo; installing it as-is into a docs site doesn't add useful runtime behavior. So on this site the plugin is documented but not registered in `docusaurus.config.ts`.

To see it working, clone the repo and run `npm run example:start` — the example Docusaurus site inside `examples/docusaurus-v3/` registers the plugin against its own local source.

## Real-world examples

Full example sites and client snippets at [`examples/`](https://github.com/mcclowes/docusaurus-plugin-starter/tree/main/examples):

- `docusaurus-v3/` — the consuming example site
- `client-conditional-loading.ts`, `client-dom-manipulation.ts`, `client-event-listeners.ts`, `client-external-library.ts` — four patterns for client-side plugin behavior
