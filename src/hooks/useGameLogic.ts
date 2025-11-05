// src/hooks/useGameLogic.ts
import { useState, useEffect } from 'react';
import type { HireFunction } from '../types';
import useGameStorage from './useGameStorage';

export function useGameLogic() {
  const [websites, setWebsites] = useState(0);
  const [money, setMoney] = useState(100000000);
  const [websitesPerSecond, setWebsitesPerSecond] = useState(0);
  const [moneyPerSecond, setMoneyPerSecond] = useState(0);
  const [people, setPeople] = useState(0);
  const [maxPeople, setMaxPeople] = useState(10);

  function createWebsite(): void {
    setWebsites(websites + 1);
  }

  function sellWebsite(): void {
    if (websites > 0) {
      setWebsites(websites - 1);
      setMoney(money + 1);
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
    maxPeople
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
    buyBuilding
  };
}
