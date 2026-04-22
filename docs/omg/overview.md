---
id: overview
title: omg
sidebar_label: Overview
---

# `docusaurus-plugin-omg`

A Docusaurus v3 plugin that compiles [OMG](https://omg.gs/) (OpenAPI Markdown Grammar) source files to **OpenAPI 3.1** at build time, ready for any OpenAPI renderer.

OMG is a Markdown DSL for writing API specs — roughly 6× shorter than raw OpenAPI YAML. The plugin runs the `omg-parser` + `omg-compiler` pipeline as part of `docusaurus build` / `docusaurus start` and drops the resulting `.yaml` (or `.json`) on disk so a renderer plugin — [Redocusaurus](https://github.com/rohit-gohri/redocusaurus), [docusaurus-plugin-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs), standalone Swagger UI — can pick it up.

Deliberately thin: no bundled renderer, no opinions about how the spec gets displayed.

## Why use it

- You want to author API specs in a Markdown-native format instead of raw OpenAPI YAML
- You want the spec compiled fresh on every Docusaurus build, with no separate build step
- You want to keep your renderer choice open (Redoc, Swagger UI, custom)

## At a glance

- One plugin block, one `apis` array entry per spec
- Outputs to `static/<dir>/<id>.yaml` by default — served at `/api/<id>.yaml` at runtime
- Watch-mode aware: editing any `.omg.md` file under your input directory triggers a rebuild
- Build fails loudly on parse/compile errors, with the offending API id called out
- TypeScript types exported (`PluginOmgOptions`, `OmgApiInput`, etc.)

## Live demo

This site uses the plugin to compile a tiny todo API from `api/todo/api.omg.md`. The compiled OpenAPI 3.1 spec is served at [`/api/todo.yaml`](/api/todo.yaml) — open it to see the output, or feed it to your favourite renderer.

The source files live in [`api/todo/`](https://github.com/mcclowes/docusaurus-plugins-docs/tree/main/api/todo) of this repo.

## Next

- [Getting started](./getting-started.md) — install + minimum config
- [Configuration](./configuration.md) — full option list
- [Source layout](./advanced/source-layout.md) — how `.omg.md` files are organised
- [Pairing with renderers](./advanced/renderers.md) — Redocusaurus, openapi-docs, Swagger UI
