# indiespeedrun.com — Domain Audit (Ahrefs, 2026-06-10)

## Headline metrics

| Metric | Value | Note |
|--------|-------|------|
| Domain Rating | 26 | Spam-inflated; discount heavily |
| Ahrefs Rank | 5,609,821 | |
| Live backlinks | 56,202 | Mostly sitewide spam |
| All-time backlinks | 4,055,013 | mega888 blast peak |
| Live referring domains | 376 (370 retrieved & classified) | |
| All-time referring domains | 1,272 | ~900 dead spam domains |
| Organic keywords | 0 | Near-new build |
| Organic traffic | 0 | |

## Link profile classification (live, 370 domains reviewed)

**Disavowed: 294 domains** (file: disavow-indiespeedrun.txt, generated 2026-06-10)

Spam clusters:
1. **"Rank Your Website ↑↑↑ / Telegram @rankerno_1" PBN blast** — ~130 casino/slot domains (casinoXXX.com, XXXslot.com, tlcasinoXXX.com network), dofollow, 169K+ links.
2. **SEOExpress testimonial network** — ~110 domains, all `*.store` / `*.shop`, identical fake-testimonial anchor mentioning SEOExpress.org.
3. **SEO-sales anchor spam** — buybacklinks.agency, rank-top.click, rankpilot.shop, rankongoogle.agency, seoagency.sale, nexusnext.agency, etc.
4. **mega888 casino injection** — elinkdesign.com, digitalauthorship.com (anchors: "mega888", "download mega888"). All-time blast = 3M+ links, mostly dead.
5. **Scraper/stat directories** flagged is_spam by Ahrefs with bare `indiespeedrun.com` anchors (acquire.co.in, allinone.co.in, bestwebstats.com, etc.)

**Kept (clean core): ~75 domains.** Highlights with DR:

| Domain | DR | Anchor |
|--------|----|--------|
| github.io | 94 | Indiespeedrun.com project |
| nbcnews.com | 91 | Indie Speed Run |
| vice.com | 91 | indie speed run desse ano |
| unity.com | 91 | (devsite URL) |
| foxnews.com | 91 | Indie Speed Run |
| pcgamer.com | 85 | Indie Speed Run |
| gamedeveloper.com | 83 | Indie Speed Run (18 links) |
| gamejolt.com | 81 | (games page URL) |
| moddb.com | 79 | Niveus |
| indiedb.com | 78 | Niveus |
| kktix.cc | 75 | (event link) |
| kpfu.ru | 73 | Indie Speed Run |
| leafo.net | 72 | (itch.io founder's site) |
| neogaf.com | 72 | (devsite URL) |
| theoldreader.com | 71 | Indie Speed Run Game Jam |
| polycount.com | 71 | (devsite URL) |
| gamekult.com | 67 | IndieSpeedRun |
| killscreen.com | 65 | Indie Speed Run |
| telltale.com / telltalegames.com | 71/65 | Indie Speed Run |
| doope.jp | 44 | Indie Speed Run (331 links) |
| + IGDA chapters (igda.tw, igdasp.com.br, igdshare.org), startit.rs, mo5.com, sescsp.org.br, indie dev blogs (onemanleft, lostdecadegames, bscotch.net, emcneill, martinbussy, ponywolf, freeindiegam.es, etc.) | | |

**Borderline — review manually, currently NOT disavowed:** boehrsi.de, mboffin.net, oujevipo.fr, tetranome.com, stratos-ad.com (Ahrefs is_spam=1, but anchors are game-specific: "Indie Speed Run", "Niveus", "Defense of the Weasel God"; oujevipo.fr is a known French indie games blog).

## Old site URL patterns (legacy link targets — consider 301s or recreating)

Legacy deep links from clean domains point to:
- `/devsite/`, `/devsite/index.php` (Joomla-era homepage)
- `/teams/`, `/teams/account/games-page.php?id=XXX` (team/game entry pages)
- `/teampage/<TeamName>` (e.g. /teampage/Thirty-Something, /teampage/SATSUGAI)
- `/2015wp/games/`, `/2015wp/game/?game=XXXXXX` (2015 WordPress-era game pages)

**Action:** 301 these patterns to a new `/jam-archive/` heritage page (or section) so legacy link equity from gaming press consolidates instead of 404ing.

## Disavow status

- [x] Non-www URL-prefix property: uploaded 2026-06-10
- [ ] www URL-prefix property (canonical): upload same file — PENDING
- Evidence for sale listing: screenshot disavow confirmation (both prefixes)
