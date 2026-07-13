# Dooley Runbook

A patch-locked, in-run cheat sheet for playing Dooley in **The Bazaar**. It turns current mechanics and high-ranked community strategy into quick decisions: which line is live, what to buy, where to shop, how to order the board, and when to pivot.

**Live site:** https://bwoff11.github.io/dooly-cheat-sheet/

## What is covered

- Patch 16, reviewed against revision 16.1
- Eight current Core routes
- Three repeatable build lines per route
- Buy / hold / skip priorities
- Board-order logic and run timelines
- Ranked merchants per Core, with why to enter, when to reroll, and when to leave
- A global merchant directory and patch-surviving Dooley rules
- Source and confidence labels that separate mechanics, consensus, and situational theory

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
npm run build:pages
```

`npm run build` creates the Cloudflare/Sites build. `npm run build:pages` creates the static `out/` directory deployed by GitHub Actions.

## Updating a patch

Strategy lives in [`app/content.ts`](app/content.ts). Keep major-patch snapshots separate instead of silently changing an archived patch. Every update should include:

- major patch and live revision
- review date
- current Core text
- repeatable entry signals and pivot conditions
- merchant pools/rerolls checked against current data
- sources and a confidence label for each line

Please use the **strategy correction** issue form for stale recommendations or source-backed improvements.

## Sources and status

The site favors official patch notes for balance, current databases for tooltips and merchants, and multi-author expert guides for strategy. A 10-win screenshot is treated as evidence that a board can work, not as proof that it is a reproducible line.

This is an unofficial fan-made reference. The Bazaar and related trademarks belong to their respective owners.
