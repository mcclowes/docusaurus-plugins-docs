---
id: freshness
title: Freshness
---

# Freshness

The plugin fetches at build time. If a status changes after you build, your page won't reflect it until the next build.

## Why build-time only

- Static HTML — no client JS, no extra bundle weight
- No CORS or rate-limit concerns from end-user browsers
- Works with every Docusaurus deploy target (Vercel, Netlify, GH Pages, S3, etc.)

## When this is fine

- Latest weblog post, paste contents — these change rarely
- Bio-style "what I'm up to right now" surfaces where 24-hour staleness is acceptable

## When you want fresher

If your status changes hourly and you want it visible in near-real-time, trigger periodic rebuilds from your host:

- **Vercel/Netlify**: a scheduled deploy hook (e.g. cron pinging the build webhook every 30 minutes)
- **GitHub Actions**: a `workflow_dispatch` or `schedule` trigger that runs `docusaurus build` and redeploys
- **Self-hosted**: a cron job that runs `npm run build` on a schedule

A future plugin release may add an optional client-side refresh; for now, scheduled rebuilds are the recommended path.

## Caching within a build

The plugin's API client deduplicates identical URLs within a single build run, so listing the same address twice in `addresses` doesn't double-fetch.
