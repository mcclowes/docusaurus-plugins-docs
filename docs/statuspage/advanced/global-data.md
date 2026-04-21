---
id: global-data
title: Accessing global data
---

# Accessing global data

The plugin exposes its config via `useDocusaurusContext()` so theme components can read it without reaching into the DOM.

```tsx
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function StatusInfo() {
  const { globalData } = useDocusaurusContext();
  const data = globalData['docusaurus-plugin-statuspage']?.default;
  return (
    <div>
      Status page:{' '}
      <a href={data?.statuspageUrl} target="_blank" rel="noreferrer">
        {data?.statuspageUrl}
      </a>
    </div>
  );
}
```

## What's on `globalData`

The object matches the plugin options you passed:

```ts
type StatuspageGlobalData = {
  statuspageUrl: string;
  enabled: boolean;
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  linkLabel: string;
};
```

## Typical uses

- A "Service status" link in your footer that respects whatever URL you configured
- A dedicated `/status` landing page that embeds a Statuspage widget using the same URL
- Conditional rendering based on whether statuspage integration is enabled at all

## The plugin's public API surface

From the package:

- **Default export** — the plugin factory `(context, options) => Plugin`
- **Types** — `StatuspagePluginOptions`
- **Client module** — `client/index` with an `onClientEntry` implementation

These are mostly interesting if you're extending the plugin or building related tooling.
