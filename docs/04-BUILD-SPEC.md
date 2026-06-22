# indiespeedrun.com — Build Spec

> **⚠ Some stack/hosting lines below are SUPERSEDED.** Final calls: **Astro 6** (Node 22+, Content Layer API mandatory), Tailwind v4 via the **`@tailwindcss/vite`** plugin (NOT `@astrojs/tailwind`), **static output / no adapter**, host on **Cloudflare Pages**. See `06-MASTER-EXECUTION-PLAN.md` §0 and the root `CLAUDE.md` for authoritative stack. Everything else in this doc (architecture, redirect map, tool specs, baseline SEO, definition of done) stands.

## Stack (decided)

- **Astro 5+ / Tailwind v4** (same pipeline as anjarafashion, indietennis, vibhuti builds)
- **Cloudflare Workers/Pages** hosting, GitHub repo (suggest: rtinkoor/indiespeedrun-astro)
- **Canonical: https://www.indiespeedrun.com** (GSC shows www as indexed version). Redirect apex → www, http → https. All sitemap/OG/JSON-LD URLs use www.
- Claude Code for execution

## Baseline (every page, from runbook step 6)

- SSG output, semantic HTML
- sitemap.xml, robots.txt, RSS feed, llms.txt
- OG tags + OG image, canonical tags (www)
- JSON-LD: WebSite + Organization sitewide; Article on content pages; BreadcrumbList; FAQPage where genuine; SoftwareApplication/VideoGame on game + timer pages
- Updated-date stamps visible on WR tracker pages
- Lighthouse target ≥ 95 across the board (screenshot = listing evidence)

## Site architecture

```
/                          homepage: heritage statement + hub links
/pixel-speedrun/           playable game (money page #1) ⚠ licensing gate
/speedrun-timer/           web tool (money page #2)
/speedruns/                Cluster A hub
  /minecraft-speedrun-world-record/
  /silksong-speedrun/
  /super-mario-64-speedrun/
  /what-is-speedrunning/
/indie-games/              Cluster B hub
  /best-indie-games/       pillar
  /best-indie-games-switch/
  /best-indie-games-steam/
  /what-are-indie-games/
/jam-archive/              heritage page — 301 target for legacy URLs
/methodology/              honest curation/testing standards (linked from every commercial page)
/about/                    editorial board model
```

## 301 redirect map (Cloudflare _redirects or worker)

```
/devsite/*           → /jam-archive/   301
/teams/*             → /jam-archive/   301
/teampage/*          → /jam-archive/   301
/2015wp/*            → /jam-archive/   301
/index.php*          → /jam-archive/   301
```

## /speedrun-timer/ tool spec

Vanilla JS (or tiny Astro island). Features: start/stop/reset, split times (named segments), keyboard hotkeys (space = split, enter = start/stop, R = reset), millisecond precision via performance.now(), localStorage persistence of splits + PB comparison, dark theme default, copy-splits-to-clipboard. No accounts, no backend. Schema: SoftwareApplication.

## /pixel-speedrun/ page spec (after licensing resolved)

- If embeddable source licensed: iframe embed, fullscreen button, controls explained, "unblocked" framing handled in H2 (school networks angle), related-games section
- If building original: simple speedrun platformer (Kaplay.js or vanilla canvas), timer overlay, 8–10 short levels, local leaderboard. Original IP = transfers with sale, listed as asset
- Either way: page text covers raw + variant queries (what is pixel speedrun, controls, tips, unblocked)

## Monetization (optional, late)

AdSense after traffic appears — even $20–50/mo is a listing sweetener. Not a gate for sale. No affiliate complexity for a starter flip.

## Definition of done (shell milestone)

- [ ] Repo created, Astro scaffold, Tailwind, deployed to Cloudflare on www canonical
- [ ] Redirect map live (test 3 legacy URLs return 301 → /jam-archive/)
- [ ] Baseline SEO files present (sitemap, robots, RSS, llms.txt, OG, JSON-LD)
- [ ] Homepage + /jam-archive/ + /about/ + /methodology/ published
- [ ] Sitemap submitted in GSC (www property), indexing requested
- Hard signal: deployed URLs live + GSC sitemap accepted
