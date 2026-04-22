---
id: configuration
title: Configuration
---

# Configuration

## Plugin options

| Option      | Type               | Default        | Notes                                                        |
| ----------- | ------------------ | -------------- | ------------------------------------------------------------ |
| `apis`      | `OmgApiInput[]`    | `[]`           | APIs to compile. Each entry produces one output file.        |
| `outputDir` | `string`           | `'static/api'` | Default directory for compiled specs, relative to site root. |
| `format`    | `'yaml' \| 'json'` | `'yaml'`       | Default output format for APIs that don't override it.       |

With the default `outputDir` of `static/api`, compiled specs land in your site's `static/` directory — Docusaurus then serves them at `/api/<id>.yaml` (or `.json`).

## `OmgApiInput`

| Field    | Type               | Default                     | Notes                                                                                         |
| -------- | ------------------ | --------------------------- | --------------------------------------------------------------------------------------------- |
| `id`     | `string`           | —                           | Required. Used as the compiled filename when `output` is not set; also surfaced in log lines. |
| `input`  | `string`           | —                           | Required. Path to the **root** `.omg.md` file, relative to the Docusaurus site root.          |
| `output` | `string`           | `<outputDir>/<id>.<format>` | Output path, relative to the site root.                                                       |
| `format` | `'yaml' \| 'json'` | plugin-level `format`       | Overrides the default for this API only.                                                      |

## Examples

### Single API with defaults

```ts
{
  apis: [{ id: 'todo', input: 'api/todo/api.omg.md' }],
}
// Output: static/api/todo.yaml → served at /api/todo.yaml
```

### Multiple APIs with mixed formats

```ts
{
  apis: [
    { id: 'todo', input: 'api/todo/api.omg.md' },
    { id: 'billing', input: 'api/billing/api.omg.md', format: 'json' },
  ],
}
// Output:
//   static/api/todo.yaml     → /api/todo.yaml
//   static/api/billing.json  → /api/billing.json
```

### Custom output path

Useful when you want the spec colocated with documentation rather than in `static/`:

```ts
{
  apis: [
    {
      id: 'todo',
      input: 'api/todo/api.omg.md',
      output: 'docs/reference/todo.openapi.yaml',
    },
  ],
}
```

### Project-wide default format

```ts
{
  format: 'json',
  apis: [
    { id: 'todo', input: 'api/todo/api.omg.md' },     // → todo.json
    { id: 'billing', input: 'api/billing/api.omg.md' }, // → billing.json
  ],
}
```

## Watch mode

During `docusaurus start` the plugin reports the parent directory of each `input` via `getPathsToWatch()`, so edits to any `.omg.md` file under that directory trigger a hot rebuild.

## Build-time errors

Parse or compile failures fail the build with a message identifying the offending api id, e.g.:

```
[docusaurus-plugin-omg] failed to parse api "todo" from /…/api/todo/api.omg.md: <details>
```

This is intentional — a broken spec should not silently produce a broken site.
