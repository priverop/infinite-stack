import SingleCandidate from './SingleCandidate';
import type { HireFunction } from '../types';
import { byCategory } from '../data/catalog';

const devs = byCategory('dev');
const sales = byCategory('seller');

interface HireProps {
  money: number;
  hireDev: HireFunction;
  hireSeller: HireFunction;
}

const DISPLAY_COST_DIFFERENCE = 500;

export default function HirePanel({ money, hireDev, hireSeller }: HireProps) {
  const listDevs = devs
    .filter((dev) => dev.cost - DISPLAY_COST_DIFFERENCE <= money)
    .map((dev, index) => <SingleCandidate key={index} onClick={hireDev} candidate={dev} />);
  const listSales = sales
    .filter((seller) => seller.cost - DISPLAY_COST_DIFFERENCE <= money)
    .map((salesperson, index) => (
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
