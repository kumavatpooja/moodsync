import express from "express";
import { createMood, getUserMoods } from "../controllers/moodController.js";

const router = express.Router();

router.post("/", createMood);
router.get("/:userId", getUserMoods);

export default router;
