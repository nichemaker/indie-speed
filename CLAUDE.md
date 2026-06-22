# indiespeedrun.com — build context for Claude Code

This file is auto-read at the start of every Claude Code session. It is the **authoritative source for stack and constraints**. Full strategy lives in `/docs` — `06-MASTER-EXECUTION-PLAN.md` is the index; read it plus the one doc relevant to the current session.

## What this is
Build-to-flip **static** site. Niche = **indie games + speedrunning** (locked by the domain's only real link equity — gaming-press backlinks). Exit = Flippa starter-site listing, triggered at **sustained 60–70 organic clicks/day** in GSC. Built with Claude Code, synced to GitHub, deployed to Cloudflare Pages.

## Stack (do NOT deviate without asking)
- **Astro 6** (Node **22.12+**). Use the **Content Layer API** for all collections — legacy content collections are removed in v6.
- **Tailwind v4** via the official **`@tailwindcss/vite`** plugin (`npx astro add tailwind` on Astro 5.2+). Do **NOT** use `@astrojs/tailwind` — it is deprecated. **Pin** the `tailwindcss` version in `package.json` (v4 minors can introduce breaking changes).
- Single `src/styles/global.css` with `@import "tailwindcss";`, imported once in the base layout.
- **Output: static** (Astro's default). **NO server adapter** — this site is 100% prerendered.

## Hosting & URLs
- **Cloudflare Pages**, Git-connected, deploying static `dist/`. Set Node 22 via `.nvmrc` (`22.12.0`).
- **Canonical: `https://www.indiespeedrun.com`** — redirect apex → www, http → https.
- **301 redirect map** in `_redirects`:
  `/devsite/*`, `/teams/*`, `/teampage/*`, `/2015wp/*`, `/index.php*` → `/jam-archive/`

## Content collections (define schemas in CC-1, fill later)
`speedrun-records`, `indie-games`, `jam-entries`. Pages are data-driven entries against templates built once — build templates first, author content as entries afterward.

## Site architecture
```
/                              homepage: heritage statement + hub links
/speedrun-game/                original speedrun platformer (ownable IP) + page
/pixel-speedrun/               DEFERRED — branded/navigational term; see docs/06 §4
/speedrun-timer/               free web tool (vanilla JS, no backend)
/speedruns/                    Cluster A hub
  /minecraft-speedrun-world-record/
  /silksong-speedrun/
  /super-mario-64-speedrun/
  /what-is-speedrunning/
/indie-games/                  Cluster B hub
  /best-indie-games/           pillar
  /best-indie-games-switch/
  /best-indie-games-steam/
  /what-are-indie-games/
/jam-archive/                  heritage page — 301 target for legacy URLs
/methodology/                  honest curation/testing standards
/about/                        editorial-board model
```

## Build order (see /docs/06 for full detail + per-session done-criteria)
- **CC-1** shell: scaffold, Tailwind, deploy, redirect map, baseline SEO files, collection schemas, homepage + /jam-archive/ + /about/ + /methodology/.
- **CC-2** /speedrun-timer/ (no deps).
- **CC-3** /speedrun-game/ — original platformer (vanilla canvas, zero deps). Targets generic discovery ("free browser speedrun game"). `/pixel-speedrun/` is DEFERRED — see docs/06 §4 and the architecture block above.
- **CC-4** Cluster A (WR trackers) — each page requires the augmented-query pre-brief first.
- **CC-5** Cluster B (best-indie-games pillar + spokes).

## Baseline for every page
Semantic HTML; canonical tag (www); OG tags + OG image; appropriate JSON-LD (WebSite + Organization sitewide; Article on content; BreadcrumbList; SoftwareApplication on the timer; VideoGame on the game; FAQPage only where genuine). `sitemap.xml`, `robots.txt`, RSS, `llms.txt` present. Lighthouse target **≥ 95** across the board (screenshots = listing evidence).

## Rules
- Honest, scene-aware credibility: **editorial-board model, no fake named expert, no fabricated "we tested" claims.**
- Every task must produce a **hard external signal** (deployed URL + date, GSC indexation, impressions, clicks). No signal = not done.
- **Ask before any destructive or irreversible step** (force-push, deleting files, changing the canonical, deploying).
