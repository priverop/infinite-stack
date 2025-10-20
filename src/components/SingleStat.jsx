import '../styles/Stats.css';

export default function SingleStat({ number, text }) {
  return (
    <div className="border border-indigo-500 p-3 rounded-md">
      <p className="text-xl font-bold text-white">{number}</p>
      <p className="mt-1">{text}</p>
    </div>
  );
}
