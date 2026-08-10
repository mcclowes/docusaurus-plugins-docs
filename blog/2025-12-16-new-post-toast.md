---
slug: new-post-toast
title: Introducing new post toast
authors: [max]
tags: [plugins, new-post-toast]
---

`docusaurus-plugin-new-post-toast` helps returning readers notice what you've published since they last visited.

<!--truncate-->

At build time, the plugin reads post metadata from Docusaurus. In the browser, it compares those dates with a timestamp in `localStorage` and shows a small toast for each unseen post, up to a configurable limit. There are no accounts, subscriptions, or server-side state to run.

It's a modest alternative to asking every reader for an email address. The site remembers one date, points out what's new, and then gets out of the way.

The source repository is named `docusaurus-plugin-post-notifications`; the package itself is named `docusaurus-plugin-new-post-toast` and is currently distributed here as a packaged archive. Read the [new post toast docs](/docs/new-post-toast/overview) or [browse the repository](https://github.com/mcclowes/docusaurus-plugin-post-notifications).
