import SingleCandidate from './SingleCandidate';
import type { HireFunction } from '../types';
import { byCategory } from '../data/catalog';

const devs = byCategory('dev');
const sales = byCategory('seller');

interface HireProps {
  hireDev: HireFunction;
  hireSeller: HireFunction;
}

export default function HirePanel({ hireDev, hireSeller }: HireProps) {
  const listDevs = devs.map((dev, index) => (
    <SingleCandidate key={index} onClick={hireDev} candidate={dev} />
  ));
  const listSales = sales.map((salesperson, index) => (
    <SingleCandidate key={index} onClick={hireSeller} candidate={salesperson} />
  ));
  return (
    <div className="text-left p-4">
      <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mt-4 mb-4">
        Development
      </h4>
      <ul>{listDevs}</ul>
      <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mt-8 mb-4">
        Sales
      </h4>
      <ul>{listSales}</ul>
    </div>
  );
}
