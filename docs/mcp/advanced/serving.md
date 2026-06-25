---
id: serving
title: Serving the snapshot
---

# Serving the snapshot

The plugin only produces a snapshot. Serving it is a separate step, because static hosting can't serve a live endpoint. There are two paths: a CLI for local dev, and a serverless function for production.

## Local dev

After a build, serve the snapshot on `:3100`:

```bash
npx docusaurus-plugin-mcp serve
```

Or build and serve in one step, skipping the full Docusaurus build:

```bash
npx docusaurus-plugin-mcp serve --site . --openapi api=openapi/api.json
```

Point a client at `http://localhost:3100/mcp`, or inspect it with `npx @modelcontextprotocol/inspector` over Streamable HTTP.

## Production

Add one serverless function that imports the snapshot. The handler is a standard Node `(req, res)`, so it drops into any Node serverless runtime or an Express route. Vercel example:

```ts
// api/mcp.ts
import { createNodeHandler } from 'docusaurus-plugin-mcp/server';
import snapshot from '../build/mcp/snapshot.json' assert { type: 'json' };

export default createNodeHandler(snapshot, { name: 'my-docs', version: '1.0.0' });
```

It's stateless: a fresh server is created per request, so it scales horizontally with no session store. See [`examples/vercel`](https://github.com/mcclowes/docusaurus-plugin-mcp/tree/main/examples/vercel) for the full setup.

## Programmatic use

For custom pipelines, the snapshot builder and server are exported directly:

```ts
import { buildSnapshot, resolveOptions } from 'docusaurus-plugin-mcp';
import { createMcpServer, createNodeHandler, loadSnapshot } from 'docusaurus-plugin-mcp/server';
```

- `buildSnapshot({ siteDir, baseUrl, options })` — build a snapshot in memory
- `createMcpServer(snapshot, opts)` — a configured `McpServer` from the SDK
- `createNodeHandler(snapshot, opts)` — a stateless Node request handler
- `loadSnapshot(file)` — read a snapshot from disk

## Limitations

- **Doc URLs** are derived from `routeBasePath` plus the file path or `slug` frontmatter. That covers the common cases; exotic routing or path aliases may not match exactly.
- **Refreshing** happens at build. Rebuild to pick up doc changes — the CLI's build-on-the-fly mode is for dev only.
- **Runtime** targets Node. Web-standard and edge runtimes aren't supported yet.
