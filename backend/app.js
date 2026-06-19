import "dotenv/config"; // load .env before anything reads process.env
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import apartmentRoutes from "./routes/apartments.js";
import reviewRoutes from "./routes/reviews.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

// Middleware runs before the routes.
app.use(cors()); // allow the React frontend's origin
app.use(express.json()); // parse JSON request bodies

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api", apartmentRoutes);
app.use("/api", reviewRoutes);
app.use("/api", uploadRoutes);

export default app;
