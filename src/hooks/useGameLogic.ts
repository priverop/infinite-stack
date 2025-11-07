// src/hooks/useGameLogic.ts
import { useState, useEffect } from 'react';
import type { HireFunction, GameStats } from '../types';
import useGameStorage from './useGameStorage';
import { useAchievements } from './useAchievements';

export function useGameLogic() {
  const [websites, setWebsites] = useState(0);
  const [money, setMoney] = useState(100000000);
  const [websitesPerSecond, setWebsitesPerSecond] = useState(0);
  const [moneyPerSecond, setMoneyPerSecond] = useState(0);
  const [people, setPeople] = useState(0);
  const [maxPeople, setMaxPeople] = useState(10);

  // Achievements
  const [totalClicks, setTotalClicks] = useState(0);
  const [websitesCreated, setWebsitesCreated] = useState(0);
  const [websitesSold, setWebsitesSold] = useState(0);

  const achievementGameState: GameStats = {
    money,
    websites,
    websitesPerSecond,
    moneyPerSecond,
    people,
    maxPeople,
    totalClicks,
    websitesCreated,
    websitesSold
  };

  const achievements = useAchievements(achievementGameState); // Object with unlocked and recent

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
      setMoney(money + 1);
      // Achivements
      setTotalClicks(totalClicks + 1);
      setWebsitesSold(websitesSold + 1);
    }
  }

  const hireDev: HireFunction = (cost, increment) => {
    if (money >= cost && people < maxPeople) {
      setMoney(money - cost);
      setWebsitesPerSecond(websitesPerSecond + increment);
      setPeople(people + 1);
    }
  };

  const hireSeller: HireFunction = (cost, increment) => {
    if (money >= cost && people < maxPeople) {
      setMoney(money - cost);
      setMoneyPerSecond(moneyPerSecond + increment);
      setPeople(people + 1);
    }
  };

  const buyBuilding: HireFunction = (cost, increment) => {
    if (money >= cost) {
      setMoney(money - cost);
      setMaxPeople(maxPeople + increment);
    }
  };

  const gameState = {
    websites,
    money,
    websitesPerSecond,
    moneyPerSecond,
    people,
    maxPeople,
    totalClicks,
    websitesCreated,
    websitesSold
  };

  const { load } = useGameStorage(gameState);

  useEffect(() => {
    const init = async () => {
      const savedData = await load();
      if (savedData) {
        setWebsites(savedData.websites);
        setMoney(savedData.money);
        setMoneyPerSecond(savedData.moneyPerSecond);
        setWebsitesPerSecond(savedData.websitesPerSecond);
        setPeople(savedData.people);
        setMaxPeople(savedData.maxPeople);
        setTotalClicks(savedData.totalClicks);
        setWebsitesCreated(savedData.websitesCreated);
        setWebsitesSold(savedData.websitesSold);
      }
    };
    init();
  }, []);

  // ToDo: Alert if moneyPerSecond is not viable
  useEffect(() => {
    const intervalo = setInterval(() => {
      setWebsites((prevWebsites) => {
        const newWebsites = prevWebsites + websitesPerSecond;

        // We need to update the money here to get the actual updated newWebsites value
        // This happens because in the same second we need to update two values
        if (moneyPerSecond > 0 && moneyPerSecond <= newWebsites) {
          setMoney((prevMoney) => prevMoney + moneyPerSecond);
          return newWebsites - moneyPerSecond;
        }

        return newWebsites;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [websitesPerSecond, moneyPerSecond]);

  return {
    websites,
    money,
    websitesPerSecond,
    moneyPerSecond,
    people,
    maxPeople,

    createWebsite,
    sellWebsite,
    hireDev,
    hireSeller,
    buyBuilding,

    achievements // {unlocked, recent}
  };
}
