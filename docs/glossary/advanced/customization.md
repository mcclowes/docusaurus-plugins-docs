---
id: customization
title: Customization
---

# Customization

## Styling with CSS

The plugin uses CSS modules — override specific classes in your site's `src/css/custom.css`:

```css
/* Auto-linked term underline */
.glossaryTermWrapper .glossaryTerm {
  border-bottom-color: var(--ifm-color-primary);
}

/* Hover tooltip */
.glossaryTermWrapper .tooltip {
  background: var(--ifm-background-surface-color);
  color: var(--ifm-color-content);
}
```

## Swizzling components

For structural changes, swizzle the components in wrap mode:

```bash
npm run swizzle docusaurus-plugin-glossary GlossaryPage -- --wrap
npm run swizzle docusaurus-plugin-glossary GlossaryTerm -- --wrap
```

This creates `src/theme/GlossaryPage/` and `src/theme/GlossaryTerm/` shim files you can modify without forking the plugin.

## Troubleshooting

- **Glossary page 404**: check `routePath` doesn't clash with existing routes; run `npm run clear` to bust the Docusaurus cache
- **No auto-linking**: make sure you're using the preset, or have the remark plugin configured in both `docs` and `pages`; clear cache and restart
- **Tooltips missing**: confirm you're on `@docusaurus/core@^3` and `react@^18`
- **"GlossaryTerm not found"**: the MDX is trying to render before the plugin registered its theme — clear cache with `npm run clear`
