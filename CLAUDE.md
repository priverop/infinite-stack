# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
pnpm lint:fix     # eslint --fix
pnpm typecheck    # tsc -b --noEmit (no emit, just type check)
pnpm preview      # preview production build
```

No test suite exists yet.

## Architecture

Incremental/idle game built with React 19 + TypeScript + Vite + Tailwind v4.

**State lives entirely in `useGameLogic`** (`src/hooks/useGameLogic.ts`). All game state is held there as `useState` and assembled into a single `GameStats` object each render. The hook composes two sub-hooks:

- `useGameStorage` — autosaves `GameStats` to `localStorage` every 10s via a `useRef` (avoids stale closure); exposes `load()` (called once on mount) and `removeStorage()`.
- `useAchievements` — receives `GameStats` each render, checks unlock conditions, persists unlocked IDs to `localStorage` under `'unlocked-achievements'`, and fires `react-hot-toast` notifications. Returns `{ unlockedAchievements, recentUnlocks, removeAchievements }` (recentUnlocks clears after 5s).

`App.tsx` destructures everything from `useGameLogic` and passes props down — no context/store, pure prop drilling. The main UI lives in `components/Panel.tsx`, which uses `react-tabs` for the tabbed hire/buy/achievements panels.

**Hireables catalog** (`src/data/catalog.ts`) is the single source for every purchasable: devs, sellers, and buildings (one flat `Candidate[]`). Helpers `byCategory(category)` and `sumCategory(staff, category)` back the achievement logic. Adding/balancing content = editing this file, not the hooks.

**Two localStorage keys:**
- `'game-state'` — full `GameStats` snapshot
- `'unlocked-achievements'` — JSON array of unlocked achievement IDs

## Key domain types (`src/types.ts`)

- `GameStats` — canonical game state. Beyond visible resources (`money`, `websites`, `websitesPerSecond`, `sellsPerSecond`, `quality`, `people`, `maxPeople`, `agencyPurchased`) it carries hidden achievement counters (`totalClicks`, `websitesCreated`, `websitesSold`) and `staff: Record<string, number>` — per-`Candidate.id` owned counts, the backbone for all per-type achievement logic.
- `Achievement` — four types, **all implemented** in `useAchievements`: `threshold` (numeric `stat` >= `target`), `firstPurchase` (owns >=1 of a `CandidateCategory`), `collection` (owns every catalog item in a category; the `staff` category = all devs + sellers), `staffCount` (sum of owned `staffIds` >= `target`).
- `CandidateCategory = 'dev' | 'seller' | 'building' | 'staff'`
- `Candidate` — catalog item (`id`, `category`, `title`, `image`, `cost`, `increment`, optional `quality` on devs, optional `hidden` for agency-only sellers like `linkedin-bro`).
- `HireFunction = (id: string, cost: number, increment: number) => void` — shared by `hireDev`, `hireSeller`, `buyBuilding`; `id` keys into `staff`.

## Game mechanics

**Quality** — money per website sold equals `quality`. Hiring a dev raises `quality` to that tier's `Candidate.quality` if higher; it never decreases. Better devs make every sale worth more, not just faster production.

**Game tick** — one `setInterval` (1000ms) drives passive production: adds `websitesPerSecond` to stock, then sells `min(sellsPerSecond, stock)` websites for `sold * quality` money. Partial-sell means an over-provisioned sales team trickles money instead of stalling. Passive sales count toward `websitesSold` (gates the Agency). The `// ToDo: Alert if sellsPerSecond is not viable` marks the still-unhandled "sellers outrun devs" case.

**Marketing Agency** — unlocks for purchase once `websitesSold >= AGENCY_UNLOCK_SOLD` (1M), costs `AGENCY_COST` (1M). Once `agencyPurchased`, a second interval (`AGENCY_INTERVAL_MS` = 3s) auto-hires one `linkedin-bro` per tick (consuming a people slot, capped by `maxPeople`/`money`). It reads live state from a `useRef` rather than effect deps, so the per-second money/people churn doesn't reset the interval.

**Hire guards** — `hireDev`/`hireSeller` require `money >= cost && people < maxPeople`; `buyBuilding` only checks money (raises `maxPeople`).

## Roadmap gaps (from README)

- Click animations, staff animations (Team panel GIF already added).
- Global state refactor (currently prop drilling).
- Progression/balancing tuning (see `docs/progressions.md`).
