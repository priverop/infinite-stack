import type { HireFunction } from '../types';
import SingleCandidate from './SingleCandidate';

const buildings = [
  {
    title: 'Co-working single subscription',
    image: 'https://picsum.photos/id/42/100',
    description: 'Increases max team size by 1.',
    cost: 500,
    increment: 1
  },
  {
    title: 'Co-working private space',
    image: 'https://picsum.photos/id/163/100',
    description: 'Increases max team size by 5.',
    cost: 2000,
    increment: 5
  },
  {
    title: 'Small office',
    image: 'https://picsum.photos/id/192/100',
    description: 'Increases max team size by 50.',
    cost: 10000,
    increment: 3
  }
];

interface BuyProps {
  buyBuilding: HireFunction;
}

export default function BuyPanel({ buyBuilding }: BuyProps) {
  const listBuildings = buildings.map((building, index) => (
    <SingleCandidate key={index} onClick={buyBuilding} candidate={building} />
  ));
  return (
    <div className="text-left p-4">
      <ul>{listBuildings}</ul>
    </div>
  );
}
