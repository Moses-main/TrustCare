// backend/routes/auth.js
import express from "express";

const router = express.Router();

// Example route
router.post("/provider", (req, res) => {
  res.json({ message: "Provider endpoint" });
});

export default router;
