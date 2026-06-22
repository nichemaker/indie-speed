# indiespeedrun.com — Master Execution Plan

**Last updated:** 2026-06-10
**Purpose:** Single carry-over document for all build chats in this project. Sequences the work in `05-NEXT-ACTIONS` into discrete, self-contained Claude Code sessions, and records research-driven corrections to `04-BUILD-SPEC`. Read this first in every new chat, plus the one doc relevant to the session.

---

## 0. What research changed (corrections to the existing docs)

These supersede the matching lines in `04-BUILD-SPEC` and `01-PROJECT-BRIEF`. Everything else in those docs stands.

| Topic | Doc said | Corrected decision (2026-06-10 research) |
|-------|----------|------------------------------------------|
| Astro version | "Astro 5+" | **Astro 6** (stable since 2026-03-10). Requires **Node 22.12+**. Content Layer API is mandatory; legacy content collections are removed. Scaffold with `npm create astro@latest`, upgrade with `npx @astrojs/upgrade`. |
| Astro ownership | (none) | **Astro is now a Cloudflare project** with first-class Workers support. Reinforces — but does not force — Cloudflare hosting. |
| Tailwind | "Tailwind v4" | Correct, but install via the **official `@tailwindcss/vite` plugin** (`npx astro add tailwind` on Astro 5.2+). The old `@astrojs/tailwind` integration is **deprecated** — do not use it. **Pin the Tailwind version** (e.g. `"tailwindcss": "4.3.x"`); v4 minors can break. Use a single `src/styles/global.css` with `@import "tailwindcss";`, imported once in the base layout. |
| Output mode | (implied SSR-capable) | Site is **100% static**. Set nothing special — static is Astro's default; `output: 'hybrid'` was removed in 5.x. **No server adapter needed.** This makes deployment trivial and fully portable for the flip. |
| Hosting | "Cloudflare Workers/Pages" | Either Cloudflare or Netlify is fine for a static site. **Recommendation below (§3).** |
| Pixel Speedrun | "build original platformer to capture pixel speedrun 29K" | **Reframed — see §4.** An original game does *not* capture the branded "pixel speedrun" intent; treat that keyword as optional/non-load-bearing. |

---

## 1. The play, in one paragraph (carry-over context)

Build-to-flip static niche site on the indiespeedrun.com domain. Niche is **indie games + speedrunning** — locked by the only real link equity (~75 clean gaming-press domains: NBC, Fox, Vice, PC Gamer, Game Developer, Unity, ModDB, IndieDB, etc.). Heritage framing on the homepage converts those legacy links into topical relevance. Credibility = honest **editorial-standards-board** model, no fake named expert, no fabricated "we tested" claims (scene-aware audience). Exit = Flippa starter-site listing triggered at **sustained 60–70 organic clicks/day**. Every task must produce a **hard external signal** (deployed URL + date, GSC indexation, impressions, clicks) — no signal = premature-completion flag. 6–8 week window.

---

## 2. Non-Claude-Code housekeeping (do outside the build chats)

These are dashboard tasks, not coding. Clear them in parallel; they gate nothing in §5 except where noted.

1. **Upload `disavow-indiespeedrun.txt` to the `https://www.indiespeedrun.com/` URL-prefix property** in GSC (already uploaded to non-www on 2026-06-10). Screenshot both confirmations → listing evidence.
2. **Eyeball the 5 borderline domains** (boehrsi.de, mboffin.net, oujevipo.fr, tetranome.com, stratos-ad.com). Append to disavow only if they look bad on visit. oujevipo.fr is a known French indie-games blog — likely keep.
3. **Set up the GSC `www` property** (if not already) and have it ready to accept the sitemap from CC-1.

---

## 3. Hosting decision (resolved)

Because the site is **static**, both options are equivalent in capability, free-tier-generous, Git-auto-deploy, and `_redirects`-compatible. The real selection criteria are simplicity and clean handover to a buyer.

- **Recommended: Cloudflare Pages** (Git-connected), given Astro is now a Cloudflare project and `04-BUILD-SPEC` already leaned this way. Static deploy, no adapter, `_redirects` file for the 301 map.
- **Equally valid: Netlify.** Astro 6 works on Netlify day-one; `_redirects` and `netlify.toml` redirects are dead simple; buyer handover is one repo connect.

Either way: **deploy `dist/` as a static site, no SSR adapter.** Canonical stays **`https://www.indiespeedrun.com`**; redirect apex→www and http→https at the host. Set Node 22 in the deploy environment (dashboard setting or `.nvmrc` = `22.12.0`).

Pick one and record it in the decisions log. Don't run both — one host, one source of truth, cleaner for the sale.

---

## 4. Pixel Speedrun decision (reframed — important)

**The reality research surfaced:** "pixel speedrun" (29K vol, KD 4) is effectively a **branded/navigational query** for a specific Construct-built game by developer *vendara* (also on Steam, published by Indie Falcon). Searchers want *that game*. Every site ranking for the term embeds the Construct Arcade version; the Construct Arcade offers an embed mechanism under its Arcade Terms of Service.

**Why "build original to capture 29K" is the wrong frame:** an original platformer won't satisfy branded intent — users pogo-stick back to find the real game, which suppresses rankings and engagement on that exact term. You'd be competing for a navigational keyword with a non-matching result.

**Decision — decouple into two tracks:**

- **Track 1 (ownable asset, do this): build the original speedrun platformer** (Kaplay.js or vanilla canvas; 8–10 short levels, timer overlay, local leaderboard). Target it at **generic, non-branded discovery** — "online speedrun game", "browser speedrun platformer", and the `/pixel-speedrun/` page's secondary/informational queries (what is pixel speedrun, controls, tips, "unblocked"/school-network angle). This is clean IP that **transfers fully with the sale** — a genuine listing asset.
- **Track 2 (optional, non-load-bearing): the Construct embed.** *If* you want a shot at the 29K branded traffic, you may add an embed (Construct Arcade ToS permitting, using the creator's published embed). **But disclose it as a third-party dependency and do not let the sale's value rest on it** — the game can be pulled or the ToS can change, and "the core attraction isn't ours" weakens a scene-aware buyer's confidence.

**The dependable money pages are the ones you fully control:** the **speedrun timer** (ownable tool) and the **content clusters** (WR trackers + best-indie-games pillar). Those, not the branded game term, are what you warrant in the listing. In the Flippa write-up, describe the original game as targeting generic speedrun-game discovery — never claim it "captures pixel speedrun 29K." Honesty here is consistent with the project's own credibility principle.

---

## 5. Build sequence — Claude Code sessions

Each session is self-contained: open a new chat, paste the carry-over block (§7), name the session, and reference the listed doc. Complete the **Done-when** signal and log it to the ledger in `05-NEXT-ACTIONS` before stopping.

### CC-1 — Shell milestone
**Goal:** Scaffold + deploy the structural site. Equals the "Definition of done" in `04-BUILD-SPEC`.
**Reference:** `04-BUILD-SPEC` (§Site architecture, §Baseline, §301 map).
**Build:**
- Repo (`rtinkoor/indiespeedrun-astro`), Astro 6 scaffold, Tailwind v4 via `@tailwindcss/vite` (pinned), Node 22.
- Static output, deploy to chosen host on `www` canonical (apex→www, http→https).
- 301 redirect map in `_redirects`: `/devsite/*`, `/teams/*`, `/teampage/*`, `/2015wp/*`, `/index.php*` → `/jam-archive/`.
- Baseline SEO files: `sitemap.xml`, `robots.txt`, RSS, `llms.txt`, OG tags + OG image, canonical tags, JSON-LD (WebSite + Organization sitewide; BreadcrumbList).
- **Content Collections (Astro 6 Content Layer)** defined now for the data-driven page types you'll fill later: `speedrun-records`, `indie-games`, `jam-entries`. This is the key structural move — build templates once, author content as collection entries afterward.
- Publish: homepage (heritage statement + hub links), `/jam-archive/`, `/about/` (editorial-board model), `/methodology/`.
**Done-when (hard signal):** deployed URLs live; **3 legacy test URLs return 301 → /jam-archive/**; sitemap submitted and accepted in GSC `www` property; Lighthouse ≥ 95 screenshot captured.

### CC-2 — /speedrun-timer/ (money page #2, fully ownable)
**Goal:** Ship the free web tool. No dependencies, one session.
**Reference:** `04-BUILD-SPEC` (§/speedrun-timer/ tool spec).
**Build:** vanilla JS / tiny Astro island — start/stop/reset, named splits, hotkeys (space=split, enter=start/stop, R=reset), `performance.now()` ms precision, localStorage splits + PB compare, dark default, copy-splits-to-clipboard. Schema: `SoftwareApplication`. Page text covers raw + next-step queries.
**Done-when:** tool live + functional; `SoftwareApplication` JSON-LD validates; URL submitted for indexing.

### CC-3 — /speedrun-game/ (original game build — Track 1 from §4)
**Goal:** Original speedrun platformer + page. May run 1–2 sessions given game scope.
**Slug change (2026-06-22):** Built at `/speedrun-game/`, NOT `/pixel-speedrun/`. "pixel speedrun" is a branded/navigational term targeting a third-party game; the original platformer targets generic discovery ("free browser speedrun game", "online speedrun platformer"). `/pixel-speedrun/` is **deferred** — it's a separate content decision, not part of this asset's core value.
**Reference:** `04-BUILD-SPEC` (§/pixel-speedrun/, "if building original"); §4 above.
**Build:** Vanilla canvas (zero deps); 8 levels; performance.now() timer overlay; local best-times board (localStorage, labelled "your best times" — not global). Touch controls for mobile. Game JS lazy-loaded on Play click (keeps Lighthouse ≥ 95). Schema: `VideoGame`. Original-IP note for the asset list.
**Done-when:** page live; game playable end-to-end (all 8 levels); `VideoGame` JSON-LD validates; URL indexed.

### CC-4 — Cluster A (AIO-resistant WR trackers)
**Goal:** 3–4 data-driven record pages. **Each page requires the augmented-query pre-brief first** (§6) — no outline without it.
**Reference:** `03-KEYWORD-CONTENT-PLAN` (Cluster A), `04-BUILD-SPEC` (`/speedruns/` hub).
**Build (as `speedrun-records` collection entries against the CC-1 template):** `/minecraft-speedrun-world-record/` (+ fastest minecraft speedrun H2), `/silksong-speedrun/`, `/super-mario-64-speedrun/`, `/what-is-speedrunning/` + glossary spokes. Format: current-WR data table at top (runner, time, date, category, source link to speedrun.com), visible updated-date stamp, history table, route/category explanation below. The weekly stamp refresh *is* the AIO-resistance + maintenance evidence.
**Done-when:** pages published (URL + date logged); indexed in GSC.
**GATE:** proceed to CC-5 only once Cluster A is **earning impressions** in GSC.

### CC-5 — Cluster B (best-indie-games pillar + spokes)
**Goal:** Pillar + 3 spokes. Pre-brief each (§6).
**Reference:** `03-KEYWORD-CONTENT-PLAN` (Cluster B), `04-BUILD-SPEC` (`/indie-games/` hub).
**Build (as `indie-games` collection entries):** `/best-indie-games/` pillar (comparison table with the unique **speedrun-friendliness** column no competitor has; honest curation criteria linked to `/methodology/`), `/best-indie-games-switch/`, `/best-indie-games-steam/`, `/what-are-indie-games/`.
**Done-when:** published + indexed; impressions appearing.

### Ongoing (weekly cadence, not a one-off session)
- WR tracker refresh: re-check records, update stamps (listing evidence of maintenance).
- GSC read: indexation, impressions, clicks → update the ledger.
- Scale only what GSC shows earning impressions. **~15–20 pages total before evaluating.**
- AdSense optional/late — listing sweetener, not a gate.
- **Listing trigger:** at sustained **60–70 clicks/day**, assemble the pack (§8).

---

## 6. Content pre-brief (NON-NEGOTIABLE before any outline)

From the project OS. Run the 4-step augmented query network for every content page:
1. **Raw query** — the head term.
2. **Transformation variants** — reformulations Google generates (synonyms, question forms, intent shifts).
3. **Next-step queries** — what the searcher asks next → these become the **internal links**.
4. **Synthetic variants** — zero-volume augmentation targets, one paragraph or table row each.

Each H2/H3 = a passage-level standalone answer to ONE variant. Internal links follow the next-step architecture. Niche pages are **articles** (package a known answer), not essays. Your Ahrefs connector (Keywords Explorer / matching terms / related terms) is the tool for steps 1–3.

---

## 7. Carry-over block (paste at the top of each new build chat)

> **Project:** indiespeedrun.com build-to-flip (indie games + speedrunning static site).
> **Stack:** Astro 6 (Node 22), Tailwind v4 via `@tailwindcss/vite` (pinned), static output (no adapter), [Cloudflare Pages | Netlify], canonical `https://www.indiespeedrun.com`. Built with Claude Code, synced to GitHub, auto-deployed.
> **This session:** [CC-#, goal].
> **Rules:** hard signal required to call anything done (URL+date / GSC indexation / impressions / clicks). Content pages need the augmented-query pre-brief before any outline. Honest editorial-board credibility — no fake expert, no fabricated testing claims.
> **Docs in project:** 01-BRIEF, 02-DOMAIN-AUDIT, 03-KEYWORD-CONTENT-PLAN, 04-BUILD-SPEC, 05-NEXT-ACTIONS, 06-MASTER-EXECUTION-PLAN (this).

---

## 8. Flippa listing pack (assemble at 60–70 clicks/day)

- GSC impression/click charts (the trend is the product).
- Lighthouse ≥ 95 screenshots.
- Disavow confirmation screenshots (both URL-prefix properties).
- Clean Ahrefs re-crawl showing spam neutralized.
- Heritage story (Indie Speed Run jam 2012–2015 + press coverage).
- Asset list: original game IP (full transfer), speedrun timer tool, content library, 301 redirect map, repo. Optional WP-migration add-on offer.

---

## 9. Decisions log (append to 01-PROJECT-BRIEF)

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-10 | Astro **6** (not 5), Node 22, Content Layer API, Tailwind v4 via `@tailwindcss/vite` (pinned) | Current stable; deprecated integration avoided; Cloudflare now backs Astro |
| 2026-06-10 | Static output, **no SSR adapter**; deploy `dist/` | Site is fully static; maximizes portability for the flip |
| 2026-06-10 | Host = [decide: Cloudflare Pages recommended / Netlify equally valid] | Both equal for static; pick one for a clean single source of truth |
| 2026-06-10 | Pixel Speedrun = **build original game (Track 1)** as ownable asset; Construct embed optional + non-load-bearing | "pixel speedrun" is branded/navigational intent; original game targets generic discovery + transfers with sale; embed is a disclosed third-party dependency only |
| 2026-06-10 | Dependable money pages = **speedrun timer + content clusters**, not the branded game term | These are fully owned/warrantable for the listing |
