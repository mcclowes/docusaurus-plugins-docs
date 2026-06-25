---
id: overview
title: MCP
sidebar_label: Overview
---

# `docusaurus-plugin-mcp`

Exposes your Docusaurus docs and OpenAPI specs as an [MCP](https://modelcontextprotocol.io) server, so AI agents like Claude, Cursor, and VS Code can search your docs and inspect API endpoints from the editor.

Most docs-MCP tools index prose only. This one treats your OpenAPI specs as a first-class source: it resolves `$ref`s and serves full request and response schemas, so an agent gets the real shape of an endpoint instead of guessing field names.

## Why use it

- Your readers (and you) use AI agents, and you'd rather they answer from your docs than hallucinate
- You publish an OpenAPI spec and want agents to inspect real endpoint shapes, not guess
- You want a read-only, build-time index with no live database or search service to run

## How it works

The plugin runs at build time. It reads your docs and OpenAPI files and writes a single snapshot to `build/<outputDir>/snapshot.json` alongside your site. A small, host-agnostic handler then serves MCP over HTTP from that snapshot.

Docusaurus sites usually deploy as static files, which can't serve a live endpoint. So serving is split out: a CLI for local dev, and a tiny serverless function for production. The plugin's only job is producing the snapshot. See [serving](./advanced/serving.md) for both paths.

## Tools

The server exposes six read-only tools:

| Tool                  | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `search_docs`         | Full-text search the docs. Returns URL, title, category, snippet.        |
| `read_doc`            | Full markdown of a page by URL.                                          |
| `list_doc_categories` | Categories with page counts.                                             |
| `list_apis`           | The indexed OpenAPI specs with versions and counts.                      |
| `search_api`          | Search operations and webhook events by path, name, summary, or tag.     |
| `get_endpoint`        | Full detail of one operation: params, request body, responses, `$ref`s resolved. |

The three `*_api` tools only appear when you configure [`openapi`](./advanced/openapi.md). Everything is read-only.

## Live demo

This site runs the plugin. A build emits `build/mcp/snapshot.json` indexing every page you're reading, served live at [`https://docusaurus-plugins.mcclowes.com/mcp`](https://docusaurus-plugins.mcclowes.com/mcp) by a Vercel function (`api/mcp.ts`). Connect an agent to it:

```bash
claude mcp add --transport http plugins-docs https://docusaurus-plugins.mcclowes.com/mcp
```

Locally, run `npm run mcp` after a build and point a client at `http://localhost:3100/mcp` instead. See [serving](./advanced/serving.md) for both paths.

## Real-world example

Runnable Vercel serving example at [`examples/vercel`](https://github.com/mcclowes/docusaurus-plugin-mcp/tree/main/examples/vercel).

## Compatibility

- Docusaurus `^3.0.0` (peer dependency, optional — the snapshot builder and server run standalone too)
- Node `>=20`
- Any Node serverless runtime or Express route for serving. Web-standard/edge runtimes aren't supported yet.
