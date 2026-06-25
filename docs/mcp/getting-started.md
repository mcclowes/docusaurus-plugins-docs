---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-mcp
```

## Minimum config

```ts
// docusaurus.config.ts
export default {
  plugins: [
    [
      'docusaurus-plugin-mcp',
      {
        server: { name: 'my-docs', version: '1.0.0' },
      },
    ],
  ],
};
```

Run `docusaurus build` and you'll get `build/mcp/snapshot.json` — a single file holding the indexed docs.

## Serve it locally

After a build, serve the snapshot:

```bash
npx docusaurus-plugin-mcp serve   # reads build/mcp/snapshot.json on :3100
```

Or build and serve in one step, skipping the full Docusaurus build:

```bash
npx docusaurus-plugin-mcp serve --site . --openapi api=openapi/api.json
```

Then point a client at `http://localhost:3100/mcp`, or inspect it:

```bash
npx @modelcontextprotocol/inspector   # connect via Streamable HTTP
```

## Connect a client

```bash
# Claude Code
claude mcp add --transport http my-docs https://docs.example.com/mcp
```

```json
// Cursor / VS Code: .cursor/mcp.json or .vscode/mcp.json
{ "mcpServers": { "my-docs": { "url": "https://docs.example.com/mcp" } } }
```

## Next

- [Configuration](./configuration.md) — the full option table
- [OpenAPI](./advanced/openapi.md) — index your specs and serve resolved endpoint schemas
- [Serving](./advanced/serving.md) — local CLI, production serverless, and programmatic use
