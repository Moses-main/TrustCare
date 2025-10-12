import Appointment from '../models/Appointment.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req, res) => {
  try {
    const { patientId, providerId, date, time, reason } = req.body;
    
    const appointment = await Appointment.create({
      patient: patientId,
      provider: providerId,
      date,
      time,
      reason,
      status: 'scheduled'
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

// @desc    Get appointments for a patient
// @route   GET /api/appointments/patient/:userId
// @access  Private
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.userId })
      .populate('provider', 'name email')
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

// @desc    Get appointments for a provider
// @route   GET /api/appointments/provider/:providerId
// @access  Private
export const getProviderAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ provider: req.params.providerId })
      .populate('patient', 'name email')
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching provider appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

// @desc    Get available time slots for a provider on a specific date
// @route   GET /api/appointments/slots/:providerId/:date
// @access  Private
export const getAvailableSlots = async (req, res) => {
  try {
    const { providerId, date } = req.params;
    
    // Get all appointments for the provider on the given date
    const appointments = await Appointment.find({
      provider: providerId,
      date: new Date(date),
      status: { $ne: 'cancelled' }
    });

    // Generate available time slots (example: 9 AM to 5 PM, 30-minute slots)
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17;  // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Add :00 and :30 time slots
      ['00', '30'].forEach(minutes => {
        const time = `${hour.toString().padStart(2, '0')}:${minutes}`;
        const isBooked = appointments.some(apt => apt.time === time);
        if (!isBooked) {
          slots.push(time);
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        date,
        provider: providerId,
        availableSlots: slots
      }
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching available slots',
      error: error.message
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:appointmentId/status
// @access  Private
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating appointment status',
      error: error.message
    });
  }
};
