---
id: configuration
title: Configuration
---

# Configuration

## Plugin options

The defaults scan `docs`, `blog`, and `src/pages` for literal `url` props on `RichLinkCard` and `LinkCard` elements.

| Option      | Type       | Default                                        | Description                                    |
| ----------- | ---------- | ---------------------------------------------- | ---------------------------------------------- |
| `include`   | `string[]` | `['docs', 'blog', 'src/pages']`                | Source directories scanned for rich-link URLs. |
| `cacheDir`  | `string`   | `node_modules/.cache/docusaurus-plugin-embeds` | Directory used for fetched link metadata.      |
| `cacheTime` | `number`   | `86400000`                                     | Cache lifetime in milliseconds.                |

```ts
export default {
  plugins: [
    [
      'docusaurus-plugin-embeds',
      {
        include: ['docs', 'src/pages'],
        cacheDir: '.cache/embeds',
        cacheTime: 7 * 24 * 60 * 60 * 1000,
      },
    ],
  ],
};
```

Expressions such as `url={article.url}` can't be found during the scan. Supply `title`, `description`, and other metadata directly for dynamic URLs.

## Shared card props

`RichLinkCard`, `GitHubRepoCard`, and `NpmPackageCard` accept `className`, `style`, and `fallback`. The `fallback` value can be `link`, `compact`, or `hidden`.

## `<RichLinkCard>`

| Prop          | Type                        | Required | Default | Description                                   |
| ------------- | --------------------------- | -------- | ------- | --------------------------------------------- |
| `url`         | `string`                    | Yes      |         | Absolute HTTP or HTTPS destination.           |
| `title`       | `string`                    | No       |         | Overrides the fetched title.                  |
| `description` | `string`                    | No       |         | Overrides the fetched description.            |
| `image`       | `string`                    | No       |         | Overrides the fetched preview image.          |
| `siteName`    | `string`                    | No       |         | Overrides the fetched site name.              |
| `favicon`     | `string`                    | No       |         | Overrides the fetched favicon.                |
| `fallback`    | `link \| compact \| hidden` | No       | `link`  | Rendering used when metadata isn't available. |

## `<GitHubRepoCard>` and `<NpmPackageCard>`

`GitHubRepoCard` requires `repo` in `owner/name` format. `NpmPackageCard` requires `package`, including its scope when applicable. Both fetch public data in the browser and accept the shared card props.

The plugin doesn't accept API tokens. Proxy or prefetch the data if your site needs authenticated requests, fixed build output, or a strict content security policy.

## `<YouTube>`

| Prop          | Type                        | Required | Default                | Description                            |
| ------------- | --------------------------- | -------- | ---------------------- | -------------------------------------- |
| `id`          | `string`                    | Yes      |                        | YouTube video ID.                      |
| `title`       | `string`                    | No       | `YouTube video player` | Accessible iframe title.               |
| `aspectRatio` | CSS `aspect-ratio`          | No       | `16 / 9`               | Video aspect ratio.                    |
| `className`   | `string`                    | No       |                        | Additional class for the container.    |
| `fallback`    | `link \| compact \| hidden` | No       | `link`                 | Rendering used when no ID is supplied. |
