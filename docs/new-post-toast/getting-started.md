---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-new-post-toast
```

## Minimum config

```ts
// docusaurus.config.ts
export default {
  plugins: ['docusaurus-plugin-new-post-toast'],
};
```

That's literally it — the plugin picks up the default blog instance and starts tracking `lastVisit`.

## Verify

1. Start the site with `npm start`
2. Visit any page
3. In DevTools → Application → Local Storage, you should see `docusaurus-new-post-toast` with a JSON value containing `lastVisit`
4. Manually set `lastVisit` to a date in the past, reload, and you should see toasts for any posts published after that timestamp

## Next

- [Configuration](./configuration.md) — tune position, duration, `maxAgeDays`
- [Multiple blogs](./advanced/multiple-blogs.md) — if you have more than one blog instance
