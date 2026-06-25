---
id: openapi
title: OpenAPI specs
---

# OpenAPI specs

Point the plugin at one or more OpenAPI specs and it indexes every operation and webhook event alongside your prose. Specs can be JSON or YAML, and paths are relative to the site dir.

```ts
[
  'docusaurus-plugin-mcp',
  {
    server: { name: 'my-docs', version: '1.0.0' },
    openapi: [
      { name: 'api', spec: 'openapi/api.json' },
      { name: 'admin', spec: 'openapi/admin.yaml' },
    ],
  },
];
```

## The API tools

Configuring `openapi` adds three more tools to the server. Without it, they don't appear at all.

| Tool           | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| `list_apis`    | The indexed specs, with versions and operation counts.                   |
| `search_api`   | Search operations and webhook events by path, name, summary, or tag.     |
| `get_endpoint` | Full detail of one operation: params, request body, responses, with `$ref`s resolved. |

## Why resolved schemas matter

Most docs-MCP tools hand the model prose and leave it to guess field names. This plugin resolves `$ref`s when serving `get_endpoint`, so the agent sees the real request and response shapes — the actual fields, types, and nesting — instead of inferring them from surrounding text. That's the difference between an agent that writes a correct request body on the first try and one that fabricates a field that doesn't exist.

## What gets indexed

- **Operations** — every path + method, keyed by `operationId` where present
- **Webhook events** — entries under `webhooks` are indexed like operations
- **Tags and summaries** — used to rank `search_api` results
