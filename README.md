# Dooley Runbook

A patch-locked strategy reference for playing Dooley in **The Bazaar**. It sits between a quick in-run cheat sheet and a comprehensive guide: current mechanics, ranked items, proven synergy packages, build archetypes, activation order, merchant targets, matchup context, and pivot conditions are organized by Core.

**Live site:** https://bwoff11.github.io/dooly-cheat-sheet/

## What is covered

- Patch 16, reviewed against revision 16.1
- Seven starting Core choices plus a Launcher specialist route
- A synthesized 40-item Dooley opportunity tier list with explicit S / A / B / C purchase tests
- Ten Core-specific item priorities for every route
- At least four synergy packages per Core, including operational and failure conditions
- A dedicated Plasma Rifle conversion lab for Ignition: event math, sequencing, partners, upgrades, merchants, and purchase gates
- Three recommended build archetypes per Core
- Buy / hold / skip priorities
- Activation order and priorities by run phase
- Ranked merchants per Core, with why to enter, when to reroll, and when to leave
- A global merchant directory and general Dooley strategy principles
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
- sources and a confidence label for each build

Please use the **strategy correction** issue form for stale recommendations or source-backed improvements.

## Sources and status

The site favors official patch notes for balance, current databases for tooltips and merchants, and multi-author expert guides for strategy. A 10-win screenshot demonstrates viability but does not establish that a build is consistently reproducible.

This is an unofficial fan-made reference. The Bazaar and related trademarks belong to their respective owners.
