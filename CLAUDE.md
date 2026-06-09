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

**State lives entirely in `useGameLogic`** (`src/hooks/useGameLogic.ts`). All game state (money, websites, people, etc.) is held there as `useState`. The hook composes two sub-hooks:

- `useGameStorage` — autosaves `GameStats` to `localStorage` every 10s via `useRef` (avoids stale closure); loads on mount.
- `useAchievements` — receives `GameStats` each render, checks unlock conditions, persists unlocked set to `localStorage` under key `'unlocked-achievements'`. Returns `{ unlockedAchievements, recentUnlocks }` (recent clears after 5s for toast notifications).

`App.tsx` destructures everything from `useGameLogic` and passes props down — no context/store, pure prop drilling. The main UI lives in `components/Panel.tsx`, which uses `react-tabs` for the tabbed hire/buy/achievements panels.

**Two localStorage keys:**
- `'game-state'` — full `GameStats` snapshot
- `'unlocked-achievements'` — JSON array of unlocked achievement IDs

## Key domain types (`src/types.ts`)

- `GameStats` — the canonical game state shape (used for storage, achievements, and inter-hook communication)
- `Achievement` — supports three types: `threshold` (stat >= target), `firstPurchase` (purchaseType: dev/seller/building), `collection` (collectionType: buildings/devs/sellers). Only `threshold` is implemented in `useAchievements`; `firstPurchase`/`collection` are commented out because their logic reads per-type counts (`juniorDevs`, `seniorSales`, `coworkingSingle`, etc.) that `GameStats` does not track — implementing them requires extending `GameStats` first.
- `Candidate` — hire panel item shape (title, image, cost, increment)
- `HireFunction = (cost: number, increment: number) => void`

## Game tick

One `setInterval` (1000ms) inside `useGameLogic` drives passive production: adds `websitesPerSecond` to websites, then deducts `moneyPerSecond` worth of websites and adds that to money — so sellers consume websites to produce money. The deduction only fires when `moneyPerSecond <= current websites`, so sellers never oversell stock; if devs can't keep up, money production stalls silently (the `// ToDo: Alert if moneyPerSecond is not viable` marks this gap).

## Roadmap gaps (from README)

- Achievements: `firstPurchase` and `collection` types have data but no unlock logic
- Headhunters, Marketing agency, Staff animations planned
