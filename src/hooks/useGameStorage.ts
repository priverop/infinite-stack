import { useCallback, useEffect, useRef } from 'react';
import type { GameStats } from '../types';

const SAVE_PREFIX = 'save-';

export default function useGameStorage(gameState: GameStats) {
  const storageKey = 'game-state';
  const gameStateRef = useRef(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  function removeStorage(): void {
    localStorage.removeItem(storageKey);
    localStorage.removeItem('unlocked-achievements');
  }

  const load = useCallback(async () => {
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
  }, []);

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

  function saveCheckpoint(name: string): void {
    try {
      localStorage.setItem(SAVE_PREFIX + name, JSON.stringify(gameStateRef.current));
    } catch (error) {
      console.error('Error saving checkpoint:', error);
    }
  }

  function listCheckpoints(): string[] {
    const names: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(SAVE_PREFIX)) {
        names.push(key.slice(SAVE_PREFIX.length));
      }
    }
    return names.sort();
  }

  function loadCheckpoint(name: string): GameStats | null {
    try {
      const result = localStorage.getItem(SAVE_PREFIX + name);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      console.error('Error loading checkpoint:', error);
      return null;
    }
  }

  function deleteCheckpoint(name: string): void {
    localStorage.removeItem(SAVE_PREFIX + name);
  }

  return { removeStorage, load, saveCheckpoint, listCheckpoints, loadCheckpoint, deleteCheckpoint };
}
