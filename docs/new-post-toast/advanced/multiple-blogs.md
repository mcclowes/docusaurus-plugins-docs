---
id: multiple-blogs
title: Multiple blog instances
---

# Multiple blog instances

If your site runs more than one blog (e.g. an engineering blog under `/engineering` and a product blog under `/news`), register the toast plugin once per blog and point each at the right plugin ID and path:

```ts
plugins: [
  [
    'docusaurus-plugin-new-post-toast',
    {
      blog: {
        pluginId: 'engineering-blog',
        path: '/engineering',
      },
      storage: {
        key: 'new-post-toast-engineering', // distinct key per instance
      },
    },
  ],
  [
    'docusaurus-plugin-new-post-toast',
    {
      blog: {
        pluginId: 'product-news',
        path: '/news',
      },
      storage: {
        key: 'new-post-toast-news',
      },
    },
  ],
];
```

**Important:** give each instance a distinct `storage.key` so `lastVisit` is tracked separately per blog. Otherwise both instances share the same timestamp and posts from the second blog won't trigger toasts the same way.

## Single blog with custom instance ID

If you've renamed your default blog's `id`, pass it through:

```ts
[
  'docusaurus-plugin-new-post-toast',
  {
    blog: { pluginId: 'main-blog', path: '/posts' },
  },
];
```

This must match the `id` you set on your `@docusaurus/plugin-content-blog` registration.
