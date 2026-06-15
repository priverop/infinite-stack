import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BuyPanel from './BuyPanel';
import AchievementsPanel from './AchievementsPanel';
import HirePanel from './HirePanel';
import { HireIcon, BuyIcon, AchievementsIcon } from './icons';
import type { Achievement, HireFunction } from '../types';

interface PanelProps {
  money: number;
  hireDev: HireFunction;
  hireSeller: HireFunction;
  buyBuilding: HireFunction;
  achievements: {
    unlockedAchievements: Set<string>;
    recentUnlocks: Achievement[];
  };
  agencyUnlocked: boolean;
  agencyPurchased: boolean;
  linkedInBros: number;
  buyAgency: () => void;
}

export default function Panel({
  money,
  hireSeller,
  hireDev,
  buyBuilding,
  achievements,
  agencyUnlocked,
  agencyPurchased,
  linkedInBros,
  buyAgency
}: PanelProps) {
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
        <HirePanel
          money={money}
          hireDev={hireDev}
          hireSeller={hireSeller}
          agencyUnlocked={agencyUnlocked}
          agencyPurchased={agencyPurchased}
          linkedInBros={linkedInBros}
          buyAgency={buyAgency}
        />
      </TabPanel>
      <TabPanel>
        <BuyPanel money={money} buyBuilding={buyBuilding} />
      </TabPanel>
      <TabPanel>
        <AchievementsPanel unlockedAchievements={achievements.unlockedAchievements} />
      </TabPanel>
    </Tabs>
  );
}
