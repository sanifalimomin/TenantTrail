import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

const query = vi.fn(async (sql) => {
  if (/SELECT user_id FROM reviews/i.test(sql)) {
    return [[{ user_id: 2 }]];
  }
  if (/FROM apartments/i.test(sql)) {
    return [[{ id: 1, name: "The Marlstone", rating: 5, reviews: 1 }]];
  }
  return [[]];
});

vi.mock("mysql2/promise", () => ({
  default: {
    createConnection: vi.fn(async () => ({ query })),
  },
}));

const { default: app } = await import("../app.js");

const cookieFor = (id) => `token=${jwt.sign({ id }, process.env.JWT_SECRET)}`;

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

describe("auth", () => {
  it("rejects /me without a cookie", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });
});

describe("authorization", () => {
  it("forbids editing someone else's review (403)", async () => {
    const res = await request(app)
      .put("/api/reviews/9")
      .set("Cookie", cookieFor(1))
      .send({ rating: 4, body: "Edited" });
    expect(res.status).toBe(403);
  });

  it("forbids deleting someone else's review (403)", async () => {
    const res = await request(app)
      .delete("/api/reviews/9")
      .set("Cookie", cookieFor(1));
    expect(res.status).toBe(403);
  });
});
