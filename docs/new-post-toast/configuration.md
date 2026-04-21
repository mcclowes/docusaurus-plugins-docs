---
id: configuration
title: Configuration
---

# Configuration

Options are grouped into four sections.

## Full example

```ts
[
  'docusaurus-plugin-new-post-toast',
  {
    enabled: true,

    toast: {
      position: 'bottom-right', // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'bottom-center' | 'top-center'
      duration: 8000, // ms before auto-dismiss (0 = never auto-dismiss)
      maxToasts: 3, // max concurrent toasts
      showDescription: true, // include post description
      showDate: true, // include post date
      showImage: false, // show post thumbnail if available
    },

    behavior: {
      showOnFirstVisit: false, // show toasts the first time a visitor arrives
      maxAgeDays: 30, // don't surface posts older than this many days
      excludePaths: [], // array of paths where toasts should be suppressed
      onlyOnBlogPages: false, // restrict toasts to /blog/* routes
      delay: 1000, // ms to wait after route load before showing
    },

    storage: {
      key: 'docusaurus-new-post-toast', // localStorage key prefix
      trackDismissed: true, // remember dismissed posts per-ID
    },

    blog: {
      pluginId: 'default',
      path: '/blog',
    },
  },
];
```

## Toast positions

`'bottom-right'` · `'bottom-left'` · `'top-right'` · `'top-left'` · `'bottom-center'` · `'top-center'`

## Behavior knobs

- `showOnFirstVisit: false` is the sane default — otherwise first-time visitors get bombarded with every recent post
- `maxAgeDays` caps how far back the plugin looks. Set it to your publishing cadence × 2
- `excludePaths` is a simple prefix-array (e.g. `['/docs/legal']`)
- `onlyOnBlogPages: true` keeps toasts contained to readers who're already on the blog

## Styling

Toasts respect Docusaurus CSS variables so they inherit light/dark mode automatically:

```css
:root {
  --ifm-color-primary: #your-color;
  --ifm-background-surface-color: #your-bg;
}
```

For deeper changes, swizzle `NewPostToast` from the theme.
