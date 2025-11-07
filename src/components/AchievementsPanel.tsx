import { achievements } from '../data/achievements';
import type { Achievement } from '../types';

interface AchievementsPanelProps {
  unlockedAchievements: Set<string>;
}

/*
  ToDo: Add visible / hidden achievements -> guide / challenges
*/

export default function AchievementsPanel({ unlockedAchievements }: AchievementsPanelProps) {
  const progress = Math.round((unlockedAchievements.size / achievements.length) * 100);
  const achievementsList = achievements
    .filter((achievement) => unlockedAchievements.has(achievement.id))
    .map((achievement: Achievement) => {
      return (
        <li>
          {achievement.icon} {achievement.title}: {achievement.description}{' '}
          {<span className="text-green-400 text-sm">✓ Unlocked</span>}
        </li>
      );
    });

  return (
    <div className="text-left p-4">
      <ul>{achievementsList}</ul>
      <p className="italic mt-3">{progress}% Unlocked</p>
    </div>
  );
}
