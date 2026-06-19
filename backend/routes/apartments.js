import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET /api/apartments — the dashboard list, each card with its rating and
// review count. LEFT JOIN keeps apartments with zero reviews.
router.get("/apartments", async (req, res) => {
  const [rows] = await pool.query(`
    SELECT a.*,
           ROUND(AVG(r.rating), 1) AS rating,
           COUNT(r.id)             AS reviews
    FROM apartments a
    LEFT JOIN reviews r ON r.apt_id = a.id
    GROUP BY a.id
  `);
  res.json(rows);
});

// GET /api/apartments/:id — one apartment with its reviews.
router.get("/apartments/:id", async (req, res) => {
  const { id } = req.params;

  const [[apartment]] = await pool.query(
    `
    SELECT a.*,
           ROUND(AVG(r.rating), 1) AS rating,
           COUNT(r.id)             AS reviews
    FROM apartments a
    LEFT JOIN reviews r ON r.apt_id = a.id
    WHERE a.id = ?
    GROUP BY a.id
  `,
    [id]
  );

  if (!apartment) return res.status(404).json({ error: "Apartment not found" });

  const [reviewList] = await pool.query(
    `
    SELECT r.id, r.rating, r.body, r.created,
           u.id AS user_id, u.name AS author
    FROM reviews r
    JOIN users u ON u.id = r.user_id
    WHERE r.apt_id = ?
    ORDER BY r.created DESC
  `,
    [id]
  );

  res.json({ ...apartment, reviewList });
});

export default router;
