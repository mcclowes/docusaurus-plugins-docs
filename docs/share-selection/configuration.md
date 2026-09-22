---
id: configuration
title: Configuration
---

# Configuration

| Option            | Type                | Default                                          | Description                                                                                |
| ----------------- | ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `enabled`         | `boolean`           | `true`                                           | Turn the palette off without removing the plugin.                                          |
| `actions`         | `ActionOptions[]`   | `['copy', 'ai', 'share']`                        | Palette buttons, in order.                                                                 |
| `contentSelector` | `string`            | `.markdown`                                      | Where selections count.                                                                    |
| `excludeSelector` | `string`            | `pre, code, .hash-link, button, input, textarea` | Selections entirely inside these are ignored.                                              |
| `minWords`        | `number`            | `3`                                              | Shortest selection that shows the palette.                                                 |
| `contextChars`    | `number`            | `600`                                            | Characters of surrounding text sent to AI either side of the passage.                      |
| `textFragments`   | `boolean`           | `true`                                           | Add `:~:text=` to links so they highlight the passage.                                     |
| `ai.prompt`       | `string`            | See below                                        | Prompt template.                                                                           |
| `ai.providers`    | `ProviderOptions[]` | open-with-llm's, else ChatGPT and Claude         | Each needs a `label` and a `url` containing `{prompt}`. `[]` makes Ask AI copy the prompt. |
| `ai.markdownFile` | `string \| false`   | open-with-llm's `markdownFile`, else `false`     | Filename appended to docs routes for `{markdownUrl}`.                                      |
| `ai.maxUrlLength` | `number`            | `6000`                                           | Longest provider URL before context is trimmed from the prompt.                            |

## Actions

| Action     | What it does                                                               |
| ---------- | -------------------------------------------------------------------------- |
| `copy`     | Copies a quote, citation, and deep link as rich text and plain text.       |
| `markdown` | Copies a Markdown blockquote with a linked citation.                       |
| `ai`       | Shows a button per AI provider, plus **Copy prompt**.                      |
| `share`    | Opens the native share sheet. Only shown on touch devices that support it. |
| `teams`    | Opens Microsoft Teams' share dialog.                                       |
| `linkedin` | Shares the link on LinkedIn.                                               |
| `x`        | Opens a post on X with the quote and link.                                 |
| `bluesky`  | Opens a Bluesky post with the quote and link.                              |

Relabel a built-in with `{ action: 'copy', label: 'Copy quote' }`. The social actions suit blogs more than docs, so they're off by default.

## Custom actions

A custom action is `{ label, url }`. These placeholders are URL-encoded into `url`: `{text}`, `{shortText}` (quoted, about 200 characters), `{url}` (the deep link), `{title}`, `{section}` (title and headings), and `{quote}` (the Markdown the `markdown` action copies).

```ts
export default {
  plugins: [
    [
      'docusaurus-plugin-share-selection',
      {
        actions: [
          'copy',
          'ai',
          {
            label: 'Report issue',
            url: 'https://github.com/acme/docs/issues/new?title=Docs:%20{title}&body={quote}',
          },
        ],
      },
    ],
  ],
};
```

## AI prompt

```text
I'm reading "{title}" and want help with a passage from it.
Section: {section}
Page: {url}
Full page as Markdown: {markdownUrl}

Passage:
"""
{selection}
"""

Surrounding text, with the passage marked:
"""
{context}
"""

Help me understand this passage.
```

`{context}` is the text before and after the selection, with `[[PASSAGE]]` where the selection sits. Lines whose placeholders are all empty are dropped. When a provider URL would pass `ai.maxUrlLength`, the plugin trims context first, then the passage. **Copy prompt** always copies the full version.

## Styling

```css
.share-selection {
  --share-selection-background: #1c1e21;
  --share-selection-color: #fff;
  --share-selection-hover: rgb(255 255 255 / 14%);
  --share-selection-radius: 12px;
}
```
