import { useState } from 'react';
import { formatMoney } from '../utils/format';
import type { Candidate, HireFunction } from '../types';

interface SingleCandidateProps {
  candidate: Candidate;
  onClick: HireFunction;
  disabled?: boolean;
  owned?: boolean;
  // Live price override (e.g. ramped repeatable buildings); defaults to candidate.cost
  cost?: number;
}

export default function SingleCandidate({
  candidate,
  onClick,
  disabled,
  owned,
  cost = candidate.cost
}: SingleCandidateProps) {
  const [animation, setAnimation] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setAnimation(true);
    onClick(candidate.id, cost, candidate.increment);
  };

  return (
    <div
      className={`flex items-center justify-between py-3 px-3 rounded-xl transition-colors duration-150 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-card-raised cursor-pointer'
      } ${animation ? 'animate-squeeze animate-duration-[200ms]' : ''}`}
      onClick={handleClick}
      onAnimationEnd={() => setAnimation(false)}>
      <div className="flex items-center gap-4">
        <img src={candidate.image} className="h-12 w-12 rounded-[10px] object-cover" alt="" />
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-ink">{candidate.title}</h3>
          <p className="text-ink-muted text-xs mt-0.5">{candidate.description}</p>
        </div>
      </div>
      <div className="bg-card-raised border border-line px-4 py-1.5 rounded-full shrink-0 ml-4">
        {owned ? (
          <span className="font-mono text-sm text-emerald-500">✓ Owned</span>
        ) : (
          <span className="font-mono text-sm text-ink">{formatMoney(cost)}</span>
        )}
      </div>
    </div>
  );
}
