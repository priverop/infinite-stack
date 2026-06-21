// Core game state
export interface GameStats {
  money: number;
  maxMoney: number;
  websites: number;
  websitesPerSecond: number;
  sellsPerSecond: number;
  quality: number;
  people: number;
  maxPeople: number;
  staff: Record<string, number>;
  agencyPurchased: boolean;
  agencyUpgraded: boolean;
  pyramidPurchased: boolean;
  flipPurchased: boolean;
  gameStartTime?: number;
  agiAchievedAt?: number;
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
  type: 'threshold' | 'firstPurchase' | 'collection' | 'staffCount';
  // For threshold achievements
  stat?: keyof GameStats;
  staffIds?: string[];
  target?: number;
  // For first purchase achievements
  purchaseType?: CandidateCategory;
  // For collection achievements
  collectionType?: CandidateCategory;
}

export type CandidateCategory = 'dev' | 'seller' | 'building' | 'staff';

// Candidate for hiring (devs and salespeople)
export interface Candidate {
  id: string;
  category: CandidateCategory;
  title: string;
  image: string;
  description: string;
  cost: number;
  increment: number;
  quality?: number;
  hidden?: boolean;
  repeatable?: boolean;
}

// Functions to hire candidates (devs or sellers)
export type HireFunction = (id: string, cost: number, increment: number) => void;
