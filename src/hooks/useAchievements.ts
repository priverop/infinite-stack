// src/hooks/useAchievements.ts
import { useState, useEffect, useCallback } from 'react';
import { achievements } from '../data/achievements';
import type { GameStats, Achievement } from '../types';

export function useAchievements(gameState: GameStats) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [recentUnlocks, setRecentUnlocks] = useState<Achievement[]>([]);

  // ToDo: No deberíamos meter esto en el LoadGame normal?
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
    return currentValue >= achievement.target;
  }, []);

  // const checkFirstPurchase = useCallback((achievement: Achievement, state: GameStats): boolean => {
  //   if (!achievement.purchaseType) return false;

  //   switch (achievement.purchaseType) {
  //     case 'dev':
  //       return state.juniorDevs > 0 || state.midDevs > 0 || state.seniorDevs > 0;
  //     case 'seller':
  //       return state.traineeSales > 0 || state.seniorSales > 0 || state.b2bSales > 0;
  //     case 'building':
  //       return state.coworkingSingle > 0 || state.coworkingPrivate > 0 || state.smallOffice > 0;
  //     default:
  //       return false;
  //   }
  // }, []);

  // const checkCollection = useCallback((achievement: Achievement, state: GameStats): boolean => {
  //   if (!achievement.collectionType) return false;

  //   switch (achievement.collectionType) {
  //     case 'buildings':
  //       return state.coworkingSingle > 0 && state.coworkingPrivate > 0 && state.smallOffice > 0;
  //     case 'devs':
  //       return (
  //         state.juniorDevs > 0 &&
  //         state.midDevs > 0 &&
  //         state.seniorDevs > 0 &&
  //         state.traineeSales > 0 &&
  //         state.seniorSales > 0 &&
  //         state.b2bSales > 0
  //       );
  //     default:
  //       return false;
  //   }
  // }, []);

  const checkAchievements = useCallback(() => {
    const newUnlocks: Achievement[] = [];

    achievements.forEach((achievement: Achievement) => {
      if (unlockedAchievements.has(achievement.id)) return;

      let isUnlocked = false;

      switch (achievement.type) {
        case 'threshold':
          isUnlocked = checkThreshold(achievement, gameState);
          break;
        // case 'firstPurchase':
        //   isUnlocked = checkFirstPurchase(achievement, gameState);
        //   break;
        // case 'collection':
        //   isUnlocked = checkCollection(achievement, gameState);
        //   break;
      }

      if (isUnlocked) {
        newUnlocks.push(achievement);
        setUnlockedAchievements((prev) => new Set(prev).add(achievement.id));
      }
    });

    // ToDo: meterlo en el if de arriba y nos quitamos ese array?
    if (newUnlocks.length > 0) {
      setRecentUnlocks(newUnlocks);

      // Clear recent unlocks after 5 seconds
      setTimeout(() => {
        setRecentUnlocks([]);
      }, 5000);
    }

    // ToDo: Por qué se meten aquí estas funciones?
  }, [gameState, unlockedAchievements, checkThreshold]); // , checkFirstPurchase, checkCollection

  // Check achievements whenever game state changes
  useEffect(() => {
    checkAchievements();
  }, [checkAchievements]);

  return {
    unlockedAchievements,
    recentUnlocks // for notifications
  };
}
