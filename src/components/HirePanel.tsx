import SingleCandidate from './SingleCandidate';
import type { HireFunction } from '../types';
import { byCategory } from '../data/catalog';
import { AGENCY_COST, AGENCY_UPGRADE_COST } from '../hooks/useGameLogic';
import { formatMoney } from '../utils/format';

const devs = byCategory('dev');
// Hidden sellers (e.g. the agency-only LinkedIn Bro) never get a manual hire button
const sales = byCategory('seller').filter((seller) => !seller.hidden);

interface HireProps {
  money: number;
  maxMoney: number;
  people: number;
  maxPeople: number;
  hireDev: HireFunction;
  hireSeller: HireFunction;
  agencyUnlocked: boolean;
  agencyPurchased: boolean;
  agencyUpgraded: boolean;
  linkedInBros: number;
  buyAgency: () => void;
  buyAgencyUpgrade: () => void;
}

const DISPLAY_COST_DIFFERENCE = 500;

export default function HirePanel({
  money,
  maxMoney,
  people,
  maxPeople,
  hireDev,
  hireSeller,
  agencyUnlocked,
  agencyPurchased,
  agencyUpgraded,
  linkedInBros,
  buyAgency,
  buyAgencyUpgrade
}: HireProps) {
  const teamFull = people >= maxPeople;
  const listDevs = devs
    .filter((dev) => dev.cost - DISPLAY_COST_DIFFERENCE <= maxMoney)
    .map((dev, index) => (
      <SingleCandidate
        key={index}
        onClick={hireDev}
        candidate={dev}
        disabled={teamFull || dev.cost > money}
      />
    ));
  const listSales = sales
    .filter((seller) => seller.cost - DISPLAY_COST_DIFFERENCE <= maxMoney)
    .map((salesperson, index) => (
      <SingleCandidate
        key={index}
        onClick={hireSeller}
        candidate={salesperson}
        disabled={teamFull || salesperson.cost > money}
      />
    ));
  return (
    <div>
      <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-3">
        Development
      </h4>
      <ul className="mb-6">{listDevs}</ul>
      {listSales.length > 0 && (
        <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-3">
          Sales
        </h4>
      )}
      <ul>{listSales}</ul>
      {agencyUnlocked && (
        <div className="mt-4 rounded border border-ink-faint/30 p-3">
          <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-1">
            Marketing Agency
          </h4>
          {agencyPurchased ? (
            <>
              <p className="text-xs text-ink-muted">
                Active — auto-hires LinkedIn Bros (+50M/s) every {agencyUpgraded ? '1s' : '3s'}.
              </p>
              <p className="text-xs text-ink-faint mt-1">LinkedIn Bros: {linkedInBros}</p>
              {agencyUpgraded ? (
                <p className="text-xs text-ink-faint mt-1">Upgraded — hires every 1s.</p>
              ) : (
                <button
                  onClick={buyAgencyUpgrade}
                  disabled={money < AGENCY_UPGRADE_COST}
                  className="ghost disabled:opacity-40 disabled:cursor-not-allowed mt-2">
                  Upgrade Agency — {formatMoney(AGENCY_UPGRADE_COST)}
                </button>
              )}
            </>
          ) : (
            <>
              <p className="text-xs text-ink-muted mb-2">
                Buy once to auto-hire LinkedIn Bros (+50M/s).
              </p>
              <button
                onClick={buyAgency}
                disabled={money < AGENCY_COST}
                className="ghost disabled:opacity-40 disabled:cursor-not-allowed">
                Buy Agency — ${AGENCY_COST.toLocaleString()}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
