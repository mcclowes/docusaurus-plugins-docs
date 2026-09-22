---
id: overview
title: Share selection
sidebar_label: Overview
---

# `docusaurus-plugin-share-selection`

Highlight text on a page and a small palette appears above it. Readers can copy the passage for Slack or Teams, ask an AI about it with the surrounding context, or share it. Every link points at the exact passage, not just the page.

## Why use it

- People share docs in chat far more than on social. **Copy** puts a quote, the page and section, and a deep link on the clipboard as rich text, so the link survives a paste into Slack, Teams, Notion, or Google Docs.
- Links combine the nearest heading anchor with a text fragment (`#setup:~:text=...`), so the reader lands on the passage with it highlighted. Browsers without text fragment support still land on the heading.
- **Ask AI** sends the passage along with its heading path and the text around it, so the model knows what the reader means.
- Custom actions turn a selection into any URL, such as a pre-filled "Report an issue with this passage" form.

## How it works

The plugin serializes its options into the page and registers a client module. It doesn't wrap or swizzle any theme component, so it can't collide with other plugins. The page is only read when a reader presses a button, and nothing is sent anywhere until then.

## Works with open-with-llm

If [`docusaurus-plugin-open-with-llm`](../open-with-llm/overview.md) is installed, this plugin reuses its AI providers and Markdown filename. Prompts then link to the page's Markdown export too.

## Compatibility

- Docusaurus `^3.0.0`
- Node.js `>=20`

See the [example site](https://github.com/mcclowes/docusaurus-plugin-share-selection/tree/main/examples/docusaurus-v3) for a working setup.
