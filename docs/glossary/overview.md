---
id: overview
title: Glossary
sidebar_label: Overview
---

# `docusaurus-plugin-glossary`

![Banner for docusaurus-plugin-glossary, featuring the plugin's dinosaur mascot](/img/plugin-banners/glossary.png)

Three things in one package:

1. **An auto-generated glossary page** at `/glossary` (or wherever you configure it) — alphabetized, with letter-based navigation and a search box that matches against term names, definitions, abbreviations, and aliases
2. **A `<GlossaryTerm>` theme component** you can use inline in MDX
3. **A remark plugin** that automatically detects glossary terms in your markdown, wraps them with `<GlossaryTerm>`, and injects the required import

You define terms once in a JSON file; the plugin handles everything else.

## Why use it

- You have a growing vocabulary of technical terms and you want one canonical place for them
- You want tooltips on hover for unfamiliar terms, without rewriting all your markdown
- You want a standalone `/glossary` page users can browse

## Live demo

Visit the [`/glossary`](/glossary) page of this site — it's generated from [`glossary/glossary.json`](https://github.com/mcclowes/docusaurus-plugins-docs/blob/main/glossary/glossary.json). Terms in these docs (like **API**, **REST**) are auto-linked to it.

## Real-world example

Full runnable example site at [`examples/docusaurus-v3/`](https://github.com/mcclowes/docusaurus-plugin-glossary/tree/main/examples/docusaurus-v3).

## Compatibility

- Docusaurus `^3.0.0` with MDX v3
- React `^18` or `^19`
- Node.js 20 or newer

## Exports

- Default — the plugin function
- `/preset` — a wrapped preset-classic that auto-configures the remark plugin
- `getRemarkPlugin()` — helper for manual preset setups
- `remarkPlugin` — raw remark plugin if you want full control
