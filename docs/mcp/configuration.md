---
id: configuration
title: Configuration
---

# Configuration

| Option                            | Type                       | Default              | Description                                                              |
| --------------------------------- | -------------------------- | -------------------- | ------------------------------------------------------------------------ |
| `server.name` / `server.version` | `string`                   | site title / `0.0.0` | Identity reported to MCP clients.                                        |
| `instructions`                    | `string`                   | —                    | One-line steer shown to the model on connect.                            |
| `docsDir`                         | `string`                   | `docs`               | Docs source dir, relative to the site.                                   |
| `routeBasePath`                   | `string`                   | `/`                  | Route base path your docs are served under. Used to build real page URLs. |
| `openapi`                         | `{ name, spec }[]`         | `[]`                 | Specs to index. `spec` is a JSON or YAML path relative to the site. See [OpenAPI](./advanced/openapi.md). |
| `exclude`                         | `string[]`                 | `[]`                 | Substrings; any source-relative doc path containing one is skipped.      |
| `outputDir`                       | `string`                   | `mcp`                | Snapshot location, relative to the build `outDir`.                       |
| `endpoint`                        | `string`                   | `/mcp`               | Default endpoint path for the CLI server.                                |

## Examples

### Steer the model and exclude drafts

```ts
[
  'docusaurus-plugin-mcp',
  {
    server: { name: 'my-docs', version: '1.0.0' },
    instructions: 'Search these docs before answering questions about the SDK.',
    exclude: ['/drafts/', '/internal/'],
  },
];
```

### Docs served under a base path

If your docs aren't at the site root, set `routeBasePath` so generated page URLs match what's actually served:

```ts
[
  'docusaurus-plugin-mcp',
  {
    server: { name: 'my-docs', version: '1.0.0' },
    routeBasePath: '/docs',
  },
];
```

### With OpenAPI specs

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
