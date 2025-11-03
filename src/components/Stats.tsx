import '../styles/Stats.css';
import SingleStat from './SingleStat';
import type { GameStats } from '../types';

type StatsProps = Omit<GameStats, 'people' | 'maxPeople'>;

export default function Stats({ money, websites, moneyPerSecond, websitesPerSecond }: StatsProps) {
  return (
    <div className="wrapper">
      <SingleStat number={websites} text="Websites created" />
      <SingleStat number={`$${money}`} text="Money earned" />
      <SingleStat number={websitesPerSecond} text="Websites/sec" />
      <SingleStat number={`$${moneyPerSecond}`} text="Money/sec" />
    </div>
  );
}
