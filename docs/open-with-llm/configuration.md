---
id: configuration
title: Configuration
---

# Configuration

| Option         | Type                | Default                                                   | Description                                               |
| -------------- | ------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `enabled`      | `boolean`           | `true`                                                    | Disable the widget without removing the plugin.           |
| `buttonLabel`  | `string`            | `Open with AI`                                            | Set the trigger button text.                              |
| `markdownFile` | `string`            | `index.md`                                                | Set the Markdown filename appended to each docs route.    |
| `prompt`       | `string`            | `Read {url} and answer my questions using it as context.` | Set the provider prompt. It must contain `{url}`.         |
| `providers`    | `ProviderOptions[]` | ChatGPT and Claude                                        | Replace provider links. Each URL must contain `{prompt}`. |

## Custom providers

```ts
export default {
  plugins: [
    [
      'docusaurus-plugin-open-with-llm',
      {
        buttonLabel: 'Ask an LLM',
        prompt: 'Use {url} as context, then help me understand it.',
        providers: [
          {
            label: 'Open in ChatGPT',
            url: 'https://chatgpt.com/?q={prompt}',
          },
          {
            label: 'Open in Claude',
            url: 'https://claude.ai/new?q={prompt}',
          },
          {
            label: 'Open in Perplexity',
            url: 'https://www.perplexity.ai/search?q={prompt}',
          },
        ],
      },
    ],
  ],
};
```

Set `providers` to an empty array to keep only the copy, view, and download actions.

## Sites with a swizzled docs layout

The plugin automatically wraps `DocItem/Layout`. If your site already supplies that theme component, import the widget and place it in your wrapper instead:

```tsx
import OriginalLayout from '@theme-original/DocItem/Layout';
import { OpenWithLlm } from 'docusaurus-plugin-open-with-llm/client';

export default function DocItemLayout(props) {
  return (
    <>
      <OpenWithLlm />
      <OriginalLayout {...props} />
    </>
  );
}
```

Keep the plugin registered. It supplies the resolved client configuration used by `OpenWithLlm`.
