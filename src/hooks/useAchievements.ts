// src/hooks/useAchievements.ts
import { useState, useEffect, useCallback } from 'react';
import { achievements } from '../data/achievements';
import type { GameStats, Achievement, CandidateCategory } from '../types';
import { byCategory, sumCategory } from '../data/catalog';

export function useAchievements(gameState: GameStats) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [recentUnlocks, setRecentUnlocks] = useState<Achievement[]>([]);

  // Dev Note: This could be in useGameStorage - but I'd rather have all the achievement logic here
  // Load unlocked achievements from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem('unlocked-achievements');
    if (savedAchievements) {
      setUnlockedAchievements(new Set(JSON.parse(savedAchievements)));
    }
  }, []);

  // Save unlocked achievements to localStorage
  useEffect(() => {
    localStorage.setItem('unlocked-achievements', JSON.stringify([...unlockedAchievements]));
  }, [unlockedAchievements]);

  // Functions
  const checkThreshold = useCallback((achievement: Achievement, state: GameStats): boolean => {
    if (!achievement.stat || !achievement.target) return false; // nullable values
    const currentValue = state[achievement.stat];
    if (typeof currentValue !== 'number') return false; // staff is a Record, not a threshold stat
    return currentValue >= achievement.target;
  }, []);

  const checkFirstPurchase = useCallback((achievement: Achievement, state: GameStats): boolean => {
    if (!achievement.purchaseType) return false;
    return sumCategory(state.staff, achievement.purchaseType) > 0;
  }, []);

  const checkCollection = useCallback((achievement: Achievement, state: GameStats): boolean => {
    if (!achievement.collectionType) return false;

    const categories: CandidateCategory[] =
      achievement.collectionType === 'staff' ? ['dev', 'seller'] : [achievement.collectionType];

    return categories.every((category) =>
      byCategory(category).every((candidate) => (state.staff[candidate.id] ?? 0) > 0)
    );
  }, []);

  const checkStaffCount = useCallback((achievement: Achievement, state: GameStats): boolean => {
    if (!achievement.staffIds || !achievement.target) return false;

    return (
      achievement.staffIds.reduce((accum, current) => accum + (state.staff[current] ?? 0), 0) >=
      achievement.target
    );
  }, []);

  const checkAchievements = useCallback(() => {
    const newUnlocks: Achievement[] = [];

    achievements.forEach((achievement: Achievement) => {
      if (unlockedAchievements.has(achievement.id)) return;

      let isUnlocked = false;

      switch (achievement.type) {
        case 'threshold':
          isUnlocked = checkThreshold(achievement, gameState);
          break;
        case 'firstPurchase':
          isUnlocked = checkFirstPurchase(achievement, gameState);
          break;
        case 'collection':
          isUnlocked = checkCollection(achievement, gameState);
          break;
        case 'staffCount':
          isUnlocked = checkStaffCount(achievement, gameState);
          break;
      }

      if (isUnlocked) {
        newUnlocks.push(achievement);
        setUnlockedAchievements((prev) => new Set(prev).add(achievement.id));
      }
    });

    if (newUnlocks.length > 0) {
      setRecentUnlocks(newUnlocks);

      // Clear recent unlocks after 5 seconds
      setTimeout(() => {
        setRecentUnlocks([]);
      }, 5000);
    }
  }, [gameState, unlockedAchievements, checkThreshold]); // , checkFirstPurchase, checkCollection

  // Check achievements whenever game state changes
  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  function removeAchievements(): void {
    setUnlockedAchievements(new Set());
    setRecentUnlocks([]);
  }

  return {
    removeAchievements,
    unlockedAchievements,
    recentUnlocks // for notifications
  };
}
