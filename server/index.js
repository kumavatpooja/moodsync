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

// Allowed frontend origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Vite local dev server
  "http://localhost:3000",  // React dev server (optional)
  'https://moodsyncapp.netlify.app', // Your Netlify deployed frontend URL
];

// CORS Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `❌ The CORS policy does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  // credentials: true, // Enable only if using cookies or sessions
}));

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
console.log("👉 Starting server...");
connectDB();
console.log("👉 After DB connect call");

// Root test route
app.get("/", (req, res) => {
  res.send("MoodSync Backend is Running ✅");
});

// API Routes
app.use("/api/auth", authRoutes);         // Auth routes: /api/auth/login, /api/auth/register, etc.
app.use("/api/moods", moodRoutes);        // Mood-related routes
app.use("/api/playlists", playlistRoutes);// Playlist-related routes
app.use("/api/test", testRoutes);         // Test routes (e.g., /api/test/ping)

// Server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
