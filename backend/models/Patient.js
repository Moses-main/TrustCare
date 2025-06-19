// backend/models/Patient.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const patientSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  profile: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
  },
  medicalInfo: {
    bloodType: String,
    allergies: [String],
    chronicConditions: [String],
    medications: [String],
    insuranceInfo: {
      provider: String,
      policyNumber: String,
      groupNumber: String,
    },
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
    },
    privacy: {
      shareWithResearch: { type: Boolean, default: false },
      shareWithPublicHealth: { type: Boolean, default: false },
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the `updatedAt` field before each save
patientSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export as default
const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
