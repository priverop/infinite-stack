// src/hooks/useGameLogic.ts
import { useState, useEffect } from 'react';
import type { HireFunction, GameStats } from '../types';
import { catalog } from '../data/catalog';
import useGameStorage from './useGameStorage';
import { useAchievements } from './useAchievements';

export function useGameLogic() {
  const [websites, setWebsites] = useState(0);
  const [money, setMoney] = useState(0);
  const [websitesPerSecond, setWebsitesPerSecond] = useState(0);
  const [sellsPerSecond, setSellsPerSecond] = useState(0);
  const [people, setPeople] = useState(0);
  const [maxPeople, setMaxPeople] = useState(10);
  const [quality, setQuality] = useState(20);

  // Achievements
  const [totalClicks, setTotalClicks] = useState(0);
  const [websitesCreated, setWebsitesCreated] = useState(0);
  const [websitesSold, setWebsitesSold] = useState(0);
  const [staff, setStaff] = useState<Record<string, number>>({});

  const gameState: GameStats = {
    money,
    websites,
    websitesPerSecond,
    sellsPerSecond,
    quality,
    people,
    maxPeople,
    totalClicks,
    websitesCreated,
    websitesSold,
    staff
  };

  const achievements = useAchievements(gameState); // Object with unlocked and recent

  // Core functions

  function createWebsite(): void {
    setWebsites(websites + 1);
    // Achivements
    setTotalClicks(totalClicks + 1);
    setWebsitesCreated(websitesCreated + 1);
  }

  function sellWebsite(): void {
    if (websites > 0) {
      setWebsites(websites - 1);
      setMoney(money + quality);
      // Achivements
      setTotalClicks(totalClicks + 1);
      setWebsitesSold(websitesSold + 1);
    }
  }

  const hireDev: HireFunction = (id, cost, increment) => {
    if (money >= cost && people < maxPeople) {
      setMoney(money - cost);
      setWebsitesPerSecond(websitesPerSecond + increment);
      setPeople(people + 1);
      setStaff((prev) => ({
        ...prev,
        [id]: (prev[id] ?? 0) + 1
      }));
      // Quality is set by the best dev tier ever hired; it never goes down
      const tierQuality = catalog.find((c) => c.id === id)?.quality;
      if (tierQuality !== undefined && tierQuality > quality) {
        setQuality(tierQuality);
      }
    }
  };

  const hireSeller: HireFunction = (id, cost, increment) => {
    if (money >= cost && people < maxPeople) {
      setMoney(money - cost);
      setSellsPerSecond(sellsPerSecond + increment);
      setPeople(people + 1);
      setStaff((prev) => ({
        ...prev,
        [id]: (prev[id] ?? 0) + 1
      }));
    }
  };

  const buyBuilding: HireFunction = (id, cost, increment) => {
    if (money >= cost) {
      setMoney(money - cost);
      setMaxPeople(maxPeople + increment);
      setStaff((prev) => ({
        ...prev,
        [id]: (prev[id] ?? 0) + 1
      }));
    }
  };

  function removeState(): void {
    setWebsites(0);
    setMoney(0);
    setSellsPerSecond(0);
    setWebsitesPerSecond(0);
    setQuality(20);
    setPeople(0);
    setMaxPeople(10);
    setTotalClicks(0);
    setWebsitesCreated(0);
    setWebsitesSold(0);
    setStaff({});
    achievements.removeAchievements();
  }

  const { load, removeStorage } = useGameStorage(gameState);

  useEffect(() => {
    const init = async () => {
      const savedData = await load();
      if (savedData) {
        setWebsites(savedData.websites);
        setMoney(savedData.money);
        setSellsPerSecond(savedData.sellsPerSecond ?? 0);
        setQuality(savedData.quality ?? 20);
        setWebsitesPerSecond(savedData.websitesPerSecond);
        setPeople(savedData.people);
        setMaxPeople(savedData.maxPeople);
        setTotalClicks(savedData.totalClicks);
        setWebsitesCreated(savedData.websitesCreated);
        setWebsitesSold(savedData.websitesSold);
        setStaff(savedData.staff ?? {});
      }
    };
    init();
  }, [load]);

  // ToDo: Alert if sellsPerSecond is not viable
  useEffect(() => {
    const intervalo = setInterval(() => {
      setWebsites((prevWebsites) => {
        const newWebsites = prevWebsites + websitesPerSecond;

        // We need to update the money here to get the actual updated newWebsites value
        // This happens because in the same second we need to update two values
        if (sellsPerSecond > 0 && sellsPerSecond <= newWebsites) {
          setMoney((prevMoney) => prevMoney + sellsPerSecond * quality);
          return newWebsites - sellsPerSecond;
        }

        return newWebsites;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [websitesPerSecond, sellsPerSecond, quality]);

  return {
    websites,
    money,
    websitesPerSecond,
    sellsPerSecond,
    quality,
    people,
    maxPeople,

    createWebsite,
    sellWebsite,
    hireDev,
    hireSeller,
    buyBuilding,
    removeState,
    removeStorage,

    achievements // {unlocked, recent}
  };
}
