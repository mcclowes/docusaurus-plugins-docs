---
id: configuration
title: Configuration
---

# Configuration

## Plugin options

| Option                     | Type      | Default                    | Description                                                                                                                                                                |
| -------------------------- | --------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `glossaryPath`             | `string`  | `'glossary/glossary.json'` | Path to the glossary JSON, relative to the site root.                                                                                                                      |
| `routePath`                | `string`  | `'/glossary'`              | URL where the glossary page is served.                                                                                                                                     |
| `expandAcronymsOnFirstUse` | `boolean` | `false`                    | When `true`, rewrite the first canonical occurrence of any term with an `abbreviation` to `Long Form (Term)`. See [auto-linking](advanced/auto-linking.md) for full rules. |

## Glossary JSON schema

```ts
type GlossaryFile = {
  title?: string;
  description?: string;
  terms: Term[];
};

type Term = {
  term: string; // required
  definition: string; // required
  abbreviation?: string; // full form, if `term` is an acronym
  relatedTerms?: string[]; // links to other entries by `term`
  id?: string; // explicit ID; auto-derived from `term` otherwise
  autoLink?: boolean; // set to false to opt out of automatic linking
  aliases?: string[]; // additional phrases that link to this term
  caseSensitive?: boolean; // require exact case when auto-linking
  documentation?: {
    path: string; // site-relative path beginning with `/`
    label?: string;
  };
  references?: Array<{
    label: string;
    url: string; // absolute HTTP(S) URL
  }>;
};
```

`autoLink` defaults to `true`, and `caseSensitive` defaults to `false`. Aliases share
the canonical term's tooltip and link target. `documentation` changes the inline
term's destination from the glossary entry to the specified internal page, while
`references` adds external links to the glossary page.

### Full example

```json
{
  "title": "Glossary",
  "description": "Technical terms used in our documentation",
  "terms": [
    {
      "term": "API",
      "abbreviation": "Application Programming Interface",
      "definition": "A set of rules and protocols that allows different software applications to communicate with each other.",
      "relatedTerms": ["REST", "GraphQL", "Webhook"],
      "aliases": ["Application Programming Interface"],
      "caseSensitive": true,
      "documentation": {
        "path": "/docs/api",
        "label": "Read the API guide"
      },
      "references": [
        {
          "label": "MDN: Web APIs",
          "url": "https://developer.mozilla.org/en-US/docs/Web/API"
        }
      ]
    },
    {
      "term": "Webhook",
      "definition": "An HTTP callback triggered when something happens; a simple event notification via HTTP POST.",
      "relatedTerms": ["API", "HTTP"]
    }
  ]
}
```

## Adding the glossary to your navbar

```ts
themeConfig: {
  navbar: {
    items: [
      { to: '/glossary', label: 'Glossary', position: 'left' },
    ],
  },
}
```
