import '../styles/Stats.css';
import SingleStat from './SingleStat';
import { formatNumber, formatMoney } from '../utils/format';
import type { GameStats } from '../types';

type StatsProps = Pick<
  GameStats,
  'money' | 'websites' | 'sellsPerSecond' | 'quality' | 'websitesPerSecond'
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
      <SingleStat number={formatNumber(websitesPerSecond)} text="Sites/s" />
      <SingleStat number={formatMoney(sellsPerSecond * quality)} text="$/s" />
    </div>
  );
}
