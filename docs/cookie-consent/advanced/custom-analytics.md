---
id: custom-analytics
title: Custom analytics (PostHog, Plausible, …)
---

# Custom analytics integrations

For tools that don't speak Google Consent Mode — PostHog, Plausible, Fathom, custom pipelines — hook into the `cookieConsentChange` DOM event.

## The `cookieConsentChange` event

Fired on `window` whenever preferences change:

```ts
window.addEventListener('cookieConsentChange', (event: CustomEvent) => {
  const consent = event.detail;
  // { necessary: true, analytics: boolean, marketing: boolean, functional: boolean }

  if (consent.analytics) {
    initAnalytics();
  } else {
    shutdownAnalytics();
  }
});
```

## PostHog

Create a client module that listens for consent changes:

```js
// src/clientModules/posthog.js
import posthog from 'posthog-js';

const STORAGE_KEY = 'cookie-consent-preferences';

let initialized = false;

function initPosthog() {
  if (initialized) return;
  posthog.init('YOUR_PROJECT_KEY', { api_host: 'https://app.posthog.com' });
  initialized = true;
}

function shutdownPosthog() {
  if (!initialized) return;
  posthog.opt_out_capturing();
  initialized = false;
}

window.addEventListener('cookieConsentChange', (event) => {
  event.detail.analytics ? initPosthog() : shutdownPosthog();
});

// Check initial state
const stored = localStorage.getItem(STORAGE_KEY);
if (stored) {
  const prefs = JSON.parse(stored);
  if (prefs.analytics) initPosthog();
}
```

Then register it via a tiny custom plugin:

```js
// src/plugins/posthog-plugin.js
module.exports = function posthogPlugin() {
  return {
    name: 'posthog-plugin',
    getClientModules() {
      return [require.resolve('../clientModules/posthog')];
    },
  };
};
```

Add `require.resolve('./src/plugins/posthog-plugin')` to your `plugins:` array.

## Plausible

Plausible is cookie-less so consent is technically not required, but you may want to respect user preference anyway:

```js
window.addEventListener('cookieConsentChange', (event) => {
  if (event.detail.analytics) {
    delete window.plausible?.q;
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
  } else {
    window.plausible = () => {};
  }
});
```

For React integrations, use [`useCookieConsent`](../hook.md). Client modules that aren't rendered inside React can use the DOM event.
