import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  updatePassword
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/update-password", auth, updatePassword);

export default router;
