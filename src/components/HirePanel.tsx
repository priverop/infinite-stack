import SingleCandidate from './SingleCandidate';
import type { HireFunction } from '../types';
import { byCategory, visibleTier } from '../data/catalog';
import { AGENCY_COST, AGENCY_UPGRADE_COST, FLIP_COST } from '../hooks/useGameLogic';
import { formatMoney, formatDuration } from '../utils/format';

const devs = byCategory('dev');
// Hidden sellers (e.g. the agency-only LinkedIn Bro) never get a manual hire button
const sales = byCategory('seller').filter((seller) => !seller.hidden);

interface HireProps {
  money: number;
  people: number;
  maxPeople: number;
  staff: Record<string, number>;
  hireDev: HireFunction;
  hireSeller: HireFunction;
  agencyUnlocked: boolean;
  agencyPurchased: boolean;
  agencyUpgraded: boolean;
  linkedInBros: number;
  buyAgency: () => void;
  buyAgencyUpgrade: () => void;
  flipUnlocked: boolean;
  flipPurchased: boolean;
  buyFlip: () => void;
  agiAchieved: boolean;
  agiElapsedMs: number;
}

export default function HirePanel({
  money,
  people,
  maxPeople,
  staff,
  hireDev,
  hireSeller,
  agencyUnlocked,
  agencyPurchased,
  agencyUpgraded,
  linkedInBros,
  buyAgency,
  buyAgencyUpgrade,
  flipUnlocked,
  flipPurchased,
  buyFlip,
  agiAchieved,
  agiElapsedMs
}: HireProps) {
  if (agiAchieved) {
    return (
      <div className="rounded border border-ink-faint/30 p-6 text-center">
        <h4 className="text-ink font-semibold uppercase tracking-widest mb-2">
          AGI Achieved: no more working
        </h4>
        <p className="text-sm text-ink-muted">
          Time to AGI:{' '}
          <span className="text-ink font-semibold">{formatDuration(agiElapsedMs)}</span>
        </p>
      </div>
    );
  }
  const teamFull = people >= maxPeople;
  const listDevs = visibleTier(devs, staff).map((dev, index) => (
    <SingleCandidate
      key={index}
      onClick={hireDev}
      candidate={dev}
      disabled={teamFull || dev.cost > money}
    />
  ));
  const listSales = visibleTier(sales, staff).map((salesperson, index) => (
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
                Active: auto-hires LinkedIn Bros ($10M each, sells +5M/s) every{' '}
                {agencyUpgraded ? '0.5s' : '3s'}.
              </p>
              <p className="text-xs text-ink-faint mt-1">LinkedIn Bros: {linkedInBros}</p>
              {agencyUpgraded ? (
                <p className="text-xs text-ink-faint mt-1">Upgraded: hires every 0.5s.</p>
              ) : (
                <button
                  onClick={buyAgencyUpgrade}
                  disabled={money < AGENCY_UPGRADE_COST}
                  className="ghost disabled:opacity-40 disabled:cursor-not-allowed mt-2">
                  Upgrade Agency: {formatMoney(AGENCY_UPGRADE_COST)}
                </button>
              )}
            </>
          ) : (
            <>
              <p className="text-xs text-ink-muted mb-2">
                Buy once to auto-hire LinkedIn Bros (+5M/s).
              </p>
              <button
                onClick={buyAgency}
                disabled={money < AGENCY_COST}
                className="ghost disabled:opacity-40 disabled:cursor-not-allowed">
                Buy Agency: ${AGENCY_COST.toLocaleString()}
              </button>
            </>
          )}
        </div>
      )}
      {flipUnlocked && (
        <div className="mt-4 rounded border border-ink-faint/30 p-3">
          <h4 className="text-ink-muted text-xs font-semibold uppercase tracking-widest mb-1">
            IPO
          </h4>
          {flipPurchased ? (
            <p className="text-xs text-ink-muted">
              Active: each manual Sell now nets 1% of your money.
            </p>
          ) : (
            <>
              <p className="text-xs text-ink-muted mb-2">
                Buy once: every manual Sell pays 1% of your money instead of quality.
              </p>
              <button
                onClick={buyFlip}
                disabled={money < FLIP_COST}
                className="ghost disabled:opacity-40 disabled:cursor-not-allowed">
                Buy IPO: {formatMoney(FLIP_COST)}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
