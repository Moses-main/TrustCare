import express from 'express';
import auth from '../middleware/auth.js';
import {
  createAppointment,
  getPatientAppointments,
  getProviderAppointments,
  updateAppointmentStatus,
  getAvailableSlots
} from '../controllers/appointmentController.js';

const router = express.Router();

// Protected routes (require authentication)
router.use(auth);

// Patient routes
router.get('/patient/:userId', getPatientAppointments);

// Provider routes
router.get('/provider/:providerId', getProviderAppointments);
router.get('/slots/:providerId/:date', getAvailableSlots);

// Appointment management
router.post('/', createAppointment);
router.put('/:appointmentId/status', updateAppointmentStatus);

export default router;
