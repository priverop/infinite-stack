import type { Candidate, CandidateCategory } from '../types';

export const catalog: Candidate[] = [
  // Devs
  {
    id: 'junior-dev',
    category: 'dev',
    title: 'Junior Developer',
    image: 'https://picsum.photos/id/1/100?grayscale',
    description: 'Increases website production by 1/sec.',
    cost: 100,
    increment: 1
  },
  {
    id: 'mid-dev',
    category: 'dev',
    title: 'Mid Developer',
    image: 'https://picsum.photos/id/180/100?grayscale',
    description: 'Increases website production by 2/sec.',
    cost: 2000,
    increment: 2
  },
  {
    id: 'senior-dev',
    category: 'dev',
    title: 'Senior Developer',
    image: 'https://picsum.photos/id/60/100?grayscale',
    description: 'Increases website production by 3/sec.',
    cost: 3000,
    increment: 3
  },

  // Sellers
  {
    id: 'trainee-sales',
    category: 'seller',
    title: 'Trainee Salesperson',
    image: 'https://picsum.photos/id/48/100?grayscale',
    description: 'Increases website selling by 1/sec.',
    cost: 1000,
    increment: 1
  },
  {
    id: 'senior-sales',
    category: 'seller',
    title: 'Senior Salesperson',
    image: 'https://picsum.photos/id/20/100?grayscale',
    description: 'Increases website selling by 5/sec.',
    cost: 4500,
    increment: 5
  },
  {
    id: 'b2b-sales',
    category: 'seller',
    title: 'B2B specialist Salesperson',
    image: 'https://picsum.photos/id/378/100?grayscale',
    description: 'Increases website selling by 10/sec.',
    cost: 8000,
    increment: 10
  },

  // Buildings
  {
    id: 'coworking-single',
    category: 'building',
    title: 'Co-working single subscription',
    image: 'https://picsum.photos/id/42/100?grayscale',
    description: 'Increases max team size by 1.',
    cost: 500,
    increment: 1
  },
  {
    id: 'coworking-private',
    category: 'building',
    title: 'Co-working private space',
    image: 'https://picsum.photos/id/163/100?grayscale',
    description: 'Increases max team size by 5.',
    cost: 2000,
    increment: 5
  },
  {
    id: 'small-office',
    category: 'building',
    title: 'Small Office',
    image: 'https://picsum.photos/id/192/100?grayscale',
    description: 'Increases max team size by 3.',
    cost: 10000,
    increment: 3
  }
];

export const byCategory = (category: CandidateCategory) =>
  catalog.filter((c) => c.category === category);

export const sumCategory = (staff: Record<string, number>, category: CandidateCategory) =>
  byCategory(category).reduce((accum, current) => accum + (staff[current.id] ?? 0), 0);
