# Pre-Brief: /speedruns/minecraft-speedrun-world-record/

**Head query:** minecraft speedrun world record
**Estimated volume:** ~60–90 K/month (global, English)
**Intent:** Know (current WR) + Understand (categories, history, controversy)
**Pre-brief date:** 2026-06-22

---

## PART A — SERP Snapshot & AIO Gap Analysis

### SERP features (manual observation pattern for this query class)
- **AI Overview (position 0):** 4-category summary — RSG, Set Seed, All Advancements, Bedrock — with approximate times and runner names. **No dates on any figure. No version context. No source links.** Sources cited: speedrun.com, a few YouTube cards.
- **Position #1:** speedrun.com/mc — authoritative full leaderboard. Hard to skim, no prose context.
- **Positions #2–4:** YouTube — WR progression videos, Dream controversy clips. Engagement-driven, no structured data.
- **Positions #5–7:** Informational pages (gaming wikis, news sites) — largely dated (2021–2022 figures), no update signals.
- **PAA box:** 5–7 questions, see PART B.
- **Image pack mid-SERP:** screenshots of run timer, Minecraft end portal.

### AIO weaknesses to exploit
| AIO gap | Our counter |
|---------|-------------|
| No dates on figures | Prominent "Updated [date]" stamp on every load; dated row per record |
| Only 4 categories, vague | Master table: all categories + version splits (1.16.1 vs other), each with sourceUrl |
| No source links in AIO | Every table row links to the relevant speedrun.com leaderboard page |
| No version context | H2 explaining why 1.16.1 is the primary version |
| No history | WR progression table (year, time, context) |
| No category explanations | H2/H3 per category (RSG, SSG, All Advancements, Bedrock) |
| No Dream context | H2: factual account with outbound link |

### Win condition
Front-load the answer (hero: RSG WR + runner + date + Updated stamp) then out-detail the AIO on recency, granularity, source attribution, and explanatory depth. The stamp refresh cadence is both the AIO-resistance signal and the listing maintenance evidence.

---

## PART B — 7 Verbatim PAA Questions

Represent high-confidence PAA pulls for this query cluster:

1. **What is the current Minecraft speedrun world record?**
2. **Who holds the Minecraft speedrun world record?**
3. **What is RSG in Minecraft speedrunning?**
4. **What is the fastest Minecraft speedrun ever?**
5. **What version of Minecraft do speedrunners use?**
6. **Did Dream cheat in his Minecraft speedruns?**
7. **How long does the Minecraft world record run take?**

---

## PART C — Categories & Known Records (unverified as of 2026-06-22)

Source to verify: https://www.speedrun.com/mc (Java) | https://www.speedrun.com/mcbe (Bedrock)

| Category | Edition | Version | Approx. time | Notes |
|----------|---------|---------|--------------|-------|
| Any% RSG | Java | 1.16.1 | ~7:37–7:50 | Headline category; most contested |
| Any% RSG | Java | 1.9–1.15 | slower | Legacy versions, less active |
| Any% SSG (Set Seed) | Java | 1.16.1 | sub-2:00 | Predetermined seed, optimal route |
| All Advancements | Java | current | ~2h | 96 advancements; multi-hour |
| Any% RSG | Bedrock | latest | TBD | speedrun.com/mcbe |

**WR run video:** Check current #1 run on speedrun.com/mc RSG board for video link.

### Category-specific notes for copy
- **1.16.1 dominance:** 1.16 (Nether Update) introduced piglin bartering, enabling efficient ender pearl acquisition. 1.16.1 is preferred over 1.16.2+ because a later patch changed blaze rod drop rates unfavourably.
- **RSG vs SSG:** RSG runners cannot pre-plan the world — all routing is live. SSG runners pick a known world and execute a memorised optimal path; comparable to comparing Marathon vs Track in athletics.
- **All Advancements:** Complete all 96 advancements (crafting, combat, exploration, Nether, End). Separate skill set; much longer run.
- **Dream controversy:** October–November 2020. Minecraft Speedrunning Team flagged Dream's 1.16 RSG runs for statistically anomalous piglin barter and blaze rod drop rates (~1-in-7.5-trillion probability per analysis). Dream disputed the methodology. August 2021: Dream admitted a mod was installed that affected drop rates, framing it as an accident during stream setup. Runs removed from speedrun.com. See: speedrun.com Dream ban thread and Dream's public statement.

### Historical WR progression (approximate, unverified)
| Era | Approx. WR range | Context |
|-----|-----------------|---------|
| Pre-2019 | 15–30+ min | Pre-1.16 routing, piglin barter unavailable |
| 2020 (1.16 release) | 12–14 min | New category, routing develops rapidly |
| 2021 | 8:30–10:00 | Optimisation era, widespread competition |
| 2022 | 8:00–8:30 | Sub-9 min barrier broken |
| 2023 | 7:45–8:00 | Push toward sub-8 |
| 2024–2025 | ~7:37–7:50 | Current competitive range (verify exact) |

---

## PART D — Variant → Heading Map

| Query variant | Page location |
|---|---|
| minecraft speedrun world record | H1 + hero above fold |
| fastest minecraft speedrun | H2: "What is the fastest Minecraft speedrun ever?" |
| minecraft speedrun world record time | Hero stat block |
| who holds the minecraft speedrun world record | H2: "Who holds the record?" |
| minecraft speedrun categories explained | H2: "RSG vs Set Seed vs All Advancements" |
| what is rsg minecraft | H3: "What is RSG (Random Seed Glitchless)?" |
| what is set seed glitchless minecraft | H3: "What is Set Seed Glitchless?" |
| what is all advancements minecraft speedrun | H3: "What is All Advancements?" |
| what version minecraft speedrunners use | H2: "Why do speedrunners use version 1.16.1?" |
| dream minecraft speedrun controversy | H2: "The Dream controversy" |
| minecraft speedrun tas | H2: "TAS vs human: are there faster records?" |
| how long is the minecraft world record run | PAA #7 answer |
| minecraft speedrun world record history | H2: "Historical WR progression" |
| minecraft speedrun for beginners | H2 + link to /speedrun-timer/ |

---

## PART E — Internal Link Topology

**Link TO this page from:** homepage (card already added in CC-3), /speedruns/ hub, /speedrun-timer/ (contextual mention)

**Link FROM this page to (existing pages only as of 2026-06-22):**
- `/speedrun-timer/` — contextual ("want to time your own runs?")
- `/methodology/` — cite in editorial note

**Backlog — add when built (note in JSON backlogLinks):**
- `/speedruns/super-mario-64-speedrun/` — "compare: SM64 category structure"
- `/speedruns/silksong-speedrun/` — related WR tracker
- `/speedruns/what-is-speedrunning/` — "new to speedrunning?" onramp

---

## PART F — Schema Plan

- `Article` — with `dateModified` = updatedAt from data, cite speedrun.com as source
- `BreadcrumbList` — via Base.astro (Home → Speedruns → Minecraft WR)
- `FAQPage` — wrap the 7 PAA answers; rich result candidate
