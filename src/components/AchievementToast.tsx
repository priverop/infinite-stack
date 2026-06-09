import type { Achievement } from '../types';

export function AchievementToast({ achievement }: { achievement: Achievement }) {
  return (
    <div className="flex flex-col">
      <strong>Achievement unlocked!</strong>
      <span>
        {achievement.icon} {achievement.title}
      </span>
    </div>
  );
}
