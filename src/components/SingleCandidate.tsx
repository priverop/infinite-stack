import { formatMoney } from '../utils/format';
import type { Candidate, HireFunction } from '../types';

interface SingleCandidateProps {
  candidate: Candidate;
  onClick: HireFunction;
}

export default function SingleCandidate({ candidate, onClick }: SingleCandidateProps) {
  return (
    <div
      className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-card-raised cursor-pointer transition-colors duration-150"
      onClick={() => onClick(candidate.id, candidate.cost, candidate.increment)}>
      <div className="flex items-center gap-4">
        <img src={candidate.image} className="h-12 w-12 rounded-[10px] object-cover" alt="" />
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-ink">{candidate.title}</h3>
          <p className="text-ink-muted text-xs mt-0.5">{candidate.description}</p>
        </div>
      </div>
      <div className="bg-card-raised border border-line px-4 py-1.5 rounded-full shrink-0 ml-4">
        <span className="font-mono text-sm text-ink">{formatMoney(candidate.cost)}</span>
      </div>
    </div>
  );
}
