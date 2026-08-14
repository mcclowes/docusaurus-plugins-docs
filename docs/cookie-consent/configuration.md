---
id: configuration
title: Configuration
---

# Configuration

## Basic options

| Option               | Type                  | Default                        | Description                                                                 |
| -------------------- | --------------------- | ------------------------------ | --------------------------------------------------------------------------- |
| `enabled`            | `boolean`             | `true`                         | Disable the plugin without removing it from the config.                     |
| `title`              | `string`              | `'Cookie consent'`             | Heading shown in the modal or toast.                                        |
| `description`        | `string`              | `'We use cookies…'`            | Body text. Supports `[label](url)` markdown links.                          |
| `links`              | `Array<{label,href}>` | `[]`                           | Links to privacy, cookie, or terms pages.                                   |
| `acceptAllText`      | `string`              | `'Accept all'`                 | Label for the button that grants every category.                            |
| `rejectText`         | `string`              | `'Reject optional'`            | Label for the button that keeps only necessary cookies enabled.             |
| `storageKey`         | `string`              | `'cookie-consent-preferences'` | `localStorage` key.                                                         |
| `consentExpiryDays`  | `number`              | unset                          | Re-prompt after this many days. Must be positive.                           |
| `toastMode`          | `boolean`             | `false`                        | Show a bottom toast instead of a centered modal.                            |
| `showDetailsButton`  | `boolean`             | `true`                         | Show the control that expands the category descriptions.                    |
| `categories`         | `object`              | built-in labels                | Relabel, describe, or hide individual cookie categories.                    |
| `googleConsentMode`  | `object`              | unset                          | Configure optional Google Consent Mode v2 support.                          |
| `rejectOptionalText` | `string`              | unset                          | Deprecated fallback for `rejectText`.                                       |
| `rejectAllText`      | `string`              | unset                          | Deprecated fallback for `rejectText`. It does not reject necessary cookies. |

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
  acceptAllText: 'Accept all cookies',
  rejectText: 'Essential only',
  toastMode: true,
  storageKey: 'my-site-cookie-consent',
  consentExpiryDays: 180,
  showDetailsButton: true,
}
```

`rejectOptionalText` and `rejectAllText` remain available for backward compatibility. New configurations should use `rejectText`. All three names trigger the same behavior: necessary cookies remain enabled, and analytics, marketing, and functional cookies are rejected.

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
