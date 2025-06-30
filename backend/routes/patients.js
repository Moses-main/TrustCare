// backend/routes/patients.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  getPatientProfile,
  updatePatientProfile,
  grantAccessToProvider,
  getAccessPermissions,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/profile", auth, getPatientProfile);
router.put("/profile", auth, updatePatientProfile);
router.post("/grant-access", auth, grantAccessToProvider);
router.get("/permissions", auth, getAccessPermissions);

export default router;
