---
id: configuration
title: Configuration
---

# Configuration

## Plugin options

| Option      | Type                       | Default                 | Notes                                              |
| ----------- | -------------------------- | ----------------------- | -------------------------------------------------- |
| `addresses` | `string[]`                 | `[]`                    | omg.lol addresses to fetch latest status + weblog  |
| `pastes`    | `{ address, paste }[]`     | `[]`                    | Specific pastes to fetch                           |
| `apiBase`   | `string`                   | `https://api.omg.lol`   | Override for testing or self-hosted forks          |

The plugin pre-fetches at build time, so it needs to know what to retrieve before MDX is parsed. Anything not listed in `addresses` or `pastes` will render an empty-state placeholder.

## Components

All three components are registered as Docusaurus theme components and importable from `@theme/<Name>` in any `.md` / `.mdx` file.

### `<OmgStatus address="..." />`

Renders the most recent status from the address's statuslog. Output includes emoji, content, author handle (linking to the omg.lol profile), and a relative timestamp linking to the canonical status URL.

| Prop      | Type     | Required | Notes                                       |
| --------- | -------- | -------- | ------------------------------------------- |
| `address` | `string` | yes      | Must be listed in plugin's `addresses`      |

### `<OmgWeblogLatest address="..." showContent={false} />`

Renders the latest weblog post: title (linking to the post), byline, formatted date, and description.

| Prop          | Type      | Required | Notes                                                |
| ------------- | --------- | -------- | ---------------------------------------------------- |
| `address`     | `string`  | yes      | Must be listed in plugin's `addresses`               |
| `showContent` | `boolean` | no       | If true, also renders the full post body (raw text)  |

### `<OmgPaste address="..." paste="..." language="..." />`

Renders a paste as a `<pre><code>` block.

| Prop       | Type     | Required | Notes                                                          |
| ---------- | -------- | -------- | -------------------------------------------------------------- |
| `address`  | `string` | yes      | Must be combined with `paste` in plugin's `pastes` option      |
| `paste`    | `string` | yes      | Paste slug                                                     |
| `language` | `string` | no       | Adds `language-{x}` class for Prism syntax highlighting        |

## Empty states

Each component renders a small dashed-border placeholder if the requested content isn't in the build snapshot — for example, an address you forgot to declare, or a paste that 404s. This keeps your page from breaking in build but flags the issue visibly in dev.
