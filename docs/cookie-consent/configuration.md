---
id: configuration
title: Configuration
---

# Configuration

## Basic options

| Option               | Type                  | Default                        | Description                                             |
| -------------------- | --------------------- | ------------------------------ | ------------------------------------------------------- |
| `enabled`            | `boolean`             | `true`                         | Disable the plugin without removing it from the config. |
| `title`              | `string`              | `'Cookie Consent'`             | Heading shown in the modal/toast.                       |
| `description`        | `string`              | `'We use cookies…'`            | Body text. Supports `[label](url)` markdown links.      |
| `links`              | `Array<{label,href}>` | `[]`                           | Footer-style links (privacy, cookies, terms).           |
| `acceptAllText`      | `string`              | `'Accept All'`                 | Primary button label.                                   |
| `rejectOptionalText` | `string`              | `'Reject Optional'`            | Keep-necessary-only button label.                       |
| `rejectAllText`      | `string`              | `'Reject All'`                 | Reject everything button label.                         |
| `storageKey`         | `string`              | `'cookie-consent-preferences'` | `localStorage` key.                                     |
| `toastMode`          | `boolean`             | `false`                        | `true` = bottom toast, `false` = centered modal.        |

## Complete example

```ts
{
  title: 'We Value Your Privacy',
  description:
    'We use cookies to improve your experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies. You can also [manage your preferences](/cookie-preferences) or read our [Privacy Policy](/privacy).',
  links: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  acceptAllText: 'Accept All Cookies',
  rejectOptionalText: 'Essential Only',
  rejectAllText: 'Reject All',
  toastMode: true,
  storageKey: 'my-site-cookie-consent',
}
```

For category-level controls, see [Categories](./advanced/categories.md). For GTM/GA4 integration, see [Google Consent Mode](./advanced/google-consent-mode.md).

## TypeScript types

```ts
import type {
  CookieConsentOptions,
  CookieCategory,
  CookieConsentLink,
  CookiePreferences,
  ConsentState,
  GoogleConsentModeConfig,
} from 'docusaurus-plugin-cookie-consent';
```
