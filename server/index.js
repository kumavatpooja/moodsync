import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();

const app = express();

// Middleware with explicit CORS origin for local frontend
app.use(cors({
  origin: "http://localhost:3000",  // change port if your frontend runs elsewhere
}));
app.use(express.json());

// Connect to MongoDB
console.log("👉 Starting server...");
connectDB();
console.log("👉 After DB connect call");

// Test root route
app.get("/", (req, res) => {
  res.send("MoodSync Backend is Running ✅");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/test", testRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
