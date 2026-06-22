import type { Candidate, CandidateCategory } from '../types';

export const catalog: Candidate[] = [
  // Devs
  {
    id: 'junior-dev',
    category: 'dev',
    title: 'Junior Developer',
    image: 'https://picsum.photos/id/1/100?grayscale',
    description: 'Increases website production by 2/s.',
    cost: 4e2,
    increment: 2,
    quality: 20
  },
  {
    id: 'mid-dev',
    category: 'dev',
    title: 'Mid Developer',
    image: 'https://picsum.photos/id/180/100?grayscale',
    description: 'Increases website production by 24/s.',
    cost: 7e3,
    increment: 24,
    quality: 23
  },
  {
    id: 'senior-dev',
    category: 'dev',
    title: 'Senior Developer',
    image: 'https://picsum.photos/id/60/100?grayscale',
    description: 'Increases website production by 290/s.',
    cost: 5e4,
    increment: 290,
    quality: 26
  },
  {
    id: 'tech-lead',
    category: 'dev',
    title: 'Tech Lead',
    image: 'https://picsum.photos/id/91/100?grayscale',
    description: 'Increases website production by 3.5K/s.',
    cost: 6e5,
    increment: 3.5e3,
    quality: 30
  },
  {
    id: 'solutions-architect',
    category: 'dev',
    title: 'Solutions Architect',
    image: 'https://picsum.photos/id/110/100?grayscale',
    description: 'Increases website production by 30K/s.',
    cost: 1e7,
    increment: 3e4,
    quality: 34
  },
  {
    id: 'ten-x-engineer',
    category: 'dev',
    title: '100x Engineer (Vibe Coder)',
    image: 'https://picsum.photos/id/177/100?grayscale',
    description: 'Increases website production by 250K/s.',
    cost: 1e9,
    increment: 2.5e5,
    quality: 38
  },
  {
    id: 'jedi-coder',
    category: 'dev',
    title: 'Jedi Coder',
    image: 'https://picsum.photos/id/201/100?grayscale',
    description: 'Increases website production by 8M/s.',
    cost: 4e10,
    increment: 8e6,
    quality: 44
  },
  {
    id: 'gandalf-the-white',
    category: 'dev',
    title: 'Gandalf The White',
    image: 'https://picsum.photos/id/219/100?grayscale',
    description: 'Increases website production by 1.5B/s.',
    cost: 5e12,
    increment: 1.5e9,
    quality: 60
  },
  {
    id: 'neo',
    category: 'dev',
    title: 'Neo',
    image: 'https://picsum.photos/id/237/100?grayscale',
    description: 'Increases website production by 500B/s.',
    cost: 6e15,
    increment: 5e11,
    quality: 80
  },
  {
    id: 'skynet',
    category: 'dev',
    title: 'Skynet',
    image: 'https://picsum.photos/id/250/100?grayscale',
    description: 'Increases website production by 50T/s.',
    cost: 3e18,
    increment: 5e13,
    quality: 100
  },
  {
    id: 'agi',
    category: 'dev',
    title: 'AGI achieved',
    image: 'https://picsum.photos/id/284/100?grayscale',
    description: 'Increases website production by 500Q/s.',
    cost: 4e20,
    increment: 5e17,
    quality: 300
  },

  // Sellers
  {
    id: 'trainee-sales',
    category: 'seller',
    title: 'Trainee Salesperson',
    image: 'https://picsum.photos/id/48/100?grayscale',
    description: 'Increases website selling by 2/s.',
    cost: 1e3,
    increment: 2
  },
  {
    id: 'senior-sales',
    category: 'seller',
    title: 'Senior Salesperson',
    image: 'https://picsum.photos/id/20/100?grayscale',
    description: 'Increases website selling by 30/s.',
    cost: 4e4,
    increment: 30
  },
  {
    id: 'b2b-sales',
    category: 'seller',
    title: 'B2B specialist Salesperson',
    image: 'https://picsum.photos/id/378/100?grayscale',
    description: 'Increases website selling by 200/s.',
    cost: 1e5,
    increment: 200
  },
  {
    id: 'cult-leader',
    category: 'seller',
    title: 'Cult Leader',
    image: 'https://picsum.photos/id/379/100?grayscale',
    description: 'Increases website selling by 1B/s.',
    cost: 1e14,
    increment: 1e9
  },
  {
    id: 'elon-musk',
    category: 'seller',
    title: 'Elon Musk',
    image: 'https://picsum.photos/id/379/100?grayscale',
    description: 'Increases website selling by 1T/s.',
    cost: 5e15,
    increment: 1e12
  },
  {
    id: 'linkedin-bro',
    category: 'seller',
    title: 'LinkedIn Bro',
    image: 'https://picsum.photos/id/64/100?grayscale',
    description: 'Auto-hired by the Marketing Agency for $10M each. Sells 5M/s.',
    cost: 1e7,
    increment: 5e6,
    hidden: true
  },

  // Buildings
  {
    id: 'coworking-single',
    category: 'building',
    title: 'Co-working subscription',
    image: 'https://picsum.photos/id/42/100?grayscale',
    description: 'Increases max team size by 1. Each one costs more.',
    cost: 10e3,
    increment: 1,
    repeatable: true
  },
  {
    id: 'small-office',
    category: 'building',
    title: 'Small Office',
    image: 'https://picsum.photos/id/192/100?grayscale',
    description: 'Increases max team size by 15.',
    cost: 2e6,
    increment: 40
  },
  {
    id: 'remote-first-org',
    category: 'building',
    title: 'Remote-First Org',
    image: 'https://picsum.photos/id/169/100?grayscale',
    description: 'Increases max team size by 90.',
    cost: 5e7,
    increment: 90
  },
  {
    id: 'tech-unicorn-hq',
    category: 'building',
    title: 'Tech Unicorn HQ',
    image: 'https://picsum.photos/id/188/100?grayscale',
    description: 'Increases max team size by 180.',
    cost: 5e9,
    increment: 180
  },
  {
    id: 'corporate-tower',
    category: 'building',
    title: 'Corporate Tower',
    image: 'https://picsum.photos/id/146/100?grayscale',
    description: 'Increases max team size by 100.',
    cost: 5e11,
    increment: 350
  },
  {
    id: 'remote-island',
    category: 'building',
    title: 'Remote Island',
    image: 'https://picsum.photos/id/203/100?grayscale',
    description: 'Increases max team size by 350.',
    cost: 1e14,
    increment: 700
  },
  {
    id: 'moon-base',
    category: 'building',
    title: 'Moon Base',
    image: 'https://picsum.photos/id/222/100?grayscale',
    description: 'Increases max team size by 700.',
    cost: 1e16,
    increment: 1.5e3
  },
  {
    id: 'dyson-sphere',
    category: 'building',
    title: 'Dyson Sphere',
    image: 'https://picsum.photos/id/241/100?grayscale',
    description: 'Increases max team size by 1.5K.',
    cost: 1e18,
    increment: 2e4
  }
];

// Each owned copy of a repeatable building raises its next price by this factor.
export const BUILDING_COST_GROWTH = 1.15;

// Live price of a building given how many are already owned. Repeatable buildings
// (co-working) ramp by BUILDING_COST_GROWTH^owned; one-time buildings stay at base.
export const buildingCost = (candidate: Candidate, owned: number): number =>
  candidate.repeatable ? Math.ceil(candidate.cost * BUILDING_COST_GROWTH ** owned) : candidate.cost;

export const byCategory = (category: CandidateCategory) =>
  catalog.filter((c) => c.category === category);

export const sumCategory = (staff: Record<string, number>, category: CandidateCategory) =>
  byCategory(category).reduce((accum, current) => accum + (staff[current.id] ?? 0), 0);
