import { Router } from "express";
import { pool, nextId } from "../db.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// POST /api/apartments/:id/reviews — add a review. Auth required: the author
// comes from the token, never the body.
router.post("/apartments/:id/reviews", auth, async (req, res) => {
  const aptId = Number(req.params.id);
  const { rating, body } = req.body;
  if (!rating || !body)
    return res.status(400).json({ error: "rating and body are required" });

  const [[apt]] = await pool.query(
    "SELECT id FROM apartments WHERE id = ?",
    [aptId]
  );
  if (!apt) return res.status(404).json({ error: "Apartment not found" });

  const id = await nextId("reviews");
  await pool.query(
    "INSERT INTO reviews (id, apt_id, user_id, rating, body, created) VALUES (?, ?, ?, ?, ?, CURDATE())",
    [id, aptId, req.user.id, rating, body]
  );
  res.status(201).json({ id, apt_id: aptId, user_id: req.user.id, rating, body });
});

export default router;
