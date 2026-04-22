---
id: source-layout
title: Source layout
---

# Source layout

OMG specs are split across several `.omg.md` files. The plugin's `input` option points at the **root** file; `omg-parser` walks the rest of the directory automatically.

## Directory structure

```
api/todo/
  api.omg.md                  # info: name, version, baseUrl, auth, servers
  endpoints/
    list-todos.omg.md         # method, path, body, responses
    create-todo.omg.md
  partials/
    errors.omg.md             # shared response fragments
```

Three conventional folders:

- **`api.omg.md`** (root) — the spec's metadata: `name`, `version`, `baseUrl`, optional `auth` and `servers`.
- **`endpoints/`** — one file per endpoint. Each file's frontmatter declares `method`, `path`, `operationId`, `tags`; the body declares request/response shapes.
- **`partials/`** — reusable response or schema fragments referenced from endpoints.

## Endpoint anatomy

```md title="endpoints/list-todos.omg.md"
---
method: GET
path: /todos
operationId: list-todos
tags: [Todos]
---

# List todos

Returns all todos, optionally filtered by completion status.

```omg.query
{
  completed?: boolean,
  limit?: integer @min(1) @max(100)
}
```

```omg.response.200
[{
  id: uuid,
  title: string,
  completed: boolean
}]
```
```

A few things to notice:

- The `omg.<section>` fenced blocks (`omg.query`, `omg.body`, `omg.response.<code>`) are how you describe shapes.
- The shape DSL uses TypeScript-ish syntax with annotations like `@min(1)` and `@maxLength(200)`.
- A leading `[…]` denotes an array; a trailing `?` denotes optional.

See the [OMG syntax reference](https://omg.gs/docs/syntax) for the full grammar.

## What gets watched

The plugin returns `path.dirname(input)` from `getPathsToWatch()`. So given an `input` of `api/todo/api.omg.md`, the entire `api/todo/` directory is watched in dev mode — adding or editing endpoints or partials triggers a rebuild without a server restart.

## Where the compiled spec goes

After build:

```
static/api/todo.yaml      ← compiled OpenAPI 3.1
```

This file is regenerated on every build; never hand-edit it. If you need to commit the output (e.g. for diff review), commit the `.omg.md` sources and treat the YAML as a derived artefact.
