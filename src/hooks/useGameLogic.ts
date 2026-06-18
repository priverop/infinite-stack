// src/hooks/useGameLogic.ts
import { useState, useEffect, useRef } from 'react';
import type { HireFunction, GameStats } from '../types';
import { catalog } from '../data/catalog';
import useGameStorage from './useGameStorage';
import { useAchievements } from './useAchievements';

// Marketing Agency: unlocks for purchase once this many websites have been sold,
// then costs AGENCY_COST to buy. Once bought it auto-hires one LinkedIn Bro every
// AGENCY_INTERVAL_MS (each consuming a people slot).
export const AGENCY_UNLOCK_SOLD = 1_000_000;
export const AGENCY_COST = 5_000_000;
const AGENCY_INTERVAL_MS = 8000;
const linkedInBro = catalog.find((c) => c.id === 'linkedin-bro')!;

export function useGameLogic() {
  const [websites, setWebsites] = useState(0);
  const [money, setMoney] = useState(0);
  const [maxMoney, setMaxMoney] = useState(0);
  const [websitesPerSecond, setWebsitesPerSecond] = useState(0);
  const [sellsPerSecond, setSellsPerSecond] = useState(0);
  const [people, setPeople] = useState(0);
  const [maxPeople, setMaxPeople] = useState(10);
  const [quality, setQuality] = useState(20);
  const [agencyPurchased, setAgencyPurchased] = useState(false);

  // Achievements
  const [totalClicks, setTotalClicks] = useState(0);
  const [websitesCreated, setWebsitesCreated] = useState(0);
  const [websitesSold, setWebsitesSold] = useState(0);
  const [staff, setStaff] = useState<Record<string, number>>({});

  const gameState: GameStats = {
    money,
    maxMoney,
    websites,
    websitesPerSecond,
    sellsPerSecond,
    quality,
    people,
    maxPeople,
    totalClicks,
    websitesCreated,
    websitesSold,
    staff,
    agencyPurchased
  };

  const achievements = useAchievements(gameState); // Object with unlocked and recent

  // High-water-mark: candidate unlocks gate on peak money, so a row never disappears
  // after the player spends down (costs are monotonic per list).
  useEffect(() => setMaxMoney((m) => Math.max(m, money)), [money]);

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

  function buyAgency(): void {
    if (money >= AGENCY_COST && !agencyPurchased && websitesSold >= AGENCY_UNLOCK_SOLD) {
      setMoney(money - AGENCY_COST);
      setAgencyPurchased(true);
    }
  }

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
    setMaxMoney(0);
    setSellsPerSecond(0);
    setWebsitesPerSecond(0);
    setQuality(20);
    setPeople(0);
    setMaxPeople(10);
    setTotalClicks(0);
    setWebsitesCreated(0);
    setWebsitesSold(0);
    setStaff({});
    setAgencyPurchased(false);
    achievements.removeAchievements();
  }

  const { load, removeStorage } = useGameStorage(gameState);

  useEffect(() => {
    const init = async () => {
      const savedData = await load();
      if (savedData) {
        setWebsites(savedData.websites);
        setMoney(savedData.money);
        setMaxMoney(savedData.maxMoney ?? savedData.money ?? 0);
        setSellsPerSecond(savedData.sellsPerSecond ?? 0);
        setQuality(savedData.quality ?? 20);
        setWebsitesPerSecond(savedData.websitesPerSecond);
        setPeople(savedData.people);
        setMaxPeople(savedData.maxPeople);
        setTotalClicks(savedData.totalClicks);
        setWebsitesCreated(savedData.websitesCreated);
        setWebsitesSold(savedData.websitesSold);
        setStaff(savedData.staff ?? {});
        setAgencyPurchased(savedData.agencyPurchased ?? false);
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
        // This happens because in the same second we need to update two values.
        // Partial sell: never sell more websites than we have in stock, so an
        // over-provisioned sales team (e.g. the Agency) keeps trickling money
        // instead of stalling completely.
        const sold = Math.min(sellsPerSecond, newWebsites);
        if (sold > 0) {
          setMoney((prevMoney) => prevMoney + sold * quality);
          // Passive sales must count toward websitesSold so the Agency can unlock
          setWebsitesSold((prevSold) => prevSold + sold);
          return newWebsites - sold;
        }

        return newWebsites;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [websitesPerSecond, sellsPerSecond, quality]);

  // Marketing Agency auto-hiring. We read the latest state from a ref instead of
  // listing it in the effect deps: money/people change every 1s tick, which would
  // otherwise reset the interval before it ever reaches AGENCY_INTERVAL_MS.
  const agencyRef = useRef({ money, people, maxPeople, agencyPurchased });
  agencyRef.current = { money, people, maxPeople, agencyPurchased };

  useEffect(() => {
    const interval = setInterval(() => {
      const { money: m, people: p, maxPeople: mp, agencyPurchased: bought } = agencyRef.current;
      if (!bought) return;
      if (m < linkedInBro.cost || p >= mp) return;
      setMoney((prev) => prev - linkedInBro.cost);
      setSellsPerSecond((prev) => prev + linkedInBro.increment);
      setPeople((prev) => prev + 1);
      setStaff((prev) => ({
        ...prev,
        [linkedInBro.id]: (prev[linkedInBro.id] ?? 0) + 1
      }));
    }, AGENCY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const agencyUnlocked = websitesSold >= AGENCY_UNLOCK_SOLD;
  const linkedInBros = staff[linkedInBro.id] ?? 0;

  return {
    websites,
    money,
    maxMoney,
    websitesPerSecond,
    sellsPerSecond,
    quality,
    people,
    maxPeople,

    agencyUnlocked,
    agencyPurchased,
    linkedInBros,

    createWebsite,
    sellWebsite,
    hireDev,
    hireSeller,
    buyBuilding,
    buyAgency,
    removeState,
    removeStorage,

    achievements // {unlocked, recent}
  };
}
