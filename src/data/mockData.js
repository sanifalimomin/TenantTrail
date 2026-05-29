export const DEMO_USER = {
  name: 'Alex',
  email: 'alex@dal.ca',
  password: 'password123',
}

export const APARTMENTS = [
  {
    id: 1,
    name: 'The Marlstone',
    address: '5540 Spring Garden Rd',
    neighbourhood: 'Spring Garden',
    rating: 5.0,
    reviews: 1,
    stars: 5,
    tags: [],
    gradient: 'linear-gradient(160deg, #93c5a1 0%, #3a9b7a 100%)',
  },
  {
    id: 2,
    name: 'Park Victoria',
    address: '1496 Carlton St',
    neighbourhood: 'South End',
    rating: 4.5,
    reviews: 2,
    stars: 4,
    tags: ['Well maintained', 'Quiet', 'Expensive'],
    gradient: 'linear-gradient(160deg, #5b8ab5 0%, #2d4a73 100%)',
  },
  {
    id: 3,
    name: 'Le Marchant Towers',
    address: '1585 Le Marchant St',
    neighbourhood: 'West End',
    rating: 3.7,
    reviews: 3,
    stars: 4,
    tags: ['Good location', 'Parking limited', 'Aging building'],
    gradient: 'linear-gradient(160deg, #9aad79 0%, #5a7042 100%)',
  },
  {
    id: 4,
    name: 'Fenwick Tower',
    address: '5599 Fenwick St',
    neighbourhood: 'Downtown',
    rating: 3.3,
    reviews: 3,
    stars: 3,
    tags: ['Elevator issues', 'Great views', 'Security concerns'],
    gradient: 'linear-gradient(160deg, #4b5e72 0%, #1e293b 100%)',
  },
  {
    id: 5,
    name: 'Southpoint Apartments',
    address: '1050 South Park St',
    neighbourhood: 'South End',
    rating: 2.5,
    reviews: 4,
    stars: 3,
    tags: [],
    gradient: 'linear-gradient(160deg, #c47a3c 0%, #7c3d10 100%)',
  },
]

export const NEIGHBOURHOOD_OPTIONS = [
  'All Neighbourhoods',
  ...new Set(APARTMENTS.map(a => a.neighbourhood)),
]

export const SORT_OPTIONS = ['Highest Rated', 'Most Reviews', 'Lowest Rated']

export const HERO_FEATURES = [
  {
    icon: '⭐',
    title: 'Verified Reviews',
    desc: 'Real ratings with photos and videos from past tenants.',
  },
  {
    icon: '👑',
    title: 'AI Summaries',
    desc: 'Key issues and sentiment extracted from every review.',
  },
  {
    icon: '💬',
    title: 'Ask Questions',
    desc: 'Comment on reviews and get answers from past tenants.',
  },
]
