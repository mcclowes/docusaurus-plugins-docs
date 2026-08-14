# Design

The design language for this site, grounded in Docusaurus's default theme and the Infima CSS framework that ships with it. The goal is to look and feel like a first-party Docusaurus site, so the plugin docs sit naturally alongside the official ones.

Source of truth for the runtime values is `src/css/custom.css`. This file explains the intent; that file is what actually renders.

## Foundations

Docusaurus's classic preset styles everything through [Infima](https://infima.dev), a layout and component framework built for content sites. You theme it by overriding CSS custom properties (the `--ifm-*` variables) in `src/css/custom.css`, rather than writing component CSS from scratch. Stick to that approach. Reach for a custom class only when no Infima variable covers the case.

Every color, font size, and spacing value below is a variable you can override in one place. Don't hard-code hex values in component styles when a token exists.

## Color

Docusaurus is built around a single brand color expanded into seven shades, light to dark. This site takes its teal accent and deep navy surfaces from the dinosaur mascot.

### Light mode (`:root`)

| Token                          | Hex       |
| ------------------------------ | --------- |
| `--ifm-color-primary`          | `#19765f` |
| `--ifm-color-primary-dark`     | `#176a56` |
| `--ifm-color-primary-darker`   | `#156450` |
| `--ifm-color-primary-darkest`  | `#115242` |
| `--ifm-color-primary-light`    | `#1b8268` |
| `--ifm-color-primary-lighter`  | `#1d886e` |
| `--ifm-color-primary-lightest` | `#219a7c` |

### Dark mode (`html[data-theme='dark']`)

| Token                          | Hex       |
| ------------------------------ | --------- |
| `--ifm-color-primary`          | `#65d4b2` |
| `--ifm-color-primary-dark`     | `#4dcca5` |
| `--ifm-color-primary-darker`   | `#41c8a0` |
| `--ifm-color-primary-darkest`  | `#31aa87` |
| `--ifm-color-primary-light`    | `#7ddcbd` |
| `--ifm-color-primary-lighter`  | `#89dfc3` |
| `--ifm-color-primary-lightest` | `#adebd7` |

The light-mode base teal meets WCAG AA contrast on the page background. If you ever pick a new brand color, keep that bar and generate the seven shades together (the Docusaurus docs point to [ColorBox](https://www.colorbox.io) for this) rather than eyeballing each one.

Infima derives the rest of the palette from these. Status colors (`--ifm-color-success`, `-info`, `-warning`, `-danger`) and the neutral grays come from Infima's defaults and don't need overriding unless a plugin's UI calls for it.

### One accent, everywhere

The primary teal is the main brand accent. The surrounding navy and mint shades come from the same logo palette:

- Theme links, buttons, and active states use `--ifm-color-primary`.
- The navbar and favicon use `static/img/docusaurus-plugins.png`.
- The announcement banner uses the logo's muted blue.

If the brand color ever changes, update all three together. A stray second accent (an old blue in the logo, a different banner color) is the fastest way to make the site look unfinished.

### Code line highlighting

| Token                                   | Light                | Dark                 |
| --------------------------------------- | -------------------- | -------------------- |
| `--docusaurus-highlighted-code-line-bg` | `rgba(0, 0, 0, 0.1)` | `rgba(0, 0, 0, 0.3)` |

Used to highlight specific lines in a code block. Dark mode runs a heavier alpha so the band stays visible on the dark code background.

## Dark mode

Both themes are first-class, not an afterthought. Docusaurus toggles them with a `data-theme` attribute on the root element: `data-theme="light"` or `data-theme="dark"`. Scope dark-theme tokens to `html[data-theme='dark']`, matching Infima's specificity so its defaults don't override them.

When you add a color, define it in both blocks. A value that only exists in `:root` will fall back oddly or vanish in dark mode.

## Typography

Infima ships a system font stack by default, so text matches the reader's OS and pages stay fast with no web-font download. Keep it. Body copy uses the UI sans-serif stack; code uses the platform monospace stack (SF Mono, Menlo, Consolas, and friends).

Two type tokens are worth knowing:

- `--ifm-code-font-size: 95%` — inline and block code render slightly smaller than body text so they don't overpower a sentence.
- `--ifm-font-size-base` — the body baseline. Leave it at the Infima default unless there's a real reason.

Headings come from Infima's `h1`–`h6` scale. Use them in document order (`h1` once per page, then down) for the table of contents and accessibility, not for sizing. If you want a smaller heading, pick the right level, don't restyle a bigger one.

## Layout and spacing

Infima drives layout through more `--ifm-*` tokens. The ones you'll touch most:

- `--ifm-navbar-height` — header height.
- `--ifm-spacing-horizontal` / `--ifm-spacing-vertical` — base spacing unit; most padding and margins derive from it.
- `--ifm-global-radius` — corner radius for cards, buttons, and code blocks.

Compose from these rather than dropping in pixel values. Consistent spacing comes from everything referencing the same unit.

## Voice and tone

The visual brand has a writing counterpart. Docs here follow the same rules as the rest of the repo:

- Sentence case in headings and titles, never Title Case.
- Plain, direct prose. State what a plugin does; skip the hype.
- Each plugin page set follows the same shape: `overview.md`, `getting-started.md`, `configuration.md`, then nested `advanced/*.md`. Predictable structure is part of the design.

## Emulation vs differentiation

This site deliberately stays close to the stock Docusaurus look. That's a design decision, not an accident: the docs should feel native to the ecosystem so they sit naturally beside the official ones. But "looks like a Docusaurus site" must never tip into "looks like _the_ Docusaurus project." The first is good craft. The second is passing off, and it breaks trust the moment a reader notices.

The rule that keeps us on the right side of the line: **emulate the platform, own the identity.** Infima's bones are shared infrastructure that every Docusaurus site uses. The name and the affiliation claim are ours to get right.

**Safe to share (the platform layer):**

- Infima and the default theme — using the framework as intended is the point.
- The stock primary green (`#2e8555`) and the default palette.
- The layout grammar: top navbar, left sidebar, right table of contents, admonitions.
- Sentence case and the per-plugin page structure.

**Must stay ours (the identity layer):**

- **Site title, tagline, and favicon.** The navbar name and browser tab say this project, not "Docusaurus."
- **Use the project's own mascot.** Don't substitute the Docusaurus wordmark, its logo, or Slash the dino.

### The affiliation disclaimer is load-bearing

Because we keep the stock green and layout, the visuals alone won't tell a reader this is an independent project. The disclaimer is what does that work, so it's not optional. It must ship.

Put a clear line in the footer (and ideally the homepage):

> An independent, community-maintained collection of Docusaurus plugins. Not affiliated with or endorsed by the Docusaurus project or Meta.

The test for any future change: _would a Docusaurus maintainer see this and think we're claiming to be them?_ Sharing a framework — no. Wearing their brand with no disclaimer — yes. As long as the name is ours and the disclaimer is visible, staying close to the default is fair game.

## Customizing

1. Open `src/css/custom.css`.
2. Override the token in both `:root` and `[data-theme='dark']`.
3. Restart the dev server (`npm start`) — CSS variable changes are picked up on reload.

Stay inside the token system. The moment you start hand-writing component CSS, dark mode, spacing, and future Docusaurus upgrades stop coming for free.

## References

- [Docusaurus styling and layout](https://docusaurus.io/docs/styling-layout)
- [Infima](https://infima.dev)
- `src/css/custom.css` — the live values
