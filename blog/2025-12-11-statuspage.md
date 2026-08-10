---
slug: statuspage
title: Introducing Statuspage
authors: [max]
tags: [plugins, statuspage]
---

`docusaurus-plugin-statuspage` tells readers when the service behind your documentation is having trouble.

<!--truncate-->

The plugin checks a public Statuspage.io summary when the page loads. If the service is degraded or has an active incident, it shows a discreet banner with a link to the full status page. Dismissals are stored per incident, which keeps an acknowledged problem from nagging the same reader while allowing a later incident to appear.

There are no webhooks or synchronized deployment steps. Point it at the public status page you already maintain and it reads the current state directly.

This site is connected to GitHub's status page as a live demonstration. Read the [Statuspage docs](/docs/statuspage/overview) or find the package on [npm](https://www.npmjs.com/package/docusaurus-plugin-statuspage).
