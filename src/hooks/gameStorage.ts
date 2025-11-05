import { useEffect, useRef } from 'react';
import type { GameStats } from '../types';

export default function useGameStorage(gameState: GameStats) {
  const storageKey = 'game-state';
  const gameStateRef = useRef(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const load = async () => {
    try {
      const result = localStorage.getItem(storageKey);
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
        localStorage.setItem(storageKey, JSON.stringify(gameStateRef.current));
        console.log('Saved progress at', new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Error saving your progress:', error);
      }
    };
    const interval = setInterval(save, 10000);

    return () => clearInterval(interval);
  }, []);

  return { load };
}
