export const DEMO_USER = {
  name: 'Alex Mitchell',
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
    description: 'Boutique mid-rise steps from the Spring Garden shops.',
    landlord: 'Southwest Properties',
    units: 42,
    yearBuilt: 2019,
    aiSummary:
      'Early reviews are very positive. Tenants highlight the brand-new finishes, the unbeatable Spring Garden location, and quick, friendly management. With only a handful of reviews so far, the picture is still forming, but nothing significant has been flagged as a concern.',
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
    description: 'Established South End building near Victoria Park.',
    landlord: 'Templeton Properties',
    units: 120,
    yearBuilt: 1968,
    aiSummary:
      'Reviewers describe Park Victoria as well kept and quiet, with responsive management. The main recurring note is price: several tenants feel rent is high relative to the unit size, though most agree the location and upkeep justify it.',
  },
  {
    id: 3,
    name: 'Le Marchant Towers',
    address: '1585 Le Marchant St',
    neighbourhood: 'West End',
    rating: 3.7,
    reviews: 3,
    stars: 4,
    tags: ['Good location', 'Parking limited', 'Aging building', 'Maintenance delays'],
    gradient: 'linear-gradient(160deg, #9aad79 0%, #5a7042 100%)',
    description: 'High-rise tower in a quiet residential neighbourhood.',
    landlord: 'Killam Properties',
    units: 88,
    yearBuilt: 1975,
    aiSummary:
      'Tenants consistently praise the location and proximity to Quinpool Road shops. Parking availability is a recurring complaint, with multiple reviewers mentioning waitlists exceeding six months. The building shows its age in hallway carpeting and elevator reliability, but unit interiors have been progressively updated. Maintenance response times average two to three days for non-urgent requests.',
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
    description: "One of Halifax's tallest residential towers with harbour views.",
    landlord: 'Templeton Properties',
    units: 320,
    yearBuilt: 1971,
    aiSummary:
      'The standout theme is the view — upper floors look out over the harbour and Dartmouth. Rent is considered reasonable for downtown. The persistent downside is elevator reliability, mentioned in nearly every review, along with occasional concerns about building security.',
  },
  {
    id: 5,
    name: 'Southpoint Apartments',
    address: '1050 South Park St',
    neighbourhood: 'South End',
    rating: 2.5,
    reviews: 4,
    stars: 3,
    tags: ['Laundry issues', 'Slow maintenance', 'Near the park'],
    gradient: 'linear-gradient(160deg, #c47a3c 0%, #7c3d10 100%)',
    description: 'Walk-up apartments a block from the Public Gardens.',
    landlord: 'Metro Rentals',
    units: 54,
    yearBuilt: 1982,
    aiSummary:
      'Location near the park is a plus, but reviews are dominated by maintenance frustrations: unreliable heating, frequently broken laundry machines, and slow responses to tickets. Deposits are reportedly returned fairly.',
  },
]

const ALEX = { name: 'Alex Mitchell', email: 'alex@dal.ca' }

// Seed reviews. `comments` are threaded replies on a review.
export const REVIEWS = [
  // ── Le Marchant Towers (id 3) ──
  {
    id: 1,
    apartmentId: 3,
    author: { name: 'James Chen', email: 'james@example.com' },
    date: '2024-04-03',
    rating: 4,
    text: 'Good building overall. Management is professional and responsive within 48 hours for most issues. The parking situation is genuinely bad though. I waited five months for a spot.',
    comments: [
      {
        author: ALEX,
        date: '2024-04-04',
        text: 'How long was the parking waitlist when you moved in?',
      },
    ],
  },
  {
    id: 2,
    apartmentId: 3,
    author: ALEX,
    date: '2024-03-19',
    rating: 4,
    text: "Lived here for two years. Quiet neighbours, solid construction, and the Quinpool Road location is extremely convenient. Elevator breaks down about once a month but they're usually on it within the day.",
    comments: [],
  },
  {
    id: 3,
    apartmentId: 3,
    author: { name: 'Priya Sharma', email: 'priya@example.com' },
    date: '2024-02-10',
    rating: 3,
    text: 'Great location near everything, but parking is a real problem — the waitlist for a spot was over six months. Hallway carpets are dated and could use replacing.',
    comments: [],
  },

  // ── Southpoint Apartments (id 5) ──
  {
    id: 4,
    apartmentId: 5,
    author: ALEX,
    date: '2024-01-15',
    rating: 3,
    text: 'Decent location near the park but the building has issues. Heater in my unit broke during winter and it took four days to fix. Deposit was returned in full though, which I appreciated.',
    comments: [],
  },
  {
    id: 5,
    apartmentId: 5,
    author: ALEX,
    date: '2023-11-20',
    rating: 3,
    text: 'Average experience overall. The laundry room is always busy and half the machines are broken. Common areas are cleaned occasionally but not often enough.',
    comments: [],
  },
  {
    id: 10,
    apartmentId: 5,
    author: { name: 'Dana White', email: 'dana@example.com' },
    date: '2023-12-01',
    rating: 2,
    text: 'Laundry is a recurring problem and the heating is unreliable. Management is slow to respond to maintenance tickets.',
    comments: [
      {
        author: ALEX,
        date: '2023-12-03',
        text: 'Same experience with the heating here — took days to get a response.',
      },
    ],
  },

  // ── Fenwick Tower (id 4) ──
  {
    id: 6,
    apartmentId: 4,
    author: ALEX,
    date: '2023-09-05',
    rating: 4,
    text: 'The view from the 28th floor is incredible. You can see the harbour, Dartmouth, and McNabs Island. Location is unbeatable for getting downtown.',
    comments: [],
  },
  {
    id: 7,
    apartmentId: 4,
    author: ALEX,
    date: '2023-06-12',
    rating: 4,
    text: 'Rent is very reasonable for downtown Halifax. The unit itself is fine, nothing fancy but functional. Laundry facilities are dated but they work.',
    comments: [],
  },
  {
    id: 9,
    apartmentId: 4,
    author: { name: 'Marcus Lee', email: 'marcus@example.com' },
    date: '2023-08-01',
    rating: 3,
    text: "Elevators are constantly out of service. I've been stuck waiting fifteen minutes more than once. Otherwise the views make up for a lot.",
    comments: [
      {
        author: ALEX,
        date: '2023-08-02',
        text: 'Did maintenance ever give a timeline for fixing the elevators?',
      },
    ],
  },

  // ── Park Victoria (id 2) ──
  {
    id: 8,
    apartmentId: 2,
    author: ALEX,
    date: '2023-03-01',
    rating: 4,
    text: 'Well maintained building with a quiet atmosphere. A bit pricey for what you get, but management is responsive and the location is solid.',
    comments: [],
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
