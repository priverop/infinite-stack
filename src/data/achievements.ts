import type { Achievement } from '../types';

/*
    Ideas:
    - Team to 100
    - Team to 1k

*/

export const achievements: Achievement[] = [
  // Click
  {
    id: 'clicks_1k',
    title: 'Click Rookie',
    description: 'Click 1,000 times',
    icon: '👆',
    type: 'threshold',
    stat: 'totalClicks',
    target: 1000
  },
  {
    id: 'clicks_10k',
    title: 'Click Master',
    description: 'Click 10,000 times',
    icon: '💪',
    type: 'threshold',
    stat: 'totalClicks',
    target: 10000
  },

  // Money
  {
    id: 'first_thousand',
    title: 'Thousandaire',
    description: 'Earn your first thousand dollars',
    icon: '💲',
    type: 'threshold',
    stat: 'money',
    target: 1000
  },
  {
    id: 'first_million',
    title: 'Millionaire',
    description: 'Earn your first million dollars',
    icon: '💰',
    type: 'threshold',
    stat: 'money',
    target: 1000000
  },

  // Website
  {
    id: 'first_website',
    title: 'Hello World',
    description: 'Create your first website',
    icon: '🌐',
    type: 'threshold',
    stat: 'websitesCreated',
    target: 1
  },
  {
    id: 'first_sale',
    title: 'First Sale',
    description: 'Sell your first website',
    icon: '💵',
    type: 'threshold',
    stat: 'websitesSold',
    target: 1
  },
  {
    id: 'thousand_websites',
    title: 'Website Expert',
    description: 'Create 1,000 websites',
    icon: '🚧',
    type: 'threshold',
    stat: 'websitesCreated',
    target: 1000
  },
  {
    id: 'million_websites',
    title: 'Website Empire',
    description: 'Create 1,000,000 websites',
    icon: '🏭',
    type: 'threshold',
    stat: 'websitesCreated',
    target: 1000000
  },

  // Staff count
  {
    id: 'trainees_100',
    title: 'Training Academy',
    description: 'Have 100 trainee',
    icon: '🎓',
    type: 'staffCount',
    staffIds: ['junior-dev', 'trainee-sales'],
    target: 100
  },

  // First purchase
  {
    id: 'first_dev',
    title: 'First Developer',
    description: 'Hire your first developer',
    icon: '👨‍💻',
    type: 'firstPurchase',
    purchaseType: 'dev'
  },
  {
    id: 'first_seller',
    title: 'Sales Team',
    description: 'Hire your first salesperson',
    icon: '👔',
    type: 'firstPurchase',
    purchaseType: 'seller'
  },
  {
    id: 'first_building',
    title: 'Enterpreneur',
    description: 'Buy your first building',
    icon: '🏢',
    type: 'firstPurchase',
    purchaseType: 'building'
  },

  // Collection
  {
    id: 'all_buildings',
    title: 'Real Estate',
    description: 'Own every type of building',
    icon: '🏰',
    type: 'collection',
    collectionType: 'building'
  },
  {
    id: 'all_staff',
    title: 'Full Roster',
    description: 'Hire every type of staff',
    icon: '👥',
    type: 'collection',
    collectionType: 'staff'
  }
];
