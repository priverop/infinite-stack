const PORTRAIT_IDS = [1, 64, 91, 177, 180, 338, 433, 48, 20, 378];
const MAX_VISIBLE_SLOTS = 12;

interface PeopleProps {
  people: number;
  maxPeople: number;
}

export default function People({ people, maxPeople }: PeopleProps) {
  const visibleCount = Math.min(maxPeople, MAX_VISIBLE_SLOTS);
  const overflow = maxPeople > MAX_VISIBLE_SLOTS ? maxPeople - MAX_VISIBLE_SLOTS : 0;

  return (
    <div className="bg-card border border-line rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold uppercase tracking-widest text-ink-muted">Team</span>
        <span className="font-mono text-sm text-ink-muted">
          <span className="text-ink font-semibold">{people}</span> / {maxPeople}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: visibleCount }).map((_, i) =>
          i < people ? (
            <img
              key={i}
              src={`https://picsum.photos/id/${PORTRAIT_IDS[i % PORTRAIT_IDS.length]}/56?grayscale`}
              className="w-14 h-14 rounded-[14px] object-cover"
              alt=""
            />
          ) : (
            <div key={i} className="w-14 h-14 rounded-[14px] border border-dashed border-line" />
          )
        )}
        {overflow > 0 && (
          <div className="w-14 h-14 rounded-[14px] bg-card-raised border border-line flex items-center justify-center">
            <span className="text-xs text-ink-faint font-mono">+{overflow}</span>
          </div>
        )}
      </div>
    </div>
  );
}
