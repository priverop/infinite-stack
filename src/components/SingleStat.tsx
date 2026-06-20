import '../styles/Stats.css';

interface SingleStatProps {
  number: number | string;
  text: string;
  trend?: 'up' | 'down' | 'flat';
}

export default function SingleStat({ number, text, trend }: SingleStatProps) {
  return (
    <div className="bg-card border border-line rounded-xl p-4">
      <p className="font-mono text-2xl font-semibold text-ink flex items-center gap-1">
        {number}
        {trend === 'up' && (
          <span className="text-green-500 text-base opacity-50" title="Creating more than selling">
            ▲
          </span>
        )}
        {trend === 'down' && (
          <span className="text-red-500 text-base opacity-50" title="Selling more than creating">
            ▼
          </span>
        )}
      </p>
      <p className="text-sm text-ink-muted mt-1">{text}</p>
    </div>
  );
}
