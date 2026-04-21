---
id: configuration
title: Configuration
---

# Configuration

| Option            | Type      | Default                         | Description                                                        |
| ----------------- | --------- | ------------------------------- | ------------------------------------------------------------------ |
| `content`         | `string`  | **required**                    | Banner content. Plain text or HTML.                                |
| `dismissible`     | `boolean` | `true`                          | Whether users can dismiss the banner.                              |
| `backgroundColor` | `string`  | `'#3b82f6'`                     | Background color.                                                  |
| `textColor`       | `string`  | `'#ffffff'`                     | Text color.                                                        |
| `showCloseIcon`   | `boolean` | `true`                          | Show the × button. Only applies when `dismissible: true`.          |
| `linkColor`       | `string`  | `'#ffffff'`                     | Color for `<a>` tags inside `content`.                             |
| `linkUnderline`   | `boolean` | `true`                          | Whether links are underlined.                                      |
| `className`       | `string`  | —                               | Extra CSS class on the banner wrapper.                             |
| `storageKey`      | `string`  | `'docusaurus-banner-dismissed'` | `localStorage` key for persisted dismissal.                        |
| `id`              | `string`  | —                               | Unique banner ID. Required when running multiple banner instances. |

## Non-dismissable banner

```ts
[
  'docusaurus-plugin-banner',
  {
    content: 'Scheduled maintenance Friday 8pm–10pm UTC.',
    dismissible: false,
  },
];
```

## HTML content with link styling

```ts
[
  'docusaurus-plugin-banner',
  {
    content:
      '<strong>Alert:</strong> Read about our <a href="/blog/2024/01/01/update">latest release</a>.',
    backgroundColor: '#ef4444',
    linkColor: '#fef08a',
    linkUnderline: true,
  },
];
```

## TypeScript

```ts
import type { BannerPluginOptions } from 'docusaurus-plugin-banner';

const options: BannerPluginOptions = {
  content: 'Hello from TS',
  dismissible: true,
};
```
