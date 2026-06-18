import type { Candidate, CandidateCategory } from '../types';

export const catalog: Candidate[] = [
  // Devs
  {
    id: 'junior-dev',
    category: 'dev',
    title: 'Junior Developer',
    image: 'https://picsum.photos/id/1/100?grayscale',
    description: 'Increases website production by 2/sec.',
    cost: 500,
    increment: 2,
    quality: 20
  },
  {
    id: 'mid-dev',
    category: 'dev',
    title: 'Mid Developer',
    image: 'https://picsum.photos/id/180/100?grayscale',
    description: 'Increases website production by 24/sec.',
    cost: 5000,
    increment: 24,
    quality: 23
  },
  {
    id: 'senior-dev',
    category: 'dev',
    title: 'Senior Developer',
    image: 'https://picsum.photos/id/60/100?grayscale',
    description: 'Increases website production by 290/sec.',
    cost: 50000,
    increment: 290,
    quality: 26
  },
  {
    id: 'tech-lead',
    category: 'dev',
    title: 'Tech Lead',
    image: 'https://picsum.photos/id/91/100?grayscale',
    description: 'Increases website production by 3,500/sec.',
    cost: 500000,
    increment: 3500,
    quality: 30
  },
  {
    id: 'solutions-architect',
    category: 'dev',
    title: 'Solutions Architect',
    image: 'https://picsum.photos/id/110/100?grayscale',
    description: 'Increases website production by 42,000/sec.',
    cost: 5000000,
    increment: 42000,
    quality: 34
  },
  {
    id: 'ten-x-engineer',
    category: 'dev',
    title: '10x Engineer',
    image: 'https://picsum.photos/id/177/100?grayscale',
    description: 'Increases website production by 500,000/sec.',
    cost: 50000000,
    increment: 500000,
    quality: 38
  },
  {
    id: 'jedi-coder',
    category: 'dev',
    title: 'Jedi Coder',
    image: 'https://picsum.photos/id/201/100?grayscale',
    description: 'Increases website production by 6,000,000/sec.',
    cost: 500000000,
    increment: 6000000,
    quality: 44
  },
  {
    id: 'gandalf-the-white',
    category: 'dev',
    title: 'Gandalf The White',
    image: 'https://picsum.photos/id/219/100?grayscale',
    description: 'Increases website production by 72,000,000/sec.',
    cost: 5000000000,
    increment: 72000000,
    quality: 50
  },
  {
    id: 'neo',
    category: 'dev',
    title: 'Neo',
    image: 'https://picsum.photos/id/237/100?grayscale',
    description: 'Increases website production by 860,000,000/sec.',
    cost: 50000000000,
    increment: 860000000,
    quality: 58
  },
  {
    id: 'skynet-core',
    category: 'dev',
    title: 'Skynet Core',
    image: 'https://picsum.photos/id/250/100?grayscale',
    description: 'Increases website production by 10,400,000,000/sec.',
    cost: 500000000000,
    increment: 10400000000,
    quality: 68
  },
  {
    id: 'terminator-t1000',
    category: 'dev',
    title: 'Terminator T-1000',
    image: 'https://picsum.photos/id/268/100?grayscale',
    description: 'Increases website production by 125,000,000,000/sec.',
    cost: 5000000000000,
    increment: 125000000000,
    quality: 80
  },
  {
    id: 'agi',
    category: 'dev',
    title: 'AGI achieved',
    image: 'https://picsum.photos/id/284/100?grayscale',
    description: 'Increases website production by 1,500,000,000,000/sec.',
    cost: 50000000000000,
    increment: 1500000000000,
    quality: 100
  },

  // Sellers
  {
    id: 'trainee-sales',
    category: 'seller',
    title: 'Trainee Salesperson',
    image: 'https://picsum.photos/id/48/100?grayscale',
    description: 'Increases website selling by 2/sec.',
    cost: 1000,
    increment: 2
  },
  {
    id: 'senior-sales',
    category: 'seller',
    title: 'Senior Salesperson',
    image: 'https://picsum.photos/id/20/100?grayscale',
    description: 'Increases website selling by 30/sec.',
    cost: 6000,
    increment: 30
  },
  {
    id: 'b2b-sales',
    category: 'seller',
    title: 'B2B specialist Salesperson',
    image: 'https://picsum.photos/id/378/100?grayscale',
    description: 'Increases website selling by 200/sec.',
    cost: 40000,
    increment: 200
  },
  {
    id: 'linkedin-bro',
    category: 'seller',
    title: 'LinkedIn Bro',
    image: 'https://picsum.photos/id/64/100?grayscale',
    description: 'Auto-hired by the Marketing Agency. Sells 50M/s.',
    cost: 5000000,
    increment: 50000000,
    hidden: true
  },

  // Buildings
  {
    id: 'coworking-single',
    category: 'building',
    title: 'Co-working single subscription',
    image: 'https://picsum.photos/id/42/100?grayscale',
    description: 'Increases max team size by 1.',
    cost: 50000,
    increment: 1
  },
  {
    id: 'coworking-private',
    category: 'building',
    title: 'Co-working private space',
    image: 'https://picsum.photos/id/163/100?grayscale',
    description: 'Increases max team size by 3.',
    cost: 125000,
    increment: 3
  },
  {
    id: 'small-office',
    category: 'building',
    title: 'Small Office',
    image: 'https://picsum.photos/id/192/100?grayscale',
    description: 'Increases max team size by 6.',
    cost: 200000,
    increment: 6
  },
  {
    id: 'open-plan-office',
    category: 'building',
    title: 'Open-plan Office',
    image: 'https://picsum.photos/id/119/100?grayscale',
    description: 'Increases max team size by 15.',
    cost: 450000,
    increment: 15
  },
  {
    id: 'tech-campus',
    category: 'building',
    title: 'Tech Campus',
    image: 'https://picsum.photos/id/127/100?grayscale',
    description: 'Increases max team size by 40.',
    cost: 1000000,
    increment: 40
  },
  {
    id: 'corporate-tower',
    category: 'building',
    title: 'Corporate Tower',
    image: 'https://picsum.photos/id/146/100?grayscale',
    description: 'Increases max team size by 100.',
    cost: 2200000,
    increment: 100
  },
  {
    id: 'innovation-hub',
    category: 'building',
    title: 'Innovation Hub',
    image: 'https://picsum.photos/id/160/100?grayscale',
    description: 'Increases max team size by 250.',
    cost: 4500000,
    increment: 250
  },
  {
    id: 'remote-first-org',
    category: 'building',
    title: 'Remote-First Org',
    image: 'https://picsum.photos/id/169/100?grayscale',
    description: 'Increases max team size by 600.',
    cost: 10000000,
    increment: 600
  },
  {
    id: 'tech-unicorn-hq',
    category: 'building',
    title: 'Tech Unicorn HQ',
    image: 'https://picsum.photos/id/188/100?grayscale',
    description: 'Increases max team size by 1,500.',
    cost: 20000000,
    increment: 1500
  },
  {
    id: 'orbital-data-center',
    category: 'building',
    title: 'Orbital Data Center',
    image: 'https://picsum.photos/id/203/100?grayscale',
    description: 'Increases max team size by 4,000.',
    cost: 45000000,
    increment: 4000
  },
  {
    id: 'moon-base',
    category: 'building',
    title: 'Moon Base',
    image: 'https://picsum.photos/id/222/100?grayscale',
    description: 'Increases max team size by 10,000.',
    cost: 90000000,
    increment: 10000
  },
  {
    id: 'dyson-sphere',
    category: 'building',
    title: 'Dyson Sphere',
    image: 'https://picsum.photos/id/241/100?grayscale',
    description: 'Increases max team size by 25,000.',
    cost: 175000000,
    increment: 25000
  }
];

export const byCategory = (category: CandidateCategory) =>
  catalog.filter((c) => c.category === category);

export const sumCategory = (staff: Record<string, number>, category: CandidateCategory) =>
  byCategory(category).reduce((accum, current) => accum + (staff[current.id] ?? 0), 0);
