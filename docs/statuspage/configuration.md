---
id: configuration
title: Configuration
---

# Configuration

| Option          | Type      | Default         | Description                                                          |
| --------------- | --------- | --------------- | -------------------------------------------------------------------- |
| `statuspageUrl` | `string`  | **required**    | Your Statuspage.io base URL (e.g. `https://acme.statuspage.io`).     |
| `enabled`       | `boolean` | `true`          | Disable the plugin without removing it from config.                  |
| `position`      | `string`  | `'bottom-left'` | `'bottom-left'` \| `'bottom-right'` \| `'top-left'` \| `'top-right'` |
| `linkLabel`     | `string`  | `'View status'` | Text for the link to your status page.                               |

## Examples

### Custom position + label

```ts
[
  'docusaurus-plugin-statuspage',
  {
    statuspageUrl: 'https://acme.statuspage.io',
    position: 'top-right',
    linkLabel: 'Check service status →',
  },
];
```

### Temporarily disabled

```ts
[
  'docusaurus-plugin-statuspage',
  {
    statuspageUrl: 'https://acme.statuspage.io',
    enabled: process.env.NODE_ENV === 'production',
  },
];
```

## Styling

The banner uses Docusaurus CSS variables so it inherits your theme automatically. For custom styling, target the banner via standard DOM selectors in your `src/css/custom.css` — the plugin's markup uses semantic ARIA roles (`role="status"`) which are the most stable selectors.
