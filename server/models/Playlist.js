import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  tracks: [String], // URLs or titles
});

export default mongoose.model("Playlist", playlistSchema);
