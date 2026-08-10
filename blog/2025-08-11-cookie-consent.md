---
slug: cookie-consent
title: Introducing cookie consent
authors: [max]
tags: [plugins, cookie-consent]
---

`docusaurus-plugin-cookie-consent` adds a configurable consent prompt to Docusaurus without taking over how your analytics work.

<!--truncate-->

The plugin stores a visitor's choices across necessary, analytics, marketing, and functional categories. Your client code can read those choices through a React hook or listen for changes through a DOM event. It also supports Google Consent Mode v2.

The separation is deliberate: the plugin handles the interface and preferences, while your site remains responsible for loading scripts only after the relevant consent is present. No consent component can make an otherwise careless integration compliant.

Read the [cookie consent docs](/docs/cookie-consent/overview) or find the package on [npm](https://www.npmjs.com/package/docusaurus-plugin-cookie-consent).
