import '../styles/Stats.css';

interface SingleStatProps {
  number: number | string;
  text: string;
}

export default function SingleStat({ number, text }: SingleStatProps) {
  return (
    <div className="bg-card border border-line rounded-xl p-4">
      <p className="font-mono text-2xl font-semibold text-ink">{number}</p>
      <p className="text-sm text-ink-muted mt-1">{text}</p>
    </div>
  );
}
