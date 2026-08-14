---
id: auto-linking
title: How auto-linking works
---

# How auto-linking works

The plugin uses a **hybrid build-time + runtime** approach.

## Build time — the remark plugin

At build time, the remark plugin (`src/remark/glossary-terms.ts` in the source) walks your markdown AST and:

1. Scans text nodes for glossary terms (case-insensitive, whole-word)
2. Replaces matches with `<GlossaryTerm term="…">match</GlossaryTerm>` JSX
3. Injects `import GlossaryTerm from '@theme/GlossaryTerm'` at the top of the file

So this input:

```markdown
Our API uses REST principles.
```

…becomes this MDX during compilation:

```mdx
import GlossaryTerm from '@theme/GlossaryTerm';

Our <GlossaryTerm term="API">API</GlossaryTerm> uses <GlossaryTerm term="REST">REST</GlossaryTerm> principles.
```

### What gets matched

- Whole words only (respects word boundaries)
- Case-insensitive lookups
- Plural forms are handled — `API` matches `APIs`

### What gets skipped

- Text inside fenced code blocks or inline `code`
- Text inside existing `[links](…)`
- Text inside existing MDX components
- Partial-word matches

### Overlapping terms

When two glossary terms could both match the same span of text, the remark plugin resolves the conflict deterministically:

1. **Subset overlap — the superset wins.** If one term's matched range contains another's, the longer (containing) term is kept and the shorter is dropped.

   Given the terms `outgoing wire transfer` and `wire transfer`, the sentence:

   > An outgoing wire transfer was sent.

   links the whole phrase `outgoing wire transfer`. The inner `wire transfer` match is suppressed.

2. **Cross-overlap — the earlier match wins.** If two matches overlap but neither contains the other, the one that starts earliest in the text is kept and the later one is dropped.

   Given the terms `outgoing wire transfer` and `wire transfer operation`, the sentence:

   > An outgoing wire transfer operation was sent.

   links `outgoing wire transfer` because it starts first. The trailing word `operation` is left as plain text. Elsewhere in the document, a sentence that starts with `wire transfer operation` (with no preceding `outgoing`) would link `wire transfer operation` instead.

These rules apply equally to canonical terms and aliases — both are treated as matchable phrases for the purposes of overlap resolution, but the tooltip and link always point back to the canonical term.

## Auto-expanding acronyms on first use

When the plugin option `expandAcronymsOnFirstUse` is `true`, the remark plugin rewrites the first canonical occurrence of any term that has an `abbreviation` so the long form is introduced inline. This enforces the technical-writing convention of writing `Payment Service Provider (PSP)` once at the top of a page before using `PSP` on its own.

```js title="docusaurus.config.js"
{
  presets: [
    ['docusaurus-plugin-glossary/preset', {
      glossary: {
        expandAcronymsOnFirstUse: true,
      },
    }],
  ],
}
```

Given a term:

```json
{ "term": "PSP", "abbreviation": "Payment Service Provider", "definition": "…" }
```

Source:

```markdown
The PSP charges a fee. Each PSP has its own pricing.
```

Renders as:

```mdx
The <GlossaryTerm term="PSP">Payment Service Provider (PSP)</GlossaryTerm> charges a fee. Each <GlossaryTerm term="PSP">PSP</GlossaryTerm> has its own pricing.
```

### Rules

- **Per file.** The first occurrence in each markdown/MDX file is expanded; subsequent ones render unchanged.
- **Canonical only.** Only the canonical `term` triggers expansion — aliases and plural forms (`PSPs`) render unchanged.
- **Abbreviation required.** Terms without an `abbreviation` are never expanded.
- **Author wins.** If the long form already appears immediately before the term (e.g. you wrote `Payment Service Provider (PSP)` yourself), expansion is skipped to avoid duplication.
- **`autoLink: false` is respected.** Opting a term out of auto-linking also opts it out of expansion.
- **Case-insensitive.** A lowercase canonical mention (e.g. `psp`) still triggers expansion, rendering `Payment Service Provider (psp)`.

## Runtime - the theme component

The generated MDX renders the `GlossaryTerm` React component. The component handles links,
tooltips, focus behavior, and viewport-aware tooltip placement. No client module or separate
initialization step is involved.

## Theme integration

`GlossaryTerm` is exposed through the theme system at `@theme/GlossaryTerm`, which means:

- MDX files can import it without knowing the package path
- You can swizzle it to customize the component (see [Customization](./customization.md))
- The remark plugin can reference it by a stable alias

## Opting out

If you don't want auto-linking, don't use the preset — register just the plugin manually without the remark plugin. The `/glossary` page and the `<GlossaryTerm>` component will still work, but you'll need to use the component explicitly when you want tooltips.
