// backend/routes/providers.js
import express from "express";
import auth from "../middleware/auth.js";
import { getAllPatients } from "../controllers/patientController.js";

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all patients (for providers)
router.get("/patients", getAllPatients);

export default router;
