import type { Achievement } from '../types';

export function AchievementToast({ achievement }: { achievement: Achievement }) {
  return (
    <div className="achievement-toast">
      <span className="text-2xl leading-none">{achievement.icon}</span>
      <div className="flex flex-col">
        <strong className="text-xs uppercase tracking-widest text-teal">Achievement unlocked</strong>
        <span className="font-mono text-sm text-ink mt-0.5">{achievement.title}</span>
      </div>
    </div>
  );
}
