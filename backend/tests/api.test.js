import { describe, it, expect, vi } from "vitest";
import request from "supertest";

// Mock the database pool so the tests run without a live MySQL server and
// assert behaviour deterministically.
vi.mock("../db.js", () => ({
  pool: {
    query: vi.fn(async (sql) => {
      if (/FROM apartments/i.test(sql)) {
        return [[{ id: 1, name: "The Marlstone", rating: 5, reviews: 1 }]];
      }
      return [[]];
    }),
  },
}));

const { default: app } = await import("../app.js");

describe("apartments API", () => {
  it("lists apartments", async () => {
    const res = await request(app).get("/api/apartments");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("blocks an unauthenticated review", async () => {
    const res = await request(app)
      .post("/api/apartments/1/reviews")
      .send({ rating: 5, body: "Nice" });
    expect(res.status).toBe(401);
  });
});
