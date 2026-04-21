---
id: theming
title: Theming
---

# Theming

Marginalia ships with defaults derived from
[Infima](https://infima.dev) — Docusaurus's CSS variable system — so it picks
up your site's accent color and dark-mode palette automatically.

## Override hooks

Each surface is driven by a `--marginalia-*` variable. Override any of them
on `:root` in `src/css/custom.css`:

```css
:root {
  --marginalia-accent: #4f46e5;
  --marginalia-accent-soft: #eef2ff;
  --marginalia-accent-strong: #3730a3;
  --marginalia-danger: #dc2626;
  --marginalia-surface: #ffffff;
  --marginalia-border: #e5e7eb;
  --marginalia-text: #1f2937;
  --marginalia-heading: #111827;
  --marginalia-muted: #6b7280;
  --marginalia-font-mono: ui-monospace, monospace;
  --marginalia-font-serif: 'Iowan Old Style', Georgia, serif;
  --marginalia-navbar-offset: 60px;
}
```

## Dark mode

Wrap overrides in `[data-theme='dark']`:

```css
[data-theme='dark'] {
  --marginalia-accent: #8b5cf6;
  --marginalia-surface: #111827;
  --marginalia-border: #374151;
  --marginalia-text: #e5e7eb;
  --marginalia-heading: #f9fafb;
  --marginalia-muted: #9ca3af;
}
```

## Variable reference

| Variable                      | Maps to (default)               | Purpose                      |
| ----------------------------- | ------------------------------- | ---------------------------- |
| `--marginalia-accent`         | `--ifm-color-primary`           | Anchor underline, hot border |
| `--marginalia-accent-soft`    | `--ifm-color-primary-lightest`  | `link` kind swatch           |
| `--marginalia-accent-strong`  | `--ifm-color-primary-darker`    | `code` swatch, PUT/PATCH chip |
| `--marginalia-danger`         | `--ifm-color-danger`            | `warning` / `endpoint` swatch |
| `--marginalia-surface`        | `--ifm-card-background-color`   | Card + TOC background         |
| `--marginalia-border`         | `--ifm-color-emphasis-300`      | Card border, dividers        |
| `--marginalia-text`           | `--ifm-font-color-base`         | Body text inside cards       |
| `--marginalia-heading`        | `--ifm-heading-color`           | Card titles                  |
| `--marginalia-muted`          | `--ifm-color-emphasis-700`      | Kind labels, muted copy      |
| `--marginalia-font-mono`      | `--ifm-font-family-monospace`   | Kind labels, pills, endpoint |
| `--marginalia-font-serif`     | `--ifm-font-family-base`        | Card titles                  |
| `--marginalia-navbar-offset`  | `--ifm-navbar-height`           | Sticky TOC offset            |

## Swizzling

For structural changes beyond CSS variables, swizzle any of the components:

```bash
npm run swizzle docusaurus-plugin-marginalia Marginalia/Aside -- --eject
```

Eject is the only supported mode — the components aren't built with a wrap
seam today.
