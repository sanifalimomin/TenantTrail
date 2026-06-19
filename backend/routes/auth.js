import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool, nextId } from "../db.js";

const router = Router();

// Sign a JWT carrying the user's id. It is the proof the client sends back
// on every request.
export function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// POST /api/auth/signup — hash the password, insert the user, return a token.
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "name, email and password are required" });

  try {
    const hash = await bcrypt.hash(password, 10);
    const id = await nextId("users");
    await pool.query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [id, name, email, hash]
    );
    res.status(201).json({ token: signToken(id), user: { id, name, email } });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({ error: "Email already registered" });
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// POST /api/auth/login — check the password, then sign a JWT.
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  res.json({
    token: signToken(user.id),
    user: { id: user.id, name: user.name, email: user.email },
  });
});

export default router;
