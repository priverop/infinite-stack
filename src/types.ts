// Core game state
export interface GameStats {
  money: number;
  websites: number;
  websitesPerSecond: number;
  moneyPerSecond: number;
  people: number;
  maxPeople: number;
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
