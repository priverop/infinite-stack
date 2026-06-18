const MAX_VISIBLE_SLOTS = 8;

interface PeopleProps {
  people: number;
  maxPeople: number;
  quality: number;
}

export default function People({ people, maxPeople, quality }: PeopleProps) {
  const visibleCount = Math.min(maxPeople, MAX_VISIBLE_SLOTS);
  const overflow = people > MAX_VISIBLE_SLOTS ? people - MAX_VISIBLE_SLOTS : 0;
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
        {Array.from({ length: visibleCount }).map((_, i) =>
          i < people ? (
            <div key={i} className="w-20 h-20 rounded-[14px] overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}team/member.gif`}
                className="w-full h-full object-contain scale-[1.4] [image-rendering:pixelated]"
                alt=""
              />
            </div>
          ) : (
            <div key={i} className="w-20 h-20 rounded-[14px] border border-dashed border-line" />
          )
        )}
        {overflow > 0 && (
          <div className="w-20 h-20 rounded-[14px] bg-card-raised border border-line flex items-center justify-center">
            <span className="text-xs text-ink-faint font-mono">+{overflow}</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
        <span
          className="text-sm font-semibold uppercase tracking-widest text-ink-muted cursor-help underline decoration-dotted decoration-ink-faint underline-offset-4"
          title="Selling price of your websites.">
          Quality
        </span>
        <span className="font-mono text-sm text-ink font-semibold">{quality}%</span>
      </div>
    </div>
  );
}
