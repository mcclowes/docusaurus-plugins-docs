---
id: auto-linking
title: How auto-linking works
---

# How auto-linking works

The plugin uses a **hybrid build-time + runtime** approach.

## Build time — the remark plugin

At build time, the remark plugin (`src/remark/glossary-terms.js` in the source) walks your markdown AST and:

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

## Runtime — client modules

The plugin registers a client module via `getClientModules()` so the tooltip/initialization logic runs on every route without you having to import anything.

## Theme integration

`GlossaryTerm` is exposed through the theme system at `@theme/GlossaryTerm`, which means:

- MDX files can import it without knowing the package path
- You can swizzle it to customize the component (see [Customization](./customization.md))
- The remark plugin can reference it by a stable alias

## Opting out

If you don't want auto-linking, don't use the preset — register just the plugin manually without the remark plugin. The `/glossary` page and the `<GlossaryTerm>` component will still work, but you'll need to use the component explicitly when you want tooltips.
