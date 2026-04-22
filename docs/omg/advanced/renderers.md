---
id: renderers
title: Pairing with renderers
---

# Pairing with renderers

`docusaurus-plugin-omg` only **compiles** OMG to OpenAPI — it deliberately doesn't render anything. Once the spec is on disk, you choose how to display it.

Three common pairings:

## Redocusaurus (Redoc)

[Redocusaurus](https://github.com/rohit-gohri/redocusaurus) wraps Redoc as a Docusaurus plugin and reads OpenAPI specs from disk or a URL.

```bash
npm install redocusaurus
```

```ts title="docusaurus.config.ts"
plugins: [
  ['docusaurus-plugin-omg', { apis: [{ id: 'todo', input: 'api/todo/api.omg.md' }] }],
  [
    'redocusaurus',
    {
      specs: [
        {
          // Same path the omg plugin writes to.
          spec: 'static/api/todo.yaml',
          route: '/api/todo',
        },
      ],
    },
  ],
],
```

Visit `/api/todo` to see the rendered spec. Order matters: the omg plugin must run before any plugin that reads its output.

## docusaurus-plugin-openapi-docs

[`docusaurus-plugin-openapi-docs`](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs) generates per-endpoint MDX pages with built-in code samples and request/response panels.

```ts
plugins: [
  ['docusaurus-plugin-omg', { apis: [{ id: 'todo', input: 'api/todo/api.omg.md' }] }],
  [
    'docusaurus-plugin-openapi-docs',
    {
      id: 'apis',
      docsPluginId: 'classic',
      config: {
        todo: {
          specPath: 'static/api/todo.yaml',
          outputDir: 'docs/api/todo',
          sidebarOptions: { groupPathsBy: 'tag' },
        },
      },
    },
  ],
],
```

Run `npx docusaurus gen-api-docs` once the omg plugin has produced the spec, then check the generated MDX into source.

## Standalone Swagger UI

If you just want a single embeddable page without another plugin, drop a Swagger UI HTML page into `static/`:

```html title="static/api/todo.html"
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () =>
        SwaggerUIBundle({
          url: '/api/todo.yaml',
          dom_id: '#swagger-ui',
        })
    </script>
  </body>
</html>
```

Visit `/api/todo.html`. No build step required, no extra dependencies.

## Just the raw spec

You don't need a renderer at all. The compiled spec is a regular static asset — link to `/api/todo.yaml` from a doc page and let consumers download it for use in tools like Postman, Insomnia, or their own pipelines.

## Choosing

| You want…                                                  | Pick                              |
| ---------------------------------------------------------- | --------------------------------- |
| A single, beautiful reference page                         | Redocusaurus                      |
| Per-endpoint MDX pages with code samples + try-it consoles | docusaurus-plugin-openapi-docs    |
| Zero extra dependencies                                    | Static Swagger UI HTML            |
| Just a downloadable spec                                   | Link to `/api/<id>.yaml` directly |
