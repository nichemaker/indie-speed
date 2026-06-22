# indiespeedrun.com — Project Brief & Current State

> **Note:** Stack (Astro 6, not 5+), hosting (Cloudflare Pages, decided), and the Pixel Speedrun approach have been finalized/refined since this brief. See `06-MASTER-EXECUTION-PLAN.md` §0 and §4 for the authoritative versions. This brief otherwise stands.

**Last updated:** 2026-06-10
**Operator:** Rohit
**Play:** Build-to-flip traffic niche site. Develop fast, sell on traffic alone (no earnings requirement).
**Exit target:** Flippa starter-site listing. Sale trigger = sustained **60–70 organic clicks/day** in GSC.
**Timeframe preference:** Fast execution. 6–8 week build window.

## The asset

- Domain: indiespeedrun.com (GoDaddy). Heritage: the **Indie Speed Run game jam (2012–2015 era)** — a 48-hour indie game development competition with genuine gaming press coverage.
- DR 26 (spam-inflated). Zero current organic keywords / traffic = treat as near-new build per runbook.
- Real equity: **~75 clean referring domains** with branded gaming anchors — NBC News, Fox News, Vice, PC Gamer, Game Developer, Unity, ModDB, IndieDB, Kill Screen, Gamekult, IGDA chapters, indie dev blogs. This locks the niche: **indie games + speedrunning**. Any other niche throws away the only real equity.

## Niche & positioning

Indie games + speedrunning resource site. Homepage acknowledges heritage honestly: "the home of the former Indie Speed Run game jam, now an indie games and speedrunning resource." This converts legacy press links into topical relevance.

**Credibility model:** editorial-standards-board (skinhow model). NO fake named expert, NO fabricated "we tested" claims — the speedrun community is extremely scene-aware. Honest methodology page linked from commercial-intent pages.

## Decisions log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-10 | Niche = indie games + speedrunning | Matches the only genuine link equity |
| 2026-06-10 | Stack = Astro + Tailwind + Claude Code + Cloudflare | Speed of execution; custom JS money pages easier than WP; Lighthouse score is a listing asset. WP migration offered as paid add-on in listing if buyer wants |
| 2026-06-10 | Exit = Flippa starter site, sell on traffic (60–70 clicks/day), no monetization required before sale | Owner decision; AdSense can be added late as listing sweetener but is not a gate |
| 2026-06-10 | **Canonical = https://www.indiespeedrun.com** (GSC shows www as the indexed version) | Follow existing index signals rather than fight them |
| 2026-06-10 | Disavow file (294 domains) uploaded to non-www URL-prefix property; **pending: upload same file to www prefix property** | Disavow tool doesn't support Domain properties |
| 2026-06-10 | Credibility = editorial board, not named persona | Scene-aware community; honest methodology only |

## Open items / risks

1. **Pixel Speedrun embed licensing** — the game is Construct-built; verify an embeddable source whose license permits it, OR build an original speedrun-style browser platformer (cleaner for the sale listing — "original game, full IP transfers with sale"). RESOLVE BEFORE BUILDING /pixel-speedrun/.
2. www disavow upload — pending (file: disavow-indiespeedrun.txt, 294 domains, generated 2026-06-10).
3. Borderline domains kept OUT of disavow, eyeball manually: boehrsi.de, mboffin.net, oujevipo.fr, tetranome.com, stratos-ad.com (Ahrefs-flagged but gaming-contextual anchors).
4. Lost spam (~900 dead casino domains in all-time profile) NOT disavowed — only live spam matters; re-pull and append if any resurface.

## Operating rules for this project (from OS)

- Every task needs a hard external signal: indexed page, published URL with date, GSC impressions, clicks. No signal = premature-completion flag.
- Execution sessions: lean and fast. Strategy sessions: challenge provisional thinking.
- Content briefs: ALWAYS run the augmented query network pre-brief (raw → transformation variants → next-step queries → synthetic variants) before any outline. Each H2/H3 = passage-level standalone answer. Internal links = next-step query architecture.
- Test pages live → read GSC → then scale. Progress = indexed pages earning impressions, not plans.
- Sale-listing evidence to collect as you go: disavow confirmation screenshot (both prefixes), Lighthouse scores, GSC impression/click charts, clean Ahrefs re-crawl showing spam neutralized.
