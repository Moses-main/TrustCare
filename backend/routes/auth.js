import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  updatePassword,
} from "../controllers/authController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", protect, getMe);
router.put("/update-password", protect, updatePassword);

export default router;
