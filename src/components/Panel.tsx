import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BuyPanel from './BuyPanel';
import AchievementsPanel from './AchievementsPanel';
import HirePanel from './HirePanel';
import { HireIcon, BuyIcon, AchievementsIcon } from './icons';
import type { Achievement, HireFunction } from '../types';

interface PanelProps {
  money: number;
  people: number;
  maxPeople: number;
  staff: Record<string, number>;
  hireDev: HireFunction;
  hireSeller: HireFunction;
  buyBuilding: HireFunction;
  achievements: {
    unlockedAchievements: Set<string>;
    recentUnlocks: Achievement[];
  };
  agencyUnlocked: boolean;
  agencyPurchased: boolean;
  agencyUpgraded: boolean;
  linkedInBros: number;
  buyAgency: () => void;
  buyAgencyUpgrade: () => void;
  pyramidUnlocked: boolean;
  pyramidPurchased: boolean;
  buyPyramidScheme: () => void;
  flipUnlocked: boolean;
  flipPurchased: boolean;
  buyFlip: () => void;
  agiAchieved: boolean;
  agiElapsedMs: number;
}

export default function Panel({
  money,
  people,
  maxPeople,
  staff,
  hireSeller,
  hireDev,
  buyBuilding,
  achievements,
  agencyUnlocked,
  agencyPurchased,
  agencyUpgraded,
  linkedInBros,
  buyAgency,
  buyAgencyUpgrade,
  pyramidUnlocked,
  pyramidPurchased,
  buyPyramidScheme,
  flipUnlocked,
  flipPurchased,
  buyFlip,
  agiAchieved,
  agiElapsedMs
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
          people={people}
          maxPeople={maxPeople}
          staff={staff}
          hireDev={hireDev}
          hireSeller={hireSeller}
          agencyUnlocked={agencyUnlocked}
          agencyPurchased={agencyPurchased}
          agencyUpgraded={agencyUpgraded}
          linkedInBros={linkedInBros}
          buyAgency={buyAgency}
          buyAgencyUpgrade={buyAgencyUpgrade}
          pyramidUnlocked={pyramidUnlocked}
          pyramidPurchased={pyramidPurchased}
          buyPyramidScheme={buyPyramidScheme}
          flipUnlocked={flipUnlocked}
          flipPurchased={flipPurchased}
          buyFlip={buyFlip}
          agiAchieved={agiAchieved}
          agiElapsedMs={agiElapsedMs}
        />
      </TabPanel>
      <TabPanel>
        <BuyPanel
          money={money}
          staff={staff}
          buyBuilding={buyBuilding}
          agiAchieved={agiAchieved}
          agiElapsedMs={agiElapsedMs}
        />
      </TabPanel>
      <TabPanel>
        <AchievementsPanel
          unlockedAchievements={achievements.unlockedAchievements}
          agiAchieved={agiAchieved}
        />
      </TabPanel>
    </Tabs>
  );
}
