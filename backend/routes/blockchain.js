// backend/routes/auth.js
import express from "express";

const router = express.Router();

// Example route
router.post("/blockchain", (req, res) => {
  res.json({ message: "blockchain endpoint" });
});

export default router;
