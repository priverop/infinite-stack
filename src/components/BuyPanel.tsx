import { byCategory } from '../data/catalog';
import type { HireFunction } from '../types';
import SingleCandidate from './SingleCandidate';

const buildings = byCategory('building');

interface BuyProps {
  money: number;
  maxMoney: number;
  buyBuilding: HireFunction;
}

const DISPLAY_COST_DIFFERENCE = 5000;

export default function BuyPanel({ money, maxMoney, buyBuilding }: BuyProps) {
  const listBuildings = buildings
    .filter((building, index) => index === 0 || building.cost - DISPLAY_COST_DIFFERENCE <= maxMoney)
    .map((building, index) => (
      <SingleCandidate
        key={index}
        onClick={buyBuilding}
        candidate={building}
        disabled={building.cost > money}
      />
    ));
  return (
    <div>
      <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-3">Space</h4>
      <ul>{listBuildings}</ul>
    </div>
  );
}
