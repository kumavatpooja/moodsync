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

// Allowed origins including your Vite frontend running on localhost:5173
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000", // optional, if you use React dev server
  // add deployed frontend URL here, e.g.
  // "https://yourfrontenddomain.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like Postman or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
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
