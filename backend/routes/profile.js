import { Router } from "express";
import { db } from "../app.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/profile", auth, async (req, res) => {
  const [[user]] = await db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [req.user.id]
  );
  if (!user) return res.status(404).json({ error: "User not found" });

  const [reviews] = await db.query(
    `
    SELECT r.id,
           r.apt_id    AS aptId,
           r.rating,
           r.body,
           r.image_url AS imageUrl,
           r.created   AS date,
           a.name      AS aptName
    FROM reviews r
    JOIN apartments a ON a.id = r.apt_id
    WHERE r.user_id = ?
    ORDER BY r.created DESC, r.id DESC
  `,
    [req.user.id]
  );

  res.json({ user, reviews });
});

export default router;
