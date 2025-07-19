import express from "express";
import {
  createMedicalRecord,
  getPatientRecords,
  downloadMedicalRecord,
} from "../controllers/recordController.js";
import auth from "../middleware/auth.js";
import multer from "multer";

const upload = multer(); // Store in memory

const router = express.Router();

// Create new medical record
router.post("/create", auth, upload.single("file"), createMedicalRecord);

// Get all records for a patient (by wallet)
router.get("/patient/:patientWallet", auth, getPatientRecords);

// Download a record
router.get("/download/:recordId", auth, downloadMedicalRecord);

export default router;
