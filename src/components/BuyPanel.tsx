import { byCategory, buildingCost } from '../data/catalog';
import type { HireFunction } from '../types';
import { formatDuration } from '../utils/format';
import SingleCandidate from './SingleCandidate';

const buildings = byCategory('building');

interface BuyProps {
  money: number;
  maxMoney: number;
  staff: Record<string, number>;
  buyBuilding: HireFunction;
  agiAchieved: boolean;
  agiElapsedMs: number;
}

export default function BuyPanel({
  money,
  maxMoney,
  staff,
  buyBuilding,
  agiAchieved,
  agiElapsedMs
}: BuyProps) {
  if (agiAchieved) {
    return (
      <div className="rounded border border-ink-faint/30 p-6 text-center">
        <h4 className="text-ink font-semibold uppercase tracking-widest mb-2">
          AGI Achieved — no more working
        </h4>
        <p className="text-sm text-ink-muted">
          Time to AGI:{' '}
          <span className="text-ink font-semibold">{formatDuration(agiElapsedMs)}</span>
        </p>
      </div>
    );
  }
  const listBuildings = buildings
    .filter((building, index) => index === 0 || building.cost / 2 <= maxMoney)
    .map((building, index) => {
      const owned = staff[building.id] ?? 0;
      const isOwned = !building.repeatable && owned >= 1;
      const price = buildingCost(building, owned);
      return (
        <SingleCandidate
          key={index}
          onClick={buyBuilding}
          candidate={building}
          cost={price}
          owned={isOwned}
          disabled={isOwned || price > money}
        />
      );
    });
  return (
    <div>
      <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-3">Space</h4>
      <ul>{listBuildings}</ul>
    </div>
  );
}
