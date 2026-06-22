import { useState } from 'react';

const MAX_VISIBLE_SLOTS = 8;
const MAX_VISIBLE_SLOTS_MOBILE = 3;

interface PeopleProps {
  people: number;
  maxPeople: number;
  quality: number;
}

export default function People({ people, maxPeople, quality }: PeopleProps) {
  const [tipOpen, setTipOpen] = useState(false);
  const visibleCount = Math.min(maxPeople, MAX_VISIBLE_SLOTS);
  const overflow = people > MAX_VISIBLE_SLOTS ? people - MAX_VISIBLE_SLOTS : 0;
  const mobileOverflow = people > MAX_VISIBLE_SLOTS_MOBILE ? people - MAX_VISIBLE_SLOTS_MOBILE : 0;
  const full = people >= maxPeople;

  return (
    <div className="bg-card border border-line rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold uppercase tracking-widest text-ink-muted">Team</span>
        <span
          className={`font-mono text-sm ${
            full ? 'text-red-500 font-semibold animate-pulse animate-pulsing' : 'text-ink-muted'
          }`}>
          <span className={full ? '' : 'text-ink font-semibold'}>{people}</span> / {maxPeople}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: visibleCount }).map((_, i) => {
          const mobileHidden = i >= MAX_VISIBLE_SLOTS_MOBILE ? 'hidden sm:block' : '';
          return i < people ? (
            <div
              key={i}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[10px] sm:rounded-[14px] overflow-hidden ${mobileHidden}`}>
              <img
                src={`${import.meta.env.BASE_URL}team/member.gif`}
                className="w-full h-full object-contain scale-[1.4] [image-rendering:pixelated]"
                alt=""
              />
            </div>
          ) : (
            <div
              key={i}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[10px] sm:rounded-[14px] border border-dashed border-line ${mobileHidden}`}
            />
          );
        })}
        {mobileOverflow > 0 && (
          <div className="w-16 h-16 rounded-[10px] bg-card-raised border border-line flex sm:hidden items-center justify-center">
            <span className="text-xs text-ink-faint font-mono">+{mobileOverflow}</span>
          </div>
        )}
        {overflow > 0 && (
          <div className="w-20 h-20 rounded-[14px] bg-card-raised border border-line hidden sm:flex items-center justify-center">
            <span className="text-xs text-ink-faint font-mono">+{overflow}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
        <span className="group relative inline-block">
          <span
            role="button"
            tabIndex={0}
            onClick={() => setTipOpen((o) => !o)}
            className="text-sm font-semibold uppercase tracking-widest text-ink-muted cursor-help underline decoration-dotted decoration-ink-faint underline-offset-4">
            Quality
          </span>
          <span
            className={`absolute bottom-full left-0 mb-2 w-max max-w-[200px] rounded-md border border-line bg-card-raised px-2 py-1 text-xs font-normal normal-case tracking-normal text-ink-muted shadow-lg ${
              tipOpen ? 'block' : 'hidden'
            } group-hover:block`}>
            Selling price of your websites.
          </span>
        </span>
        <span className="font-mono text-sm text-ink font-semibold">{quality}%</span>
      </div>
    </div>
  );
}
