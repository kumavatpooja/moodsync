import express from "express";
const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({ message: "" }); // ✅ this sends JSON
  });
  

export default router;
