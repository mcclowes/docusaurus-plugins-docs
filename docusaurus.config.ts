import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Docusaurus Plugins',
  tagline: 'A family of Docusaurus v3 plugins — documented and dogfooded here.',
  favicon: 'img/logo.svg',
  url: 'https://docusaurus-plugins.mcclowes.com',
  baseUrl: '/',
  organizationName: 'mcclowes',
  projectName: 'docusaurus-plugins-docs',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  // Uses the glossary plugin's preset wrapper so auto-linking works in docs + pages.
  presets: [
    [
      'docusaurus-plugin-glossary/preset',
      {
        glossary: {
          glossaryPath: 'glossary/glossary.json',
          routePath: '/glossary',
        },
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mcclowes/docusaurus-plugins-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Plugin updates',
          blogDescription: 'Release notes and notes from the plugin family.',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  plugins: [
    // Dismissable announcement banner at the very top of the page.
    [
      'docusaurus-plugin-banner',
      {
        id: 'welcome',
        content:
          '🎉 You are looking at a site that uses every plugin documented here — try them out.',
        dismissible: true,
        backgroundColor: '#2e8555',
        textColor: '#ffffff',
      },
    ],

    // GDPR-style cookie consent. Must come before any analytics plugin.
    [
      'docusaurus-plugin-cookie-consent',
      {
        title: 'Cookie consent',
        description:
          'This site uses cookies only for remembering your preferences (theme, dismissed banners). See [privacy](/privacy) for details.',
        links: [{ label: 'Privacy', href: '/privacy' }],
        toastMode: true,
      },
    ],

    // Toast notifications for new blog posts since the user's last visit.
    [
      'docusaurus-plugin-new-post-toast',
      {
        toast: { position: 'bottom-right', duration: 8000, maxToasts: 3 },
        behavior: { maxAgeDays: 30 },
      },
    ],

    // docusaurus-plugin-starter is a *template* for building your own plugin
    // rather than a library you consume in production. Its example `StarterPage`
    // route has SSR issues in this consume-only setup (expected — you're meant
    // to fork it, not install it). We document it but don't register it here.

    // OMG → OpenAPI 3.1 compiler. Reads `api/todo/api.omg.md` (and the rest of
    // `api/todo/`) at build time and writes the spec to `static/api/todo.yaml`,
    // which the site then serves at `/api/todo.yaml`.
    [
      'docusaurus-plugin-omg',
      {
        apis: [{ id: 'todo', input: 'api/todo/api.omg.md' }],
      },
    ],

    // Discreet Statuspage.io banner on outages. Swap in your real statuspage URL.
    [
      'docusaurus-plugin-statuspage',
      {
        statuspageUrl: 'https://www.githubstatus.com',
        position: 'bottom-right',
        linkLabel: 'View status',
      },
    ],

    // Indexes these docs into build/mcp/snapshot.json at build time. Serve it
    // locally with `npm run mcp` and point an agent at http://localhost:3100/mcp
    // to search the plugin docs. routeBasePath matches where docs are served
    // (/docs) so generated page URLs resolve. OpenAPI indexing is demoed via the
    // serve CLI's --openapi flag (see `npm run mcp:api`) rather than here, since
    // the OMG-generated spec is a build artifact and would break clean builds.
    [
      'docusaurus-plugin-mcp',
      {
        server: { name: 'docusaurus-plugins-docs', version: '0.1.0' },
        routeBasePath: '/docs',
        instructions:
          'Search these docs to answer questions about the Docusaurus plugins documented here.',
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: { defaultMode: 'light', respectPrefersColorScheme: true },
    navbar: {
      title: 'Docusaurus Plugins',
      logo: { alt: 'Logo', src: 'img/logo.svg' },
      items: [
        { to: '/docs/intro', label: 'Docs', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/mcclowes',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting started', to: '/docs/intro' },
            { label: 'Glossary', to: '/glossary' },
          ],
        },
        {
          title: 'Plugins',
          items: [
            { label: 'Banner', to: '/docs/banner/overview' },
            { label: 'Cookie consent', to: '/docs/cookie-consent/overview' },
            { label: 'Embeds', to: '/docs/embeds/overview' },
            { label: 'Glossary', to: '/docs/glossary/overview' },
            { label: 'Marginalia', to: '/docs/marginalia/overview' },
            { label: 'MCP', to: '/docs/mcp/overview' },
            { label: 'New post toast', to: '/docs/new-post-toast/overview' },
            { label: 'Open with LLM', to: '/docs/open-with-llm/overview' },
            { label: 'omg', to: '/docs/omg/overview' },
            { label: 'Starter', to: '/docs/starter/overview' },
            { label: 'Statuspage', to: '/docs/statuspage/overview' },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Speccy',
              href: 'https://github.com/mcclowes/speccy/tree/main/packages/docusaurus-plugin',
            },
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/mcclowes' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} — MIT licensed. An independent, community-maintained collection of Docusaurus plugins. Not affiliated with or endorsed by the Docusaurus project or Meta.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'tsx', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
