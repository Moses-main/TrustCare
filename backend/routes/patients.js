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

router.use(auth);
// All patient routes require authentication

router.get("/profile", getPatientProfile);
router.put("/profile", updatePatientProfile);
router.post("/grant-access", grantAccessToProvider);
router.get("/permissions", getAccessPermissions);

export default router;
