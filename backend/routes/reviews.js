import { Router } from "express";
import { db, nextId } from "../app.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/apartments/:id/reviews", async (req, res) => {
  const [reviews] = await db.query(
    `
    SELECT r.id,
           r.apt_id    AS aptId,
           r.user_id   AS userId,
           r.rating,
           r.body,
           r.image_url AS imageUrl,
           r.created   AS date,
           u.name      AS author
    FROM reviews r
    JOIN users u ON u.id = r.user_id
    WHERE r.apt_id = ?
    ORDER BY r.created DESC, r.id DESC
  `,
    [req.params.id]
  );
  res.json(reviews);
});

router.post("/apartments/:id/reviews", auth, async (req, res) => {
  const aptId = Number(req.params.id);
  const { rating, body, imageUrl } = req.body;
  if (!rating || !body)
    return res.status(400).json({ error: "rating and body are required" });

  const [[apt]] = await db.query(
    "SELECT id FROM apartments WHERE id = ?",
    [aptId]
  );
  if (!apt) return res.status(404).json({ error: "Apartment not found" });

  const id = await nextId("reviews");
  await db.query(
    "INSERT INTO reviews (id, apt_id, user_id, rating, body, image_url, created) VALUES (?, ?, ?, ?, ?, ?, CURDATE())",
    [id, aptId, req.user.id, rating, body, imageUrl || null]
  );
  res.status(201).json({
    id,
    aptId,
    userId: req.user.id,
    rating,
    body,
    imageUrl: imageUrl || null,
  });
});

router.put("/reviews/:id", auth, async (req, res) => {
  const [[review]] = await db.query(
    "SELECT user_id FROM reviews WHERE id = ?",
    [req.params.id]
  );
  if (!review) return res.status(404).json({ error: "Not found" });
  if (review.user_id !== req.user.id)
    return res.status(403).json({ error: "Not your review" });

  const { rating, body, imageUrl } = req.body;
  if (!rating || !body)
    return res.status(400).json({ error: "rating and body are required" });

  await db.query(
    "UPDATE reviews SET rating = ?, body = ?, image_url = ? WHERE id = ?",
    [rating, body, imageUrl || null, req.params.id]
  );
  res.json({ ok: true });
});

router.delete("/reviews/:id", auth, async (req, res) => {
  const [[review]] = await db.query(
    "SELECT user_id FROM reviews WHERE id = ?",
    [req.params.id]
  );
  if (!review) return res.status(404).json({ error: "Not found" });
  if (review.user_id !== req.user.id)
    return res.status(403).json({ error: "Not your review" });

  await db.query("DELETE FROM reviews WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

export default router;
