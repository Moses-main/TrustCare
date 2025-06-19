// backend/controllers/patientController.js
import Patient from "../models/Patient.js";
import blockchainService from "../services/blockchainService.js";

export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      walletAddress: req.user.walletAddress,
    });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { walletAddress: req.user.walletAddress },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const grantAccessToProvider = async (req, res) => {
  try {
    const { providerWallet, duration, canRead, canWrite } = req.body;

    const result = await blockchainService.grantAccess(
      req.user.walletAddress,
      providerWallet,
      duration,
      canRead,
      canWrite,
      req.user.privateKey
    );

    if (result.success) {
      req.io.to(providerWallet).emit("access-granted", {
        patient: req.user.walletAddress,
        permissions: { canRead, canWrite },
        expirationTime: Date.now() + duration * 1000,
      });

      res.json({ success: true, transactionHash: result.transactionHash });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccessPermissions = async (req, res) => {
  try {
    res.json({ permissions: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
