---
id: hook
title: useCookieConsent hook
---

# `useCookieConsent` hook

The plugin exports a React hook for checking user consent in your own components. **This is the contract**: your components read consent from the hook and only load scripts / render tracking content when the relevant category is granted.

## Basic usage

```tsx
import React from 'react';
import { useCookieConsent } from 'docusaurus-plugin-cookie-consent';

export default function AnalyticsGate() {
  const { hasCategoryConsent } = useCookieConsent();

  if (!hasCategoryConsent('analytics')) {
    return null;
  }

  return <YourAnalyticsComponent />;
}
```

## Returned values

```ts
const {
  hasConsent: () => boolean
  hasCategoryConsent: (c: 'necessary' | 'analytics' | 'marketing' | 'functional') => boolean
  preferences: CookiePreferences | null

  acceptAll: () => void
  rejectOptional: () => void
  rejectAll: () => void
  updatePreferences: (p: Partial<CookiePreferences>) => void
  resetConsent: () => void
} = useCookieConsent()
```

## The `CookiePreferences` shape

```ts
type CookiePreferences = {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  consentGiven: boolean;
  timestamp?: number;
};
```

## Conditional script loading

```tsx
import { useEffect } from 'react';
import { useCookieConsent } from 'docusaurus-plugin-cookie-consent';

export default function ConditionalGA() {
  const { hasCategoryConsent } = useCookieConsent();

  useEffect(() => {
    if (!hasCategoryConsent('analytics')) return;

    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  }, [hasCategoryConsent]);

  return null;
}
```

## Reset button

Useful for a "manage cookie preferences" link in your footer:

```tsx
import { useCookieConsent } from 'docusaurus-plugin-cookie-consent';

export function ResetConsentButton() {
  const { resetConsent } = useCookieConsent();
  return <button onClick={resetConsent}>Reset cookie preferences</button>;
}
```

This clears stored preferences and re-shows the consent banner.
