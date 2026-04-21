---
id: overview
title: Statuspage
sidebar_label: Overview
---

# `docusaurus-plugin-statuspage`

Displays a discreet, dismissible banner on your Docusaurus site when your public [Statuspage.io](https://www.statuspage.io/) reports degraded service or ongoing incidents. Links users straight to your status page for details.

## Why use it

- You already have a Statuspage and want to surface incidents to docs readers
- You want a zero-maintenance outage banner — it reads from Statuspage's public API, no webhooks or pushing state around
- You want per-incident dismissal so users aren't nagged after acknowledging an issue

## How it works

1. **Build time** — the plugin injects a `<meta name="docusaurus-statuspage" …>` tag with your config
2. **Runtime** — a lightweight client script fetches `{statuspageUrl}/api/v2/summary.json`
3. If `status.indicator` is not `none` or there are ongoing incidents, the banner appears
4. Dismissal is persisted per-incident in `localStorage`

## Live demo

This site is configured against GitHub's public Statuspage (`https://www.githubstatus.com`) for demonstration — if GitHub is having issues when you visit, you'll see a banner.

## Real-world example

Full runnable example site at [`examples/docusaurus-v3/`](https://github.com/mcclowes/docusaurus-plugin-statuspage/tree/main/examples/docusaurus-v3).

## Compatibility

- Docusaurus `^3.0.0`
- React `^18`
- A public Statuspage.io URL that exposes `/api/v2/summary.json`
