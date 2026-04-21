---
id: overview
title: Marginalia
sidebar_label: Overview
---

# `docusaurus-plugin-marginalia`

Editorial sidenotes for Docusaurus. Inline anchors in prose pair with cards in
the right margin that pack top-down, highlight as the reader scrolls, and
collapse gracefully on narrow viewports.

## Why use it

- You want reference-style marginalia (think Tufte, pattern-language books) without swizzling the theme
- You're writing long-form essays or technical walkthroughs where inline footnotes break reading flow
- You want per-anchor card registration with keyboard accessibility out of the box

## At a glance

- Three components: `<Marginalia>` container, `<Aside>` anchor/card pair, `<Endpoint>` method chip
- Sticky in-gutter table of contents with scroll progress indicator
- Scroll-driven `hot` state syncs the anchor and its card
- Cards pack top-down with a 10px gap; overflowing cards collapse to a compact face
- Hidden below 1200px with native `title` tooltip fallback
- Infima-variable themed with `--marginalia-*` override hooks for per-site styling

## Compatibility

- Docusaurus `^3.0.0`
- React `^18`
