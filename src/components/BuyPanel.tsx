import { byCategory, buildingCost } from '../data/catalog';
import type { HireFunction } from '../types';
import SingleCandidate from './SingleCandidate';

const buildings = byCategory('building');

interface BuyProps {
  money: number;
  maxMoney: number;
  staff: Record<string, number>;
  buyBuilding: HireFunction;
}

const DISPLAY_COST_DIFFERENCE = 5000;

export default function BuyPanel({ money, maxMoney, staff, buyBuilding }: BuyProps) {
  const listBuildings = buildings
    .filter((building, index) => index === 0 || building.cost - DISPLAY_COST_DIFFERENCE <= maxMoney)
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
