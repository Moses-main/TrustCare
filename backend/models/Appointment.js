import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true,
    default: () => `APT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  },
  patientId: {
    type: String,
    ref: 'User',
    required: true
  },
  providerId: {
    type: String,
    ref: 'User',
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: [
      'general-checkup',
      'consultation',
      'follow-up',
      'emergency',
      'lab-test',
      'vaccination',
      'surgery',
      'therapy',
      'other'
    ]
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);
