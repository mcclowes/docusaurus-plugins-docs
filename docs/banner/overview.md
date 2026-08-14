---
id: overview
title: Banner
sidebar_label: Overview
---

# `docusaurus-plugin-banner`

A customizable, dismissable announcement banner that sits above your navbar. Dismissal state is persisted in `localStorage` so users don't see the same banner twice.

## Why use it

- You want a top-of-page announcement without swizzling the theme
- You need a stable dismissal key that can be versioned when an announcement changes
- You want plain HTML content and full control over colors

## At a glance

- Dismissable with a close button (optional)
- Customizable colors, content (plain text or HTML), and link styling
- Optional `id` and `version` values for dismissal-key isolation and invalidation
- Smooth animation on dismiss
- TypeScript types exported

## Live demo

You're looking at it — the blue bar at the top of this page is a banner configured in [`docusaurus.config.ts`](https://github.com/mcclowes/docusaurus-plugins-docs/blob/main/docusaurus.config.ts) of this site.

## Real-world example

The plugin ships a full runnable example site at [`examples/docusaurus-v3/`](https://github.com/mcclowes/docusaurus-plugin-banner/tree/main/examples/docusaurus-v3).

## Compatibility

- Docusaurus `^3.0.0`
- React `^18`
- Requires `localStorage` (all modern browsers)
