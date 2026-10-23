---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-share-selection
```

## Register the plugin

```ts
export default {
  plugins: ['docusaurus-plugin-share-selection'],
};
```

That's enough. Highlight three or more words on a docs page, blog post, or MDX page and the palette appears with **Copy**, **Ask AI**, and, on phones and tablets, **Share**.

Selections inside code blocks are ignored, because code blocks already have a copy button.

## Try the example site

The repository includes a [Docusaurus example site](https://github.com/mcclowes/docusaurus-plugin-share-selection/tree/main/examples/docusaurus-v3). Follow the [development instructions](https://github.com/mcclowes/docusaurus-plugin-share-selection#development) to install and run it locally.

## Use the keyboard

:::note Upcoming release
The shortcut below requires the upcoming keyboard-access release of the plugin.
:::

Select a passage with Shift and the arrow keys using your browser's caret browsing mode. When the palette appears, press **Alt+Shift+S** (**Option+Shift+S** on macOS) to focus its first action.

Use **Tab** to move between actions and **Enter** to activate one. **Escape** closes the palette and returns focus to the selected passage, so you can continue reading.

## Try the deep link

Copy a passage, then open the link from the clipboard in a new tab. The page scrolls to the passage and highlights it.

## Track what gets shared

Every action fires a `share-selection` event on `window`:

```js
window.addEventListener('share-selection', (event) => {
  const { action, text, link, title } = event.detail;
  analytics.track('Passage shared', { action, title });
});
```

Which passages readers quote, and which they ask AI to explain, tells you what's valuable and what's confusing.
