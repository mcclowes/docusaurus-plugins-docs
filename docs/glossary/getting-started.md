---
id: getting-started
title: Getting started
---

# Getting started

## Install

```bash
npm install docusaurus-plugin-glossary
```

## Use the preset

The easiest setup is to swap `@docusaurus/preset-classic` for the plugin's preset wrapper — it configures the classic preset **and** wires up the auto-linking remark plugin in one step:

```ts
// docusaurus.config.ts
export default {
  presets: [
    [
      'docusaurus-plugin-glossary/preset',
      {
        glossary: {
          glossaryPath: 'glossary/glossary.json',
          routePath: '/glossary',
        },
        // Standard preset-classic options continue to work:
        docs: { sidebarPath: './sidebars.ts' },
        blog: { showReadingTime: true },
        theme: { customCss: './src/css/custom.css' },
      },
    ],
  ],
};
```

## Create the glossary file

At `glossary/glossary.json` (or wherever `glossaryPath` points):

```json
{
  "title": "Glossary",
  "description": "A collection of technical terms and their definitions",
  "terms": [
    {
      "term": "API",
      "abbreviation": "Application Programming Interface",
      "definition": "A set of rules and protocols that allows different software applications to communicate.",
      "relatedTerms": ["REST", "GraphQL"]
    },
    {
      "term": "REST",
      "abbreviation": "Representational State Transfer",
      "definition": "An architectural style for designing networked applications.",
      "relatedTerms": ["API", "HTTP"]
    }
  ]
}
```

## Start your site

```bash
npm start
```

- `/glossary` now shows the full list
- Any use of "API" or "REST" in your docs is auto-underlined with a tooltip
- No imports needed

## Next

- [Configuration](./configuration.md) — options & JSON schema
- [`<GlossaryTerm>` component](./component.md) — manual/override usage
- [Auto-linking details](./advanced/auto-linking.md) — what the remark plugin does and doesn't match
