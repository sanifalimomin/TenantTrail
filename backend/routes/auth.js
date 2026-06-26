import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db, nextId } from "../app.js";
import { auth } from "../middleware/auth.js";

const router = Router();

export function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function setAuthCookie(res, id) {
  res.cookie("token", signToken(id), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "name, email and password are required" });

  try {
    const hash = await bcrypt.hash(password, 10);
    const id = await nextId("users");
    await db.query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [id, name, email, hash]
    );
    setAuthCookie(res, id);
    res.status(201).json({ user: { id, name, email } });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res.status(400).json({ error: "Email already registered" });
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const [[user]] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  setAuthCookie(res, user.id);
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

router.get("/me", auth, async (req, res) => {
  const [[user]] = await db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [req.user.id]
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

export default router;
