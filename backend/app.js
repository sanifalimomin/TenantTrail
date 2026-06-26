import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mysql from "mysql2/promise";

import authRoutes from "./routes/auth.js";
import apartmentRoutes from "./routes/apartments.js";
import reviewRoutes from "./routes/reviews.js";
import profileRoutes from "./routes/profile.js";
import uploadRoutes from "./routes/upload.js";

export const db = await mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "tenanttrails",
});

export async function nextId(table) {
  const [[{ id }]] = await db.query(
    `SELECT COALESCE(MAX(id), 0) + 1 AS id FROM ${table}`
  );
  return id;
}

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api", apartmentRoutes);
app.use("/api", reviewRoutes);
app.use("/api", profileRoutes);
app.use("/api", uploadRoutes);

export default app;
