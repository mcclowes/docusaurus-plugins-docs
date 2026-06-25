import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Banner',
      link: { type: 'doc', id: 'banner/overview' },
      items: [
        'banner/getting-started',
        'banner/configuration',
        {
          type: 'category',
          label: 'Advanced',
          items: ['banner/advanced/multiple-banners', 'banner/advanced/styling'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Cookie consent',
      link: { type: 'doc', id: 'cookie-consent/overview' },
      items: [
        'cookie-consent/getting-started',
        'cookie-consent/configuration',
        'cookie-consent/hook',
        {
          type: 'category',
          label: 'Advanced',
          items: [
            'cookie-consent/advanced/google-consent-mode',
            'cookie-consent/advanced/custom-analytics',
            'cookie-consent/advanced/categories',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Glossary',
      link: { type: 'doc', id: 'glossary/overview' },
      items: [
        'glossary/getting-started',
        'glossary/configuration',
        'glossary/component',
        {
          type: 'category',
          label: 'Advanced',
          items: [
            'glossary/advanced/auto-linking',
            'glossary/advanced/manual-configuration',
            'glossary/advanced/customization',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Marginalia',
      link: { type: 'doc', id: 'marginalia/overview' },
      items: [
        'marginalia/getting-started',
        'marginalia/configuration',
        {
          type: 'category',
          label: 'Advanced',
          items: ['marginalia/advanced/theming'],
        },
      ],
    },
    {
      type: 'category',
      label: 'MCP',
      link: { type: 'doc', id: 'mcp/overview' },
      items: [
        'mcp/getting-started',
        'mcp/configuration',
        {
          type: 'category',
          label: 'Advanced',
          items: ['mcp/advanced/openapi', 'mcp/advanced/serving'],
        },
      ],
    },
    {
      type: 'category',
      label: 'New post toast',
      link: { type: 'doc', id: 'new-post-toast/overview' },
      items: [
        'new-post-toast/getting-started',
        'new-post-toast/configuration',
        {
          type: 'category',
          label: 'Advanced',
          items: ['new-post-toast/advanced/multiple-blogs', 'new-post-toast/advanced/storage'],
        },
      ],
    },
    {
      type: 'category',
      label: 'omg',
      link: { type: 'doc', id: 'omg/overview' },
      items: [
        'omg/getting-started',
        'omg/configuration',
        {
          type: 'category',
          label: 'Advanced',
          items: ['omg/advanced/source-layout', 'omg/advanced/renderers'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Starter',
      link: { type: 'doc', id: 'starter/overview' },
      items: [
        'starter/getting-started',
        'starter/what-you-get',
        {
          type: 'category',
          label: 'Advanced',
          items: ['starter/advanced/lifecycle-hooks', 'starter/advanced/remark-integration'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Statuspage',
      link: { type: 'doc', id: 'statuspage/overview' },
      items: [
        'statuspage/getting-started',
        'statuspage/configuration',
        {
          type: 'category',
          label: 'Advanced',
          items: ['statuspage/advanced/how-it-works', 'statuspage/advanced/global-data'],
        },
      ],
    },
  ],
};

export default sidebars;
