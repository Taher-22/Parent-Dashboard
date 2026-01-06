import express from "express";
import cors from "cors";
import authRoutes from "./auth/auth.routes.js";
import { requireAuth } from "./auth/authMiddleware.js";
import "dotenv/config";


const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("EduGalaxy API is running ✅");
});

app.use("/api/auth", authRoutes);

app.get("/api/me", requireAuth, (req, res) => {
  res.json(req.auth);
});

app.get("/api/overview", requireAuth, (req, res) => {
  res.json({
    todayFocusMinutes: 42,
  });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`✅ API running on port ${PORT}`);
});

