import express from "express";
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();

router.post("/", createPlaylist);
router.get("/:userId", getPlaylists);
router.put("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);

export default router;
