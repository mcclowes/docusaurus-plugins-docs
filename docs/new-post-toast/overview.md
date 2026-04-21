---
id: overview
title: New post toast
sidebar_label: Overview
---

# `docusaurus-plugin-new-post-toast`

Toast notifications for returning visitors when new blog posts have been published since their last visit. **No backend required** — all state lives in `localStorage`.

## Why use it

- You publish regularly and want to surface new content to returning readers
- You want to avoid email newsletters but still keep an engagement loop
- You don't want to run a backend or write a subscription system

## How it works

1. **Build time** — the plugin hooks Docusaurus's blog plugin to extract post metadata (title, date, permalink, description)
2. **Runtime** — on each page load it:
   - Reads `lastVisit` from `localStorage`
   - Shows a toast for every post published since then (up to `maxToasts`)
   - Updates `lastVisit` to now

## Compatibility

- Docusaurus `^3.0.0`
- React `^18`
- The default Docusaurus blog plugin (or custom instances configured via `blog.pluginId`)

## Real-world example

Full example site at [`examples/docusaurus-v3/`](https://github.com/mcclowes/docusaurus-plugin-post-notifications/tree/main/examples/docusaurus-v3).

## Note on the package name

The package publishes as **`docusaurus-plugin-new-post-toast`** even though the source repo is called `docusaurus-plugin-post-notifications`.
