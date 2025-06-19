import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import {
  createMedicalRecord,
  getPatientRecords,
  downloadMedicalRecord,
} from "../controllers/recordController.js";

const router = express.Router();

router.post("/create", auth, upload.single("file"), createMedicalRecord);
router.get("/patient/:patientWallet", auth, getPatientRecords);
router.get("/download/:recordId", auth, downloadMedicalRecord);

export default router;
