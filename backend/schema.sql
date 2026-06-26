-- TenantTrails schema + seed data.
-- Run against a fresh MySQL database named `tenanttrails`, e.g.:
--   mysql -u root -p tenanttrails < schema.sql
-- The API derives an apartment's rating and review count from the reviews
-- table, so those are not stored columns. The schema uses no AUTO_INCREMENT —
-- the API computes the next id with MAX(id) + 1 (see app.js).

CREATE TABLE IF NOT EXISTS users (
  id       INT PRIMARY KEY,
  name     VARCHAR(120) NOT NULL,
  email    VARCHAR(180) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS apartments (
  id            INT PRIMARY KEY,
  name          VARCHAR(160) NOT NULL,
  address       VARCHAR(200),
  neighbourhood VARCHAR(120),
  description   TEXT,
  landlord      VARCHAR(160),
  units         INT,
  year_built    INT,
  gradient      VARCHAR(200),
  tags          TEXT,            -- comma-separated key issues
  ai_summary    TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
  id        INT PRIMARY KEY,
  apt_id    INT NOT NULL,
  user_id   INT NOT NULL,
  rating    TINYINT NOT NULL,
  body      TEXT NOT NULL,
  image_url VARCHAR(400),       -- optional Cloudinary photo for the review
  created   DATE NOT NULL,
  FOREIGN KEY (apt_id) REFERENCES apartments(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ── Seed: a demo user (password is "password123", bcrypt-hashed) ──
INSERT INTO users (id, name, email, password) VALUES
  (1, 'Alex Mitchell', 'alex@dal.ca', '$2b$10$uIPB..UujNaNM1yR59.uAOC1RA0la0HZJ7igrFqtQtTxrJqbgaQau');

-- ── Seed: apartments ──
INSERT INTO apartments (id, name, address, neighbourhood, description, landlord, units, year_built, gradient, tags, ai_summary) VALUES
  (1, 'The Marlstone', '5540 Spring Garden Rd', 'Spring Garden', 'Boutique mid-rise steps from the Spring Garden shops.', 'Southwest Properties', 42, 2019, 'linear-gradient(160deg, #93c5a1 0%, #3a9b7a 100%)', '', 'Early reviews are very positive. Tenants highlight the brand-new finishes, the unbeatable Spring Garden location, and quick, friendly management.'),
  (2, 'Park Victoria', '1496 Carlton St', 'South End', 'Established South End building near Victoria Park.', 'Templeton Properties', 120, 1968, 'linear-gradient(160deg, #5b8ab5 0%, #2d4a73 100%)', 'Well maintained,Quiet,Expensive', 'Reviewers describe Park Victoria as well kept and quiet, with responsive management. The main recurring note is price.'),
  (3, 'Le Marchant Towers', '1585 Le Marchant St', 'West End', 'High-rise tower in a quiet residential neighbourhood.', 'Killam Properties', 88, 1975, 'linear-gradient(160deg, #9aad79 0%, #5a7042 100%)', 'Good location,Parking limited,Aging building', 'Tenants consistently praise the location. Parking availability is a recurring complaint, and the building shows its age.'),
  (4, 'Fenwick Tower', '5599 Fenwick St', 'Downtown', 'One of Halifax''s tallest residential towers with harbour views.', 'Templeton Properties', 320, 1971, 'linear-gradient(160deg, #4b5e72 0%, #1e293b 100%)', 'Elevator issues,Great views,Security concerns', 'The standout theme is the view. The persistent downside is elevator reliability.'),
  (5, 'Southpoint Apartments', '1050 South Park St', 'South End', 'Walk-up apartments a block from the Public Gardens.', 'Metro Rentals', 54, 1982, 'linear-gradient(160deg, #c47a3c 0%, #7c3d10 100%)', 'Laundry issues,Slow maintenance,Near the park', 'Location near the park is a plus, but reviews are dominated by maintenance frustrations.');

-- ── Seed: a few reviews from the demo user ──
INSERT INTO reviews (id, apt_id, user_id, rating, body, created) VALUES
  (1, 3, 1, 4, 'Lived here for two years. Quiet neighbours, solid construction, and the Quinpool Road location is extremely convenient. Elevator breaks down about once a month but they are usually on it within the day.', '2024-03-19'),
  (2, 5, 1, 3, 'Decent location near the park but the building has issues. Heater in my unit broke during winter and it took four days to fix. Deposit was returned in full though, which I appreciated.', '2024-01-15'),
  (3, 4, 1, 4, 'The view from the 28th floor is incredible. You can see the harbour, Dartmouth, and McNabs Island. Location is unbeatable for getting downtown.', '2023-09-05'),
  (4, 2, 1, 4, 'Well maintained building with a quiet atmosphere. A bit pricey for what you get, but management is responsive and the location is solid.', '2023-03-01');
