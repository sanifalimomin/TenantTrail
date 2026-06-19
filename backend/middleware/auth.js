import jwt from "jsonwebtoken";

// Middleware verifies the token and attaches the user to the request.
// req.user ends up holding { id } — the author of a write comes from the
// token, never from the request body.
export function auth(req, res, next) {
  const header = req.headers.authorization; // "Bearer <token>"
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next(); // token is valid
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
