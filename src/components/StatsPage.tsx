import { useState } from 'react';
import { byCategory } from '../data/catalog';
import { formatMoney, formatNumber, formatTime } from '../utils/format';

interface StatsPageProps {
  onBack: () => void;
}

const devs = byCategory('dev');
const sellers = byCategory('seller');
const buildings = byCategory('building');

const defaultQuality = Math.max(...devs.map((d) => d.quality ?? 0));

function ratio(n: number): string {
  if (!isFinite(n)) return '—';
  if (n < 1000) return `×${parseFloat(n.toFixed(2))}`;
  return `×${formatNumber(n)}`;
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-left font-semibold whitespace-nowrap">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2 whitespace-nowrap">{children}</td>;
}

export default function StatsPage({ onBack }: StatsPageProps) {
  const [quality, setQuality] = useState(defaultQuality);

  return (
    <div className="flex w-full flex-col gap-8 text-ink-muted">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Catalog stats &amp; ratios</h1>
        <button
          type="button"
          onClick={onBack}
          style={{ width: 'auto' }}
          className="ghost whitespace-nowrap">
          ← Back to game
        </button>
      </div>

      {/* Devs */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Developers</h2>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-sm">
            <thead className="bg-card text-ink-faint">
              <tr>
                <Th>Title</Th>
                <Th>Cost</Th>
                <Th>Inc (web/s)</Th>
                <Th>Quality</Th>
                <Th>$/web·s</Th>
                <Th>Revenue/s</Th>
                <Th>Payback</Th>
                <Th>×Cost</Th>
                <Th>×Inc</Th>
                <Th>×Eff</Th>
              </tr>
            </thead>
            <tbody>
              {devs.map((d, i) => {
                const prev = devs[i - 1];
                const q = d.quality ?? 0;
                const revenue = d.increment * q;
                const costPerInc = d.cost / d.increment;
                const prevCostPerInc = prev ? prev.cost / prev.increment : null;
                return (
                  <tr key={d.id} className="border-t border-line">
                    <Td>{d.title}</Td>
                    <Td>{formatMoney(d.cost)}</Td>
                    <Td>{formatNumber(d.increment)}</Td>
                    <Td>{q}</Td>
                    <Td>{formatMoney(costPerInc)}</Td>
                    <Td>{formatMoney(revenue)}</Td>
                    <Td>{formatTime(d.cost / revenue)}</Td>
                    <Td>{prev ? ratio(d.cost / prev.cost) : '—'}</Td>
                    <Td>{prev ? ratio(d.increment / prev.increment) : '—'}</Td>
                    <Td>{prevCostPerInc ? ratio(costPerInc / prevCostPerInc) : '—'}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sellers */}
      <section>
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Sellers</h2>
          <label className="flex items-center gap-2 text-sm">
            Quality (revenue per sell):
            <input
              type="number"
              min={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value) || 0)}
              style={{ width: '5rem' }}
              className="rounded border border-line bg-card px-2 py-1"
            />
          </label>
        </div>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-sm">
            <thead className="bg-card text-ink-faint">
              <tr>
                <Th>Title</Th>
                <Th>Cost</Th>
                <Th>Inc (sells/s)</Th>
                <Th>$/sell·s</Th>
                <Th>Revenue/s</Th>
                <Th>Payback</Th>
                <Th>×Cost</Th>
                <Th>×Inc</Th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((s, i) => {
                const prev = sellers[i - 1];
                const revenue = s.increment * quality;
                return (
                  <tr key={s.id} className="border-t border-line">
                    <Td>
                      {s.title}
                      {s.hidden && <span className="ml-1 text-ink-faint italic">(hidden)</span>}
                    </Td>
                    <Td>{formatMoney(s.cost)}</Td>
                    <Td>{formatNumber(s.increment)}</Td>
                    <Td>{formatMoney(s.cost / s.increment)}</Td>
                    <Td>{formatMoney(revenue)}</Td>
                    <Td>{formatTime(s.cost / revenue)}</Td>
                    <Td>{prev ? ratio(s.cost / prev.cost) : '—'}</Td>
                    <Td>{prev ? ratio(s.increment / prev.increment) : '—'}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Buildings */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">Buildings</h2>
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-sm">
            <thead className="bg-card text-ink-faint">
              <tr>
                <Th>Title</Th>
                <Th>Cost</Th>
                <Th>Inc (seats)</Th>
                <Th>$/seat</Th>
                <Th>×Cost</Th>
                <Th>×Inc</Th>
                <Th>Repeatable</Th>
              </tr>
            </thead>
            <tbody>
              {buildings.map((b, i) => {
                const prev = buildings[i - 1];
                return (
                  <tr key={b.id} className="border-t border-line">
                    <Td>{b.title}</Td>
                    <Td>{formatMoney(b.cost)}</Td>
                    <Td>{formatNumber(b.increment)}</Td>
                    <Td>{formatMoney(b.cost / b.increment)}</Td>
                    <Td>{prev ? ratio(b.cost / prev.cost) : '—'}</Td>
                    <Td>{prev ? ratio(b.increment / prev.increment) : '—'}</Td>
                    <Td>{b.repeatable ? 'yes' : '—'}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
