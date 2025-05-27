import express from "express";
const router = express.Router();

router.get("/ping", (req, res) => {
    res.send("Pong from backend");
    // ✅ Sends proper JSON
});

export default router;
