import { useEffect } from 'react';
import type { GameStats } from '../types';

export default function useGameStorage(gameState: GameStats) {
  const storageKey = 'game-state';

  const load = async () => {
    try {
      const result = await localStorage.getItem(storageKey);
      if (result) {
        console.log('Loaded progress');
        return JSON.parse(result);
      }
      return null;
    } catch (error) {
      console.log('Error loading your progress:', error);
      return null;
    }
  };

  useEffect(() => {
    const save = async () => {
      try {
        await localStorage.setItem(storageKey, JSON.stringify(gameState));
      } catch (error) {
        console.error('Error saving your progress:', error);
      }
    };
    const interval = setInterval(save, 10000);

    return () => clearInterval(interval);
  }, [gameState]); // Se ejecuta cuando cambia el gameState

  return { load };
}
