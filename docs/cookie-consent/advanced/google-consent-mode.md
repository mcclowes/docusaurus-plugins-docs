---
id: google-consent-mode
title: Google Consent Mode v2
---

# Google Consent Mode v2

If you use Google Tag Manager, GA4, or Google Ads, enable [Google Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent) so your tags wait for user approval before firing.

## Enable it

```ts
{
  googleConsentMode: {
    enabled: true,
    waitForUpdate: 500,   // ms to wait for consent before loading tags
    adsDataRedaction: true,
    urlPassthrough: false,
  },
  onConsentChange: (consent) => {
    console.log('Consent updated:', consent)
  },
}
```

## Order matters

The cookie consent plugin **must** be listed before any Google plugin so its default-denied consent signals are set before GTM/gtag loads:

```ts
plugins: [
  [
    'docusaurus-plugin-cookie-consent',
    {
      googleConsentMode: { enabled: true },
    },
  ],
  // Google plugins come after
  ['@docusaurus/plugin-google-gtag', { trackingID: 'G-XXXXXXXXXX' }],
];
```

## How it works

1. Before GTM loads, default consent for all categories is set to `denied`
2. On page load, stored consent is applied immediately if present
3. When the user consents, `gtag('consent', 'update', ...)` fires

## GTM tag configuration

For tags inside GTM to respect this:

1. **Admin → Container Settings → Enable consent overview**
2. For each tag, set its consent requirement:
   - Analytics tags: require `analytics_storage`
   - Ads/marketing tags: require `ad_storage`

## Consent signal mapping

| Plugin category | Google consent signal(s)                           |
| --------------- | -------------------------------------------------- |
| `analytics`     | `analytics_storage`                                |
| `marketing`     | `ad_storage`, `ad_user_data`, `ad_personalization` |
| `functional`    | `functionality_storage`, `personalization_storage` |
| `necessary`     | `security_storage` (always granted)                |
