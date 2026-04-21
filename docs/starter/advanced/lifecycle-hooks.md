---
id: lifecycle-hooks
title: Lifecycle hooks
---

# Lifecycle hooks in play

The starter wires up four of Docusaurus's plugin lifecycle hooks. Swap these for the ones your plugin needs; delete the rest.

## `loadContent`

Runs during the build. Fetch or compute data your plugin needs and return it — Docusaurus hands it to `contentLoaded`.

```ts
async loadContent() {
  // fetch an API, read a JSON file, etc.
  return { greeting: options.greetingMessage }
}
```

## `contentLoaded`

Receives the value from `loadContent` and does the actual site-integration work:

- `actions.createData(name, value)` — writes a JSON module other code can import
- `actions.addRoute(route)` — registers a new route served by a component
- `actions.setGlobalData(value)` — exposes plugin data via `useDocusaurusContext()`

```ts
async contentLoaded({ content, actions }) {
  const dataPath = await actions.createData('starter-data.json', JSON.stringify(content))

  actions.addRoute({
    path: options.routePath,
    component: '@theme/StarterPage',
    modules: { data: dataPath },
    exact: true,
  })

  actions.setGlobalData(content)
}
```

## `getClientModules`

Returns absolute paths to JS/TS files that run on every client navigation. Useful for registering event listeners, initializing libraries, or hooking into route changes:

```ts
getClientModules() {
  return [path.resolve(__dirname, './client/index.js')]
}
```

## `getThemePath`

Tells Docusaurus where your theme components live so users can import them as `@theme/YourComponent` and swizzle them:

```ts
getThemePath() {
  return path.resolve(__dirname, './theme')
}
```

## Other hooks you might add

- `async postBuild({ outDir })` — run after the site is built, e.g. generate a sitemap
- `configureWebpack(config, isServer)` — extend webpack, rarely needed
- `injectHtmlTags()` — inject `<meta>` / `<link>` / inline scripts into `<head>`
- `validateOptions({ options, validate })` — validate your plugin options via a Joi schema
