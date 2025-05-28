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

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // Vite local dev
  "http://localhost:3000", // React dev server (if used)
  "https://glittering-taffy-d762d8.netlify.app", // ✅ Netlify deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `❌ The CORS policy does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // ✅ Only if you're using cookies or sessions
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
