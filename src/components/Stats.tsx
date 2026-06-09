import '../styles/Stats.css';
import SingleStat from './SingleStat';
import type { GameStats } from '../types';

// TODO: hacerlo al revés. En vez de Omit, Include o algo asi
type StatsProps = Omit<
  GameStats,
  'people' | 'maxPeople' | 'totalClicks' | 'websitesCreated' | 'websitesSold' | 'staff'
>;

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
