import express from "express";
const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({ message: "Pong from backend" }); // ✅ this sends JSON
  });
  

export default router;
