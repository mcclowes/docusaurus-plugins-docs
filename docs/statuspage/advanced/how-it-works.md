---
id: how-it-works
title: How it works
---

# How it works

The plugin has two halves: a build-time piece (server) and a runtime piece (client).

## Build time

On build, the plugin injects a `<meta>` tag into every page:

```html
<meta
  name="docusaurus-statuspage"
  content='{"statuspageUrl":"https://acme.statuspage.io","position":"bottom-left","linkLabel":"View status"}'
/>
```

This is how configuration is transported to the client without extra bundle size.

## Runtime

A lightweight client module runs via `onClientEntry`:

1. Reads the meta tag to get config
2. Calls `GET {statuspageUrl}/api/v2/summary.json`
3. Inspects the response:
   - If `status.indicator === 'none'` and `incidents.length === 0`, nothing happens
   - Otherwise, renders a banner with a link to the status page
4. If the user dismisses the banner, the **incident IDs** are stored in `localStorage` so the banner doesn't re-appear for the same set of incidents

## Why dismissal is per-incident

A naive "dismissed = true" flag would mean users who dismissed a minor incident never see new, unrelated outages. Keying dismissal to the incident IDs avoids that — new incidents re-trigger the banner even if the user previously dismissed something else.

## Request cadence

The API is called once per page load, client-side. Statuspage's public API is CDN-cached and generous, but if you're embedding this across a very high-traffic site consider rate-limiting or caching at your layer (e.g. a static `summary.json` snapshot refreshed every few minutes).

## Accessibility

- `role="status"` on the banner so screen readers announce outage messages
- Proper button semantics for the dismiss button
- Link text is always descriptive (controlled via `linkLabel`)
