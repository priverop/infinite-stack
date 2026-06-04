import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BuyPanel from './BuyPanel';
import AchievementsPanel from './AchievementsPanel';
import HirePanel from './HirePanel';
import { HireIcon, BuyIcon, AchievementsIcon } from './icons';
import type { Achievement, HireFunction } from '../types';

interface PanelProps {
  hireDev: HireFunction;
  hireSeller: HireFunction;
  buyBuilding: HireFunction;
  achievements: {
    unlockedAchievements: Set<string>;
    recentUnlocks: Achievement[];
  };
}

export default function Panel({ hireSeller, hireDev, buyBuilding, achievements }: PanelProps) {
  return (
    <Tabs>
      <TabList className="flex flex-wrap text-gray-500 dark:text-gray-400">
        <Tab className="p-4 cursor-pointer inline-flex items-center justify-center">
          <HireIcon />
          Hire
        </Tab>
        <Tab className="p-4 cursor-pointer inline-flex items-center justify-center">
          <BuyIcon />
          Buy
        </Tab>
        <Tab className="p-4 cursor-pointer inline-flex items-center justify-center">
          <AchievementsIcon />
          Achievements
        </Tab>
      </TabList>

      <TabPanel>
        <HirePanel hireDev={hireDev} hireSeller={hireSeller} />
      </TabPanel>
      <TabPanel>
        <BuyPanel buyBuilding={buyBuilding} />
      </TabPanel>
      <TabPanel>
        <AchievementsPanel unlockedAchievements={achievements.unlockedAchievements} />
      </TabPanel>
    </Tabs>
  );
}
