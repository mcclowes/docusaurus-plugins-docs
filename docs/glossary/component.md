---
id: component
title: The GlossaryTerm component
---

# The `<GlossaryTerm>` component

While the [remark plugin](./advanced/auto-linking.md) handles most cases automatically, the `GlossaryTerm` theme component lets you opt in or override behavior in MDX files directly.

## Import

```mdx
import GlossaryTerm from '@theme/GlossaryTerm';
```

You only need this when you're using the component _explicitly_ — the remark plugin injects this import automatically for auto-linked terms.

## Usage

### Self-closing (term is both the lookup and the display text)

```mdx
This website uses an <GlossaryTerm term="API" /> to fetch data.
```

### With children (custom display text)

```mdx
Our <GlossaryTerm term="API">RESTful API</GlossaryTerm> is available.
```

### With an explicit definition (override the JSON)

```mdx
We use <GlossaryTerm term="REST" definition="Representational State Transfer" /> for our services.
```

## Props

| Prop         | Required | Description                                      |
| ------------ | -------- | ------------------------------------------------ |
| `term`       | yes      | Lookup key matching an entry in `glossary.json`. |
| `definition` | no       | Override the definition from the glossary file.  |
| `children`   | no       | Custom display text. Defaults to `term`.         |

## When to use it manually

- The auto-linker won't touch terms inside code blocks, existing links, or existing MDX components — use the component manually if you want those matched
- When you need a one-off override of the term text or definition (e.g. localized phrasing) without editing `glossary.json`
