import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import testRoutes from './routes/testRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("MoodSync Backend is Running ✅");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/playlists", playlistRoutes);
app.use('/api/test', testRoutes); // Register test routes here

const PORT = process.env.PORT || 5000;

// Async start function
async function startServer() {
  try {
    console.log("👉 Connecting to MongoDB...");
    await connectDB(); // Wait for DB connection before starting server
    console.log("👉 MongoDB connected!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB, server not started:", error);
  }
}

// Start the server
startServer();
