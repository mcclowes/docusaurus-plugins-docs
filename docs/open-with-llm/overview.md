---
id: overview
title: Open with LLM
sidebar_label: Overview
---

# `docusaurus-plugin-open-with-llm`

![Banner for docusaurus-plugin-open-with-llm, featuring the plugin's dinosaur mascot](/img/plugin-banners/open-with-llm.png)

Adds an **Open with AI** menu to every Docusaurus docs page. Readers can copy, view, or download the page as Markdown, or open it as context in ChatGPT or Claude.

## Why use it

- Give readers clean Markdown without asking them to scrape the rendered page
- Send a page to an LLM with a prefilled prompt and one click
- Add custom providers without replacing the built-in copy and view actions
- Fit the control into the standard docs layout without editing each page

## How it works

The plugin adds its menu by wrapping the Docusaurus `DocItem/Layout` theme component. It expects a static Markdown version beside each docs route:

```text
Docs page:       https://example.com/guides/payments/
Markdown source: https://example.com/guides/payments/index.md
```

The plugin supplies the menu, but doesn't generate those Markdown files. Use a Markdown export plugin or a build step that already owns this job.

## Default actions

- Copy as Markdown
- View as Markdown
- Download as Markdown
- Open in ChatGPT
- Open in Claude

## Compatibility

- Docusaurus `^3.0.0`
- React `^18.0.0` or `^19.0.0`
- Node.js `>=20`

See the [demo site](https://github.com/mcclowes/docusaurus-plugin-open-with-llm/tree/main/examples/demo) for a working setup.
