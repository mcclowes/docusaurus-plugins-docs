---
id: multiple-banners
title: Multiple banners
---

# Multiple banners

You can register the plugin multiple times to stack banners. Each instance needs a unique `id` so dismissal state is tracked per-banner — otherwise they'll all share the same `localStorage` key and dismissing one will dismiss them all.

```ts
plugins: [
  [
    'docusaurus-plugin-banner',
    {
      id: 'welcome',
      content: 'Welcome to our docs!',
    },
  ],
  [
    'docusaurus-plugin-banner',
    {
      id: 'newsletter',
      content: 'Subscribe to our newsletter',
      backgroundColor: '#10b981',
    },
  ],
];
```

Each banner maintains its own dismissal state keyed by `id`. If you also set `storageKey`, that takes precedence over the default derived from `id`.

## Custom storage key

If you need to invalidate an existing dismissal — e.g. you've rewritten a banner's copy and want returning users to see it again — change the `storageKey`:

```ts
[
  'docusaurus-plugin-banner',
  {
    content: 'New announcement (v2)',
    storageKey: 'special-announcement-v2-dismissed',
  },
];
```

Users who dismissed the old version will now see the new one.
