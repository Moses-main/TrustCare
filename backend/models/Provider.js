// backend/models/Provider.js
import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  profile: {
    firstName: String,
    lastName: String,
    title: String, // Dr., Nurse, etc.
    specialization: [String],
    licenseNumber: String,
    npiNumber: String, // National Provider Identifier
    phone: String,
    organization: {
      name: String,
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
      },
      phone: String,
      website: String
    }
  },
  credentials: {
    medicalSchool: String,
    residency: String,
    boardCertifications: [String],
    licenseExpiry: Date,
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    verifiedBy: String,
    verificationDate: Date
  },
  permissions: {
    canCreateRecords: { type: Boolean, default: true },
    canViewRecords: { type: Boolean, default: true },
    canPrescribe: { type: Boolean, default: false },
    emergencyAccess: { type: Boolean, default: false }
  },
  statistics: {
    patientsServed: { type: Number, default: 0 },
    recordsCreated: { type: Number, default: 0 },
    lastActivity: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

providerSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;
