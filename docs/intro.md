---
id: intro
title: Introduction
slug: /intro
sidebar_position: 1
---

# Docusaurus plugins

This site documents — and dogfoods — a family of Docusaurus v3 plugins. Every plugin you read about here is also installed and configured in the site you're reading it on, so each page is itself an example of the plugin in action.

## The plugins

| Plugin                                             | What it does                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [**Banner**](./banner/overview.md)                 | Dismissable announcement banner at the top of every page, with localStorage persistence.                            |
| [**Cookie consent**](./cookie-consent/overview.md) | GDPR-style consent modal/toast with Google Consent Mode v2 integration and a React hook for gated scripts.          |
| [**Glossary**](./glossary/overview.md)             | Auto-generated glossary page, a `GlossaryTerm` component, and a remark plugin that auto-links terms in markdown.    |
| [**New post toast**](./new-post-toast/overview.md) | Toast notifications for new blog posts since the user's last visit — purely client-side.                            |
| [**Starter**](./starter/overview.md)               | A lean template for building your own Docusaurus plugin: lifecycle hooks, client modules, remark, theme, and tests. |
| [**Statuspage**](./statuspage/overview.md)         | Discreet banner that surfaces ongoing incidents from a public Statuspage.io instance.                               |

## How the docs are organised

Each plugin has:

- **Overview** — what it is, why you'd use it
- **Getting started** — minimal install + config
- **Configuration** — the full option table
- **Advanced** — nested pages for deeper features (categories, hooks, Google Consent Mode, remark integration, etc.)

Every plugin repo also ships a runnable `examples/` directory — those are linked from each plugin's overview page.

## Compatibility

All plugins target Docusaurus `^3.0.0` and React `^18`. Node 18+ required.
