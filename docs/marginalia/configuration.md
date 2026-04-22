---
id: configuration
title: Configuration
---

# Configuration

The plugin itself takes a single option; most configuration happens on the
components.

## Plugin options

| Option    | Type      | Default | Description                                |
| --------- | --------- | ------- | ------------------------------------------ |
| `enabled` | `boolean` | `true`  | Toggle the plugin without removing it from `plugins`. |

## `<Marginalia>`

Container establishing the two-column reading layout. Toggles
`body.marginalia-active` on mount, which hides Docusaurus's native TOC column
so the in-margin TOC and cards have room to breathe.

| Prop      | Type      | Default | Notes                                                      |
| --------- | --------- | ------- | ---------------------------------------------------------- |
| `showToc` | `boolean` | `true`  | Sticky "On this page" list + scroll progress bar in gutter |

## `<Aside>`

Inline anchor paired with a margin card.

| Prop        | Type        | Default             | Notes                                                                                                      |
| ----------- | ----------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `anchor`    | `ReactNode` | `children`          | Inline text in prose (if omitted, children is used as the anchor)                                          |
| `title`     | `string`    | —                   | Card heading                                                                                               |
| `kind`      | `AsideKind` | `'note'`            | One of `note`, `concept`, `warning`, `info`, `link`, `value`, `code`, `endpoint` — drives the swatch color |
| `kindLabel` | `string`    | derived from `kind` | Override the uppercase label                                                                               |
| `meta`      | `string[]`  | —                   | Pill tags shown below body                                                                                 |
| `cta`       | `string`    | —                   | Call-to-action text at bottom of card                                                                      |
| `ctaHref`   | `string`    | —                   | CTA href. If omitted, renders as `<span>`                                                                  |
| `children`  | `ReactNode` | —                   | Card body (when `anchor` is set) or inline anchor (when not)                                               |

## `<Endpoint>`

Inline method + path chip for API docs.

| Prop       | Type         | Default | Notes                                      |
| ---------- | ------------ | ------- | ------------------------------------------ |
| `method`   | `HttpMethod` | `'GET'` | Uppercased automatically                   |
| `path`     | `string`     | —       | The URL path                               |
| `children` | `ReactNode`  | —       | Falls back when no `path` prop is provided |

Method colors: `GET` green, `POST` amber, `PUT` / `PATCH` accent, `DELETE`
red.

## TypeScript

```ts
import type { MarginaliaOptions, AsideKind, HttpMethod } from 'docusaurus-plugin-marginalia';
```
