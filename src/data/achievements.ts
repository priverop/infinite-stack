import type { Achievement } from '../types';

export const achievements: Achievement[] = [
  // Click
  {
    id: 'clicks_100',
    title: 'Click',
    description: 'Click 100 times.',
    icon: '👆',
    type: 'threshold',
    stat: 'totalClicks',
    target: 50
  },
  {
    id: 'clicks_1000',
    title: 'Click Rookie',
    description: 'Click 1000 times.',
    icon: '👆',
    type: 'threshold',
    stat: 'totalClicks',
    target: 1000
  },
  {
    id: 'clicks_5k',
    title: 'Click Master',
    description: 'Click 5,000 times.',
    icon: '💪',
    type: 'threshold',
    stat: 'totalClicks',
    target: 5000
  },

  // Money
  {
    id: 'first_thousand',
    title: 'Thousandaire',
    description: 'Earn your first thousand dollars.',
    icon: '💲',
    type: 'threshold',
    stat: 'money',
    target: 1000
  },
  {
    id: 'first_million',
    title: 'Millionaire',
    description: 'Earn your first million dollars.',
    icon: '💰',
    type: 'threshold',
    stat: 'money',
    target: 1000000
  },
  {
    id: 'first_billion',
    title: 'Billionaire',
    description: 'Earn your first billion dollars.',
    icon: '💎',
    type: 'threshold',
    stat: 'money',
    target: 1000000000
  },
  {
    id: 'first_trillion',
    title: 'Trillionaire',
    description: 'Earn your first trillion dollars.',
    icon: '👑',
    type: 'threshold',
    stat: 'money',
    target: 1000000000000
  },

  // Website
  {
    id: 'first_website',
    title: 'Hello World',
    description: 'Create your first website.',
    icon: '🌐',
    type: 'threshold',
    stat: 'websitesCreated',
    target: 1
  },
  {
    id: 'first_sale',
    title: 'First Sale',
    description: 'Sell your first website.',
    icon: '💵',
    type: 'threshold',
    stat: 'websitesSold',
    target: 1
  },
  {
    id: 'thousand_websites',
    title: 'Website Expert',
    description: 'Create 1,000 websites.',
    icon: '🚧',
    type: 'threshold',
    stat: 'websitesCreated',
    target: 1000
  },
  {
    id: 'million_websites',
    title: 'Website Empire',
    description: 'Create 1,000,000 websites.',
    icon: '🏭',
    type: 'threshold',
    stat: 'websitesCreated',
    target: 1000000
  },
  {
    id: 'billion_websites',
    title: 'Website Universe',
    description: 'Create 1,000,000,000 websites.',
    icon: '🌌',
    type: 'threshold',
    stat: 'websitesCreated',
    target: 1000000000
  },
  {
    id: 'sold_1k',
    title: 'Wholesaler',
    description: 'Sell 1,000 websites.',
    icon: '🛒',
    type: 'threshold',
    stat: 'websitesSold',
    target: 1000
  },
  {
    id: 'sold_1m',
    title: 'Sales Legend',
    description: 'Sell 1,000,000 websites.',
    icon: '🏆',
    type: 'threshold',
    stat: 'websitesSold',
    target: 1000000
  },

  // Quality
  {
    id: 'quality_50',
    title: 'Quality Matters',
    description: 'Reach a team quality of 50.',
    icon: '✨',
    type: 'threshold',
    stat: 'quality',
    target: 50
  },
  {
    id: 'quality_100',
    title: 'Perfectionist',
    description: 'Reach a team quality of 100.',
    icon: '🌟',
    type: 'threshold',
    stat: 'quality',
    target: 100
  },

  // Production rate
  {
    id: 'wps_1k',
    title: 'Assembly Line',
    description: 'Produce 1,000 websites per second.',
    icon: '🏗️',
    type: 'threshold',
    stat: 'websitesPerSecond',
    target: 1000
  },
  {
    id: 'wps_1m',
    title: 'Mass Production',
    description: 'Produce 1,000,000 websites per second.',
    icon: '🤖',
    type: 'threshold',
    stat: 'websitesPerSecond',
    target: 1000000
  },
  {
    id: 'sps_1k',
    title: 'Cash Machine',
    description: 'Sell 1,000 websites per second.',
    icon: '💸',
    type: 'threshold',
    stat: 'sellsPerSecond',
    target: 1000
  },

  // Company size (total team)
  {
    id: 'team_10',
    title: 'Startup Crew',
    description: 'Grow your team to 10.',
    icon: '🚀',
    type: 'threshold',
    stat: 'people',
    target: 10
  },
  {
    id: 'team_50',
    title: 'Scale-Up',
    description: 'Grow your team to 50.',
    icon: '📈',
    type: 'threshold',
    stat: 'people',
    target: 50
  },
  {
    id: 'team_100',
    title: 'Medium Company',
    description: 'Grow your team to 100.',
    icon: '🏙️',
    type: 'threshold',
    stat: 'people',
    target: 100
  },
  {
    id: 'team_500',
    title: 'Big Company',
    description: 'Grow your team to 500.',
    icon: '🏢',
    type: 'threshold',
    stat: 'people',
    target: 500
  },
  {
    id: 'team_1k',
    title: 'Unicorn',
    description: 'Grow your team to 1,000.',
    icon: '🦄',
    type: 'threshold',
    stat: 'people',
    target: 1000
  },
  {
    id: 'team_10k',
    title: 'Mega Corp',
    description: 'Grow your team to 3,000.',
    icon: '🌍',
    type: 'threshold',
    stat: 'people',
    target: 3000
  },

  // Staff count
  {
    id: 'trainees_100',
    title: 'Training Academy',
    description: 'Have 100 trainee.',
    icon: '🎓',
    type: 'staffCount',
    staffIds: ['junior-dev', 'trainee-sales'],
    target: 100
  },

  // Elite hires
  {
    id: 'hire_gandalf',
    title: 'The White Wizard',
    description: 'Hire Gandalf The White.',
    icon: '🧙',
    type: 'staffCount',
    staffIds: ['gandalf-the-white'],
    target: 1
  },
  {
    id: 'hire_neo',
    title: 'The One',
    description: 'Hire Neo.',
    icon: '🕶️',
    type: 'staffCount',
    staffIds: ['neo'],
    target: 1
  },
  {
    id: 'hire_agi',
    title: 'Singularity',
    description: 'Achieve AGI: no more coding.',
    icon: '🤖',
    type: 'staffCount',
    staffIds: ['agi'],
    target: 1
  },

  // Landmark buildings
  {
    id: 'own_unicorn_hq',
    title: 'Unicorn HQ',
    description: 'Own a Tech Unicorn HQ.',
    icon: '🦄',
    type: 'staffCount',
    staffIds: ['tech-unicorn-hq'],
    target: 1
  },
  {
    id: 'own_moon_base',
    title: 'Lunar Expansion',
    description: 'Own a Moon Base.',
    icon: '🌑',
    type: 'staffCount',
    staffIds: ['moon-base'],
    target: 1
  },
  {
    id: 'own_dyson',
    title: 'Dyson Builder',
    description: 'Own a Dyson Sphere.',
    icon: '☀️',
    type: 'staffCount',
    staffIds: ['dyson-sphere'],
    target: 1
  },

  // First purchase
  {
    id: 'first_dev',
    title: 'First Developer',
    description: 'Hire your first developer.',
    icon: '👨‍💻',
    type: 'firstPurchase',
    purchaseType: 'dev'
  },
  {
    id: 'first_seller',
    title: 'Sales Team',
    description: 'Hire your first salesperson.',
    icon: '👔',
    type: 'firstPurchase',
    purchaseType: 'seller'
  },
  {
    id: 'first_building',
    title: 'Entrepreneur',
    description: 'Buy your first building.',
    icon: '🏢',
    type: 'firstPurchase',
    purchaseType: 'building'
  },

  // Collection
  {
    id: 'all_buildings',
    title: 'Real Estate',
    description: 'Own every type of building.',
    icon: '🏰',
    type: 'collection',
    collectionType: 'building'
  },
  {
    id: 'all_staff',
    title: 'Full Roster',
    description: 'Hire every type of staff.',
    icon: '👥',
    type: 'collection',
    collectionType: 'staff'
  }
];
