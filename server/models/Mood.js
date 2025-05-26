import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mood: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Mood", moodSchema);
