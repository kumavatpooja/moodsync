import Playlist from "../models/Playlist.js";

export const createPlaylist = async (req, res) => {
  try {
    const { userId, name, tracks } = req.body;
    const playlist = await Playlist.create({ userId, name, tracks });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.params.userId });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
