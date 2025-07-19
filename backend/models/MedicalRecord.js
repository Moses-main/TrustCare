// backend/models/MedicalRecord.js
import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  recordId: {
    type: String,
    required: true,
    unique: true,
  },
  blockchainTxHash: {
    type: String,
    required: true,
  },
  patientWallet: {
    type: String,
    required: true,
    lowercase: true,
  },
  providerWallet: {
    type: String,
    required: true,
    lowercase: true,
  },
  ipfsHash: {
    type: String,
    required: true,
  },
  recordType: {
    type: String,
    enum: [
      "consultation",
      "lab-result",
      "imaging",
      "prescription",
      "surgery",
      "vaccination",
      "discharge-summary",
    ],
    required: true,
  },
  metadata: {
    title: String,
    description: String,
    fileType: String,
    fileSize: Number,
    encryptionKey: String, // Encrypted with patient's public key
    tags: [String],
  },
  clinical: {
    diagnosis: [String],
    symptoms: [String],
    treatment: String,
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],
    vitalSigns: {
      bloodPressure: String,
      heartRate: Number,
      temperature: Number,
      weight: Number,
      height: Number,
    },
  },
  status: {
    type: String,
    enum: ["draft", "finalized", "amended", "archived"],
    default: "draft",
  },
  accessLog: [
    {
      accessedBy: String,
      accessTime: Date,
      action: String,
      ipAddress: String,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for performance
medicalRecordSchema.index({ patientWallet: 1, createdAt: -1 });
medicalRecordSchema.index({ providerWallet: 1, createdAt: -1 });

// Export the model
const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
