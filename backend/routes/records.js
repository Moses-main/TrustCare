import express from "express";
import {
  createMedicalRecord,
  getPatientRecords,
  downloadMedicalRecord,
  getProviderRecords,
  getMyRecords
} from "../controllers/recordController.js";
import auth from "../middleware/auth.js";
import multer from "multer";

const upload = multer(); // Store in memory

const router = express.Router();

// Create new medical record
router.post("/create", auth, upload.single("file"), createMedicalRecord);

// Get all records for the current patient
router.get("/me/records", auth, getMyRecords);

// Get all records for a specific patient (by wallet)
router.get("/:patientWallet", auth, getPatientRecords);

// Download a record
router.get("/download/:recordId", auth, downloadMedicalRecord);

// Get all records for the current provider
router.get("/provider/records", auth, getProviderRecords);

export default router;
