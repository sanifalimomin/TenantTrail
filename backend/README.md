# TenantTrails API

Lab 5 backend for TenantTrails — a REST API built with Express that serves the
React app from a MySQL database. Covers authentication (bcrypt + JWT), the
dashboard and apartment endpoints, image uploads to a CDN (Cloudinary), and
tests.

## Stack

- **Express 4** — routing and middleware
- **mysql2** — connection pool to the `tenanttrails` database
- **bcrypt** + **jsonwebtoken** — password hashing and JWT auth
- **multer** + **cloudinary** — image upload to a CDN
- **vitest** + **supertest** — automated API tests

## Setup

```bash
cd backend
npm install
cp .env.example .env      # then fill in the values
```

Make sure the `tenanttrails` MySQL database and its `apartments`, `users`,
`reviews`, and `comments` tables exist.

Fill in `.env`:

- `DB_*` — your local MySQL credentials
- `JWT_SECRET` — any long random string
- `CLOUDINARY_*` — from the Cloudinary Console (Settings → API Keys)

Create a user through `POST /api/auth/signup`, then log in with the same
credentials — the password is hashed on signup and verified on login.

## Run

```bash
npm run dev      # nodemon, restarts on save
npm start        # plain node
# → API on http://localhost:3000
```

## Test

```bash
npm test         # vitest + supertest (mocks the DB, no MySQL needed)
```

## Endpoints

| Method | Path                          | Auth | Description                                   |
| ------ | ----------------------------- | ---- | --------------------------------------------- |
| GET    | `/api/health`                 | —    | Health check                                  |
| POST   | `/api/auth/signup`            | —    | Create a user, returns a JWT                  |
| POST   | `/api/auth/login`             | —    | Log in, returns a JWT                         |
| GET    | `/api/apartments`             | —    | Dashboard list with rating + review count     |
| GET    | `/api/apartments/:id`         | —    | One apartment with its reviews                 |
| POST   | `/api/apartments/:id/reviews` | ✓    | Add a review (author taken from the token)    |
| POST   | `/api/upload`                 | ✓    | Upload an image, returns the Cloudinary URL   |

Protected routes expect an `Authorization: Bearer <token>` header. No token
returns **401**; a missing resource returns **404**.

## Project structure

```
backend/
├── server.js            entry point, starts Express
├── app.js               the Express app (exported for tests)
├── db.js                the mysql2 pool
├── cloudinary.js        Cloudinary SDK config
├── middleware/
│   └── auth.js          JWT verification middleware
├── routes/
│   ├── auth.js          signup + login
│   ├── apartments.js    list + detail (reads)
│   ├── reviews.js       add review (write)
│   └── upload.js        Cloudinary image upload
├── tests/
│   └── api.test.js
├── postman_collection.json
├── .env.example
└── package.json
```

## Testing in Postman

Import `postman_collection.json`. Run **Signup** (or **Login**) first — it saves
the returned token into a `{{token}}` collection variable that the protected
requests reuse automatically.
