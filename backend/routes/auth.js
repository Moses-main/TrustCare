import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  updatePassword,
  verifyEmail,
  resendVerificationEmail
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, getMe);

// Email verification routes
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/update-password", auth, updatePassword);

export default router;
