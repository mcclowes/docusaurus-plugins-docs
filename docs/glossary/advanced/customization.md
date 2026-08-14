---
id: customization
title: Customization
---

# Customization

## Styling with CSS

The component uses Infima variables, so you can change its colors alongside the rest of your
site in `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #2563eb;
  --ifm-background-surface-color: #ffffff;
}
```

The component's class names come from CSS Modules and are hashed at build time. Global selectors
such as `.glossaryTerm` won't match them. For changes that should apply only to glossary terms,
swizzle `GlossaryTerm` and edit the copied component and CSS module.

## Swizzling components

For structural or component-specific styling changes, eject `GlossaryTerm`:

```bash
npm run swizzle docusaurus-plugin-glossary GlossaryTerm -- --eject
```

This creates `src/theme/GlossaryTerm/`, including its CSS module. The plugin doesn't expose
`GlossaryPage` through the theme path, so the glossary page can't be swizzled.

## Troubleshooting

- **Glossary page 404**: check `routePath` doesn't clash with existing routes; run `npm run clear` to bust the Docusaurus cache
- **No auto-linking**: make sure you're using the preset, or have the remark plugin configured in both `docs` and `pages`; clear cache and restart
- **Tooltips missing**: confirm you're on `@docusaurus/core@^3`, React 18 or 19, and Node.js 20 or newer
- **"GlossaryTerm not found"**: the MDX is trying to render before the plugin registered its theme — clear cache with `npm run clear`
