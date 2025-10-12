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
    const permissions = await blockchainService.getAccessPermissions(
      req.user.walletAddress
    );
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all patients (for providers)
export const getAllPatients = async (req, res) => {
  try {
    console.log('Fetching all patients...');
    
    // In a real app, you would want to add proper access controls here
    // to ensure only authorized providers can access this endpoint
    const patients = await Patient.find({})
      .select('-password -__v')
      .lean(); // Convert to plain JavaScript objects
      
    console.log(`Found ${patients.length} patients`);
    
    // Transform data to match frontend expectations
    const transformedPatients = patients.map(patient => ({
      ...patient,
      id: patient._id, // Add id field for frontend
      name: patient.fullName,
      email: patient.contactInfo?.email || '',
      phone: patient.contactInfo?.phone || 'Not provided',
      status: 'active',
      lastVisit: patient.updatedAt ? new Date(patient.updatedAt).toISOString().split('T')[0] : 'N/A'
    }));
    
    res.json(transformedPatients);
  } catch (error) {
    console.error('Error in getAllPatients:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch patients',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
