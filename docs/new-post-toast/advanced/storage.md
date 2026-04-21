---
id: storage
title: localStorage schema
---

# `localStorage` schema

The plugin stores a single JSON blob under `storage.key` (default: `docusaurus-new-post-toast`):

```json
{
  "lastVisit": "2025-01-14T15:30:00.000Z",
  "dismissedPosts": ["2025-01-10-post-slug", "2024-12-25-holiday-post"],
  "version": 1
}
```

## Fields

| Field            | Description                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `lastVisit`      | ISO timestamp of the user's last visit. Updated on each page load.                                                                              |
| `dismissedPosts` | Array of post IDs the user has explicitly dismissed. Prevents the same post from reappearing. Only tracked when `storage.trackDismissed: true`. |
| `version`        | Internal schema version. Used for future migrations.                                                                                            |

## Interacting with storage in code

You can read or clear the entry manually — useful for a "mark all as read" button:

```tsx
function MarkAllRead() {
  const markRead = () => {
    const stored = localStorage.getItem('docusaurus-new-post-toast');
    if (!stored) return;
    const data = JSON.parse(stored);
    data.lastVisit = new Date().toISOString();
    localStorage.setItem('docusaurus-new-post-toast', JSON.stringify(data));
  };

  return <button onClick={markRead}>Mark all as read</button>;
}
```

## Forcing re-display

To force toasts to re-appear (e.g. during development):

```js
localStorage.removeItem('docusaurus-new-post-toast');
location.reload();
```

## Turning off dismissal tracking

If you'd rather toasts can re-appear every visit even after dismissal, set `storage.trackDismissed: false`.
