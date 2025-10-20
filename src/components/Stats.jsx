import '../styles/Stats.css';
import SingleStat from './SingleStat';

export default function Stats({ money, websites }) {
  return (
    <div className="wrapper">
      <SingleStat number={websites} text="Websites created" />
      <SingleStat number={`$${money}`} text="Money earned" />
      <SingleStat number="50" text="Websites/sec" />
      <SingleStat number="$50" text="Money/sec" />
    </div>
  );
}
