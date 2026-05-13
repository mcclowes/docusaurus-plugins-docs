---
id: configuration
title: Configuration
---

# Configuration

## Plugin options

| Option                     | Type      | Default                    | Description                                                                                                                                                              |
| -------------------------- | --------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `glossaryPath`             | `string`  | `'glossary/glossary.json'` | Path to the glossary JSON, relative to the site root.                                                                                                                    |
| `routePath`                | `string`  | `'/glossary'`              | URL where the glossary page is served.                                                                                                                                   |
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
};
```

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
      "relatedTerms": ["REST", "GraphQL", "Webhook"]
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
