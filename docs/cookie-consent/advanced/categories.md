---
id: categories
title: Cookie categories
---

# Cookie categories

Out of the box the plugin recognises four categories:

- `necessary` — always on, cannot be disabled
- `analytics` — usage tracking (GA, PostHog, Plausible, etc.)
- `marketing` — ad targeting, retargeting pixels
- `functional` — personalization, preferences

## Configuring categories

Each category can be relabeled, described, or hidden:

```ts
{
  categories: {
    necessary: {
      label: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled.',
    },
    analytics: {
      label: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
    },
    marketing: {
      label: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements.',
      enabled: false,  // hide this category entirely
    },
    functional: {
      label: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization.',
    },
  },
}
```

Setting `enabled: false` on a category removes it from the UI. Useful if, for example, you don't run any marketing pixels and want to offer a cleaner modal.

## Respecting choices in code

Category decisions come back through [`useCookieConsent`](../hook.md). Gate everything that isn't strictly necessary:

```tsx
const { hasCategoryConsent } = useCookieConsent();

if (hasCategoryConsent('analytics')) loadAnalytics();
if (hasCategoryConsent('marketing')) loadAdsPixels();
if (hasCategoryConsent('functional')) enableUserPersonalization();
```
