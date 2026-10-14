---
id: overview
title: Banner
sidebar_label: Overview
---

# `docusaurus-plugin-banner`

A customizable, dismissable announcement banner that sits above your navbar. Dismissal state is persisted in `localStorage` so users don't see the same banner twice.

## Why use it

- You want a top-of-page announcement without swizzling the theme
- You need per-banner dismissal state (multiple banners = multiple `id`s)
- You want plain HTML content and full control over colors

## At a glance

- Dismissable with a close button (optional)
- Customizable colors, content (plain text or HTML), and link styling
- Multiple instances supported via unique `id`
- Smooth animation on dismiss
- TypeScript types exported

## Live demo

You're looking at it — the blue bar at the top of this page is a banner configured in [`docusaurus.config.ts`](https://github.com/mcclowes/docusaurus-plugins-docs/blob/main/docusaurus.config.ts) of this site.

## Real-world example

The plugin ships a full runnable example site at [`examples/docusaurus-v3/`](https://github.com/mcclowes/docusaurus-plugin-banner/tree/main/examples/docusaurus-v3).

## Compatibility

| Plugin version | Docusaurus                       | React |
| -------------- | -------------------------------- | ----- |
| `0.4.x`        | `^3.0.0` (tested up to `3.10.1`) | `^18` |

Also requires `localStorage` (all modern browsers).
