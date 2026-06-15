# Game Progressions

## Dr Meth reference data (source of progression curve)

| Building | Cost | Workers | Worker Cost (each) | Total Production | Per-Worker Production | Purity |
|---|---|---|---|---|---|---|
| Trailer | $2,000 | 5 Crackhead Cooks | $500 | 2 g/sec | 0.4 g/sec | 27% |
| House | $100,000 | 10 Students | $5,000 | 44 g/sec | 4.4 g/sec | 30% |
| Facility | $1,000,000 | 30 Chemists | $50,000 | 414 g/sec | 13.8 g/sec | 36% |
| Island | $30,000,000 | 40 Tribal Cooks | $50,000 | 3,328 g/sec | 83.2 g/sec | 38% |
| Hideout | $100,000,000 | 45 Loyal Workers | $90,000 | 6,840 g/sec | 152 g/sec | 40% |
| China | $2,000,000,000 | 50,000 Bodies | $1,000 | 78,200 g/sec | 1.564 g/sec | 46% |
| Moon | $50,000,000,000 | 50 Astro Cooks | $50,000,000 | 1,228,000 g/sec | 24,560 g/sec | 50% |
| Meth Star | $9,000,000,000,000 | 100 Meth Troopers | $50,000,000,000 | 183,000,000 g/sec | 1,830,000 g/sec | 60% |
| Planet of the Meth | $45,000,000,000,000 | 200 Crystal Farmers | $1 | 520,000,000 g/sec | 2,600,000 g/sec | 70% |
| An Actual Star | $99,000,000,000,000 | 1 Fusion Reactor Core | $1 | 1,000,000,000 g/sec | 1,000,000,000 g/sec | 75% |
| Black Hole | $250,000,000,000,000 | 1 The Voids | $1 | 0 g/sec | 0 | — (one-time) |
| Joe Bob's Lair | $1,000,000,000,000,000 | 1 Joe Bobs Lairs | $1 | 20,000,000,000 g/sec | 20,000,000,000 g/sec | 100% (one-time) |

Note: buildings unlock when total cash earned reaches half of its price. Black Hole
and Joe Bob's Lair are one-time purchases. We don't replicate the unlock-gate or
one-time-purchase mechanics — used only as a curve reference for `websitesPerSecond`
increments and cost scaling below.

## Base data

Quality: 20%
Price of website: 20

## Dealers (sellers) — unchanged for now

Base: 1000$, 4$/sec -> sells 1/5 gram, same price as quality 20% (20$/gram).

## Buildings and Workers

See `catalog.ts` dev/building tiers — buildings give max team size, devs give
websites/sec. Not linked to each other (unlike Dr Meth, where each building
gates a specific worker type).
