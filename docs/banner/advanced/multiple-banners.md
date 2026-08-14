---
id: multiple-banners
title: Multiple banners
---

# Banner dismissal versions

The current client module renders one banner. Registering the plugin more than once does not stack banners.

Use `id` to give that banner a distinct dismissal key. This is useful when separate site configurations share the same origin or storage namespace:

```ts
plugins: [
  [
    'docusaurus-plugin-banner',
    {
      id: 'welcome',
      content: 'Welcome to our docs!',
    },
  ],
];
```

With the default `storageKey`, this banner stores its dismissal under `docusaurus-banner-dismissed-welcome`.

## Re-showing changed content

Set `version` when you want people who dismissed an older announcement to see the replacement. Bumping it changes the effective storage key without making you rename `storageKey`:

```ts
[
  'docusaurus-plugin-banner',
  {
    id: 'announcement',
    version: '2',
    content: 'New announcement',
  },
];
```

The effective key is `docusaurus-banner-dismissed-announcement::v=2`. Keep `version` unchanged when edits should preserve existing dismissals.
