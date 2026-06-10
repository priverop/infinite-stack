import '../styles/Stats.css';
import SingleStat from './SingleStat';
import { formatNumber, formatMoney } from '../utils/format';
import type { GameStats } from '../types';

// TODO: hacerlo al revés. En vez de Omit, Include o algo asi
type StatsProps = Omit<
  GameStats,
  'people' | 'maxPeople' | 'totalClicks' | 'websitesCreated' | 'websitesSold' | 'staff'
>;

export default function Stats({
  money,
  websites,
  sellsPerSecond,
  quality,
  websitesPerSecond
}: StatsProps) {
  return (
    <div className="wrapper">
      <SingleStat number={formatNumber(websites)} text="Websites" />
      <SingleStat number={formatMoney(money)} text="Money" />
      <SingleStat number={formatNumber(websitesPerSecond)} text="Sites/sec" />
      <SingleStat number={formatMoney(sellsPerSecond * quality)} text="$/sec" />
    </div>
  );
}
