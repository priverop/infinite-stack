import { byCategory } from '../data/catalog';
import type { HireFunction } from '../types';
import SingleCandidate from './SingleCandidate';

const buildings = byCategory('building');

interface BuyProps {
  buyBuilding: HireFunction;
}

export default function BuyPanel({ buyBuilding }: BuyProps) {
  const listBuildings = buildings.map((building, index) => (
    <SingleCandidate key={index} onClick={buyBuilding} candidate={building} />
  ));
  return (
    <div>
      <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-3">Space</h4>
      <ul>{listBuildings}</ul>
    </div>
  );
}
