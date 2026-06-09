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
    <div>
      <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-3">
        Development
      </h4>
      <ul className="mb-6">{listDevs}</ul>
      <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-3">Sales</h4>
      <ul>{listSales}</ul>
    </div>
  );
}
