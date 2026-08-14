---
id: overview
title: Cookie consent
sidebar_label: Overview
---

# `docusaurus-plugin-cookie-consent`

![Banner for docusaurus-plugin-cookie-consent, featuring the plugin's dinosaur mascot](/img/plugin-banners/cookie-consent.png)

A GDPR-friendly cookie consent modal/toast for Docusaurus sites with:

- Configurable text (markdown links supported) and link list
- Accept all and reject optional actions with configurable labels
- Cookie categories (necessary, analytics, marketing, functional)
- `useCookieConsent` hook for gating scripts on consent
- Google Consent Mode v2 integration for GTM/GA4/Ads
- A `cookieConsentChange` DOM event for PostHog/Plausible/custom analytics

## Why use it

You need to respect user consent _before_ loading tracking scripts. This plugin gives you the UI + preference storage; your code is responsible for actually not loading scripts until `hasCategoryConsent()` returns true (see the [hook](./hook.md)).

## Live demo

This site uses the plugin in **toast mode** — look for the consent banner in the corner.

## Real-world example

The plugin ships a sample site plus four client-integration snippets at [`examples/`](https://github.com/mcclowes/docusaurus-plugin-cookie-consent/tree/main/examples):

- `sample-site/` — full Docusaurus example
- `client-conditional-loading.ts` — gate script tags on consent
- `client-dom-manipulation.ts` — show/hide elements based on consent
- `client-event-listeners.ts` — hook into `cookieConsentChange`
- `client-external-library.ts` — PostHog / Plausible style integration

## Compatibility

- Docusaurus `^3.0.0`
- React `^18.2.0` or `^19.0.0`
- Node.js `>=20`

## What this plugin is **not**

- A substitute for a lawyer. It helps you comply, but your privacy/cookie policies and your site's tracking behavior are your responsibility.
- An auto-blocker. It does not stop scripts that ignore `hasCategoryConsent()` — your code has to check.
