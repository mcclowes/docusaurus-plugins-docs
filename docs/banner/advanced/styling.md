---
id: styling
title: Styling
---

# Styling

The banner is rendered above the navbar and styled primarily through plugin options. For anything beyond colors and link styling, use `className` to attach your own CSS.

## Via options

```ts
[
  'docusaurus-plugin-banner',
  {
    content: 'Custom styled banner',
    backgroundColor: '#8b5cf6',
    textColor: '#f3f4f6',
    linkColor: '#fbbf24',
    linkUnderline: false,
  },
];
```

## Via custom class

```ts
[
  'docusaurus-plugin-banner',
  {
    content: 'Custom class banner',
    className: 'my-custom-banner',
  },
];
```

Then in your site's `src/css/custom.css`:

```css
.my-custom-banner {
  font-weight: 600;
  border-bottom: 2px solid var(--ifm-color-primary-dark);
}

.my-custom-banner a {
  font-weight: 700;
}
```

## Dark-mode-aware banner

If you want the banner to react to Docusaurus's theme, use CSS variables in your override:

```css
.my-custom-banner {
  background: var(--ifm-color-primary);
  color: var(--ifm-color-white);
}
```

Pair it with `backgroundColor: 'transparent'` in your config so the CSS wins.
