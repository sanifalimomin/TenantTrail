import { Router } from "express";
import { db } from "../app.js";

const router = Router();

router.get("/apartments", async (req, res) => {
  const [rows] = await db.query(`
    SELECT a.*,
           ROUND(AVG(r.rating), 1) AS rating,
           COUNT(r.id)             AS reviews
    FROM apartments a
    LEFT JOIN reviews r ON r.apt_id = a.id
    GROUP BY a.id
  `);
  res.json(rows);
});

router.get("/apartments/:id", async (req, res) => {
  const [[apartment]] = await db.query(
    `
    SELECT a.*,
           ROUND(AVG(r.rating), 1) AS rating,
           COUNT(r.id)             AS reviews
    FROM apartments a
    LEFT JOIN reviews r ON r.apt_id = a.id
    WHERE a.id = ?
    GROUP BY a.id
  `,
    [req.params.id]
  );

  if (!apartment) return res.status(404).json({ error: "Apartment not found" });

  res.json(apartment);
});

export default router;
