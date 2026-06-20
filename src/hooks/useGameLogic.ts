// src/hooks/useGameLogic.ts
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import type { HireFunction, GameStats } from '../types';
import { catalog, buildingCost } from '../data/catalog';
import useGameStorage from './useGameStorage';
import { useAchievements } from './useAchievements';

export const AGENCY_UNLOCK_SOLD = 1_000_000;
export const AGENCY_COST = 1_000_000;
export const AGENCY_UPGRADE_COST = 10_000_000_000_000; // 10T
const AGENCY_INTERVAL_MS = 3000;
const AGENCY_UPGRADED_INTERVAL_MS = 1000;

export const PYRAMID_UNLOCK_CLICKS = 500;
export const PYRAMID_COST = 100;
const PYRAMID_DOUBLE_CHANCE = 0.05;
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
  const [agencyUpgraded, setAgencyUpgraded] = useState(false);
  const [pyramidPurchased, setPyramidPurchased] = useState(false);

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
    agencyPurchased,
    agencyUpgraded,
    pyramidPurchased
  };

  const achievements = useAchievements(gameState); // Object with unlocked and recent

  // High-water-mark: candidate unlocks gate on peak money, so a row never disappears
  // after the player spends down (costs are monotonic per list).
  useEffect(() => setMaxMoney((m) => Math.max(m, money)), [money]);

  // Core functions

  function createWebsite(): void {
    setWebsites((prev) => prev + 1);
    // Achivements
    setTotalClicks((prev) => prev + 1);
    setWebsitesCreated((prev) => prev + 1);
  }

  function sellWebsite(): void {
    if (websites > 0) {
      setWebsites((prev) => prev - 1);
      setMoney((prev) => prev + quality);
      // Achivements
      setTotalClicks((prev) => prev + 1);
      setWebsitesSold((prev) => prev + 1);
    }
  }

  const hireDev: HireFunction = (id, cost, increment) => {
    if (money >= cost && people < maxPeople) {
      setMoney((prev) => prev - cost);
      setWebsitesPerSecond((prev) => prev + increment);
      setPeople((prev) => prev + 1);
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
      setMoney((prev) => prev - cost);
      setSellsPerSecond((prev) => prev + increment);
      setPeople((prev) => prev + 1);
      setStaff((prev) => ({
        ...prev,
        [id]: (prev[id] ?? 0) + 1
      }));
    }
  };

  function buyAgency(): void {
    if (money >= AGENCY_COST && !agencyPurchased && websitesSold >= AGENCY_UNLOCK_SOLD) {
      setMoney((prev) => prev - AGENCY_COST);
      setAgencyPurchased(true);
    }
  }

  function buyPyramidScheme(): void {
    if (money >= PYRAMID_COST && !pyramidPurchased && totalClicks >= PYRAMID_UNLOCK_CLICKS) {
      setMoney((prev) => prev - PYRAMID_COST);
      if (Math.random() < PYRAMID_DOUBLE_CHANCE) {
        setPyramidPurchased(true);
        setQuality((prev) => prev * 2);
        toast.success('You were the first to get out!! quality doubled!');
      } else {
        toast('Pyramid Scheme collapsed — no payout.');
      }
    }
  }

  function buyAgencyUpgrade(): void {
    if (money >= AGENCY_UPGRADE_COST && agencyPurchased && !agencyUpgraded) {
      setMoney((prev) => prev - AGENCY_UPGRADE_COST);
      setAgencyUpgraded(true);
    }
  }

  const buyBuilding: HireFunction = (id, _cost, increment) => {
    const candidate = catalog.find((c) => c.id === id);
    if (!candidate) return;
    const owned = staff[id] ?? 0;
    if (!candidate.repeatable && owned >= 1) return; // one-time, already owned
    // Repeatable buildings ramp in price per copy owned; price recomputed here, not
    // from the passed-in cost (which is the base catalog value).
    const price = buildingCost(candidate, owned);
    if (money >= price) {
      setMoney((prev) => prev - price);
      setMaxPeople((prev) => prev + increment);
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
    setAgencyUpgraded(false);
    setPyramidPurchased(false);
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
        setAgencyUpgraded(savedData.agencyUpgraded ?? false);
        setPyramidPurchased(savedData.pyramidPurchased ?? false);
      }
    };
    init();
  }, [load]);

  // Game tick. We read production values from a ref instead of listing them in the
  // effect deps so the interval is created once and never torn down/recreated. If
  // they were deps, the Agency's setSellsPerSecond (every 1s after the upgrade) would
  // reset this 1000ms interval every ~1000ms — a resonance that can starve the tick
  // so it never fires, freezing the UI on slower/throttled mobile timers.
  const tickRef = useRef({ websitesPerSecond, sellsPerSecond, quality });
  tickRef.current = { websitesPerSecond, sellsPerSecond, quality };

  // ToDo: Alert if sellsPerSecond is not viable
  useEffect(() => {
    const intervalo = setInterval(() => {
      const { websitesPerSecond: wps, sellsPerSecond: sps, quality: q } = tickRef.current;
      setWebsites((prevWebsites) => {
        const newWebsites = prevWebsites + wps;
        if (wps > 0) {
          setWebsitesCreated((prev) => prev + wps);
        }

        // We need to update the money here to get the actual updated newWebsites value
        // This happens because in the same second we need to update two values.
        // Partial sell: never sell more websites than we have in stock, so an
        // over-provisioned sales team (e.g. the Agency) keeps trickling money
        // instead of stalling completely.
        const sold = Math.min(sps, newWebsites);
        if (sold > 0) {
          setMoney((prevMoney) => prevMoney + sold * q);
          // Passive sales must count toward websitesSold so the Agency can unlock
          setWebsitesSold((prevSold) => prevSold + sold);
          return newWebsites - sold;
        }

        return newWebsites;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []); // created once; live values read from tickRef

  // Marketing Agency auto-hiring. We read the latest state from a ref instead of
  // listing it in the effect deps: money/people change every 1s tick, which would
  // otherwise reset the interval before it ever reaches AGENCY_INTERVAL_MS.
  const agencyRef = useRef({ money, people, maxPeople, agencyPurchased });
  agencyRef.current = { money, people, maxPeople, agencyPurchased };

  useEffect(() => {
    const interval = setInterval(
      () => {
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
      },
      agencyUpgraded ? AGENCY_UPGRADED_INTERVAL_MS : AGENCY_INTERVAL_MS
    );

    return () => clearInterval(interval);
  }, [agencyUpgraded]);

  const agencyUnlocked = websitesSold >= AGENCY_UNLOCK_SOLD;
  const pyramidUnlocked = totalClicks >= PYRAMID_UNLOCK_CLICKS;
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
    staff,

    agencyUnlocked,
    agencyPurchased,
    agencyUpgraded,
    pyramidUnlocked,
    pyramidPurchased,
    linkedInBros,

    createWebsite,
    sellWebsite,
    hireDev,
    hireSeller,
    buyBuilding,
    buyAgency,
    buyAgencyUpgrade,
    buyPyramidScheme,
    removeState,
    removeStorage,

    achievements // {unlocked, recent}
  };
}
