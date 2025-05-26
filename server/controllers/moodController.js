import Mood from "../models/Mood.js";

export const createMood = async (req, res) => {
  try {
    const mood = await Mood.create({ userId: req.body.userId, mood: req.body.mood });
    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
