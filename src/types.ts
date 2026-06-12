// Core game state
export interface GameStats {
  money: number;
  websites: number;
  websitesPerSecond: number;
  sellsPerSecond: number;
  quality: number;
  people: number;
  maxPeople: number;
  // Achievements: these are hidden for the user
  totalClicks: number;
  websitesCreated: number;
  websitesSold: number;
  staff: Record<string, number>;
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
}

// Functions to hire candidates (devs or sellers)
export type HireFunction = (id: string, cost: number, increment: number) => void;
