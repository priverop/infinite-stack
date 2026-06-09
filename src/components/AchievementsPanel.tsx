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
    .map((achievement: Achievement) => (
      <li
        key={achievement.id}
        className="flex items-start gap-3 p-3 rounded-xl border border-line bg-card">
        <span className="text-xl leading-none mt-0.5">{achievement.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-ink">{achievement.title}</p>
          <p className="text-xs text-ink-muted mt-0.5">{achievement.description}</p>
        </div>
        <span className="text-win text-xs font-semibold shrink-0 mt-0.5">✓</span>
      </li>
    ));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
          {unlockedAchievements.size} / {achievements.length} unlocked
        </span>
        <span className="font-mono text-xs text-ink-muted">{progress}%</span>
      </div>
      <ul className="flex flex-col gap-2">{achievementsList}</ul>
    </div>
  );
}
