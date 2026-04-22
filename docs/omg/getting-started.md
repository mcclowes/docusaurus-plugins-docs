---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-omg
```

The plugin pulls in `omg-parser` and `omg-compiler` automatically.

## Minimum config

Add the plugin to `docusaurus.config.ts` (or `.js`) with one or more `apis` entries. Each entry points at the **root** `.omg.md` file of an OMG project — the parser walks the rest of the directory.

```ts
// docusaurus.config.ts
import type { PluginOmgOptions } from 'docusaurus-plugin-omg'

const omgOptions: PluginOmgOptions = {
  apis: [{ id: 'todo', input: 'api/todo/api.omg.md' }],
}

export default {
  plugins: [['docusaurus-plugin-omg', omgOptions]],
}
```

After `docusaurus build` (or `docusaurus start`) the compiled spec lands at `static/api/todo.yaml` and is served at `/api/todo.yaml` at runtime.

## Author your first OMG spec

Create the input file at `api/todo/api.omg.md` (relative to your Docusaurus site root):

```md title="api/todo/api.omg.md"
---
name: Todo API
version: 1.0.0
baseUrl: https://api.example.com/v1
---

# Todo API

A tiny demo API.
```

Add an endpoint at `api/todo/endpoints/list-todos.omg.md`:

```md title="api/todo/endpoints/list-todos.omg.md"
---
method: GET
path: /todos
operationId: list-todos
tags: [Todos]
---

# List todos

Returns all todos.

```omg.response.200
[{
  id: uuid,
  title: string,
  completed: boolean
}]
```
```

Run `npm start` — the plugin compiles on the fly, and `/api/todo.yaml` updates as you save.

## Next

- See [Source layout](./advanced/source-layout.md) for the full directory structure
- See [Configuration](./configuration.md) for output paths, formats, and multi-API setups
- See [Pairing with renderers](./advanced/renderers.md) to actually render the spec on a page
