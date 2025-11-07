// Core game state
export interface GameStats {
  money: number;
  websites: number;
  websitesPerSecond: number;
  moneyPerSecond: number;
  people: number;
  maxPeople: number;
  // Achievements: these are hidden for the user
  totalClicks: number;
  websitesCreated: number;
  websitesSold: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'threshold' | 'firstPurchase' | 'collection';
  // For threshold achievements
  stat?: keyof GameStats;
  target?: number;
  // For first purchase achievements
  purchaseType?: 'dev' | 'seller' | 'building';
  // For collection achievements
  collectionType?: 'buildings' | 'devs' | 'sellers';
}

// Candidate for hiring (devs and salespeople)
export interface Candidate {
  title: string;
  image: string;
  description: string;
  cost: number;
  increment: number;
}

// Functions to hire candidates (devs or sellers)
export type HireFunction = (cost: number, increment: number) => void;
