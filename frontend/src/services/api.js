import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4500/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/signup", userData),
  getMe: () => api.get("/auth/me"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post(`/auth/reset-password/${token}`, { password }),
  updatePassword: (currentPassword, newPassword) =>
    api.put("/auth/update-password", { currentPassword, newPassword }),
};

// Users API
export const usersAPI = {
  getUsers: (params) => api.get("/users", { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
};

// Appointments API
export const appointmentsAPI = {
  createAppointment: (appointmentData) =>
    api.post("/appointments", appointmentData),
  getAppointments: (params) => api.get("/appointments", { params }),
  getAppointment: (id) => api.get(`/appointments/${id}`),
  updateAppointment: (id, updateData) =>
    api.put(`/appointments/${id}`, updateData),
  updateAppointmentStatus: (id, status) =>
    api.put(`/appointments/${id}/status`, { status }),
  getAvailableSlots: (providerId, date) =>
    api.get(`/appointments/slots/${providerId}/${date}`),
  getPatientAppointments: (patientId) =>
    api.get(`/appointments/patient/${patientId}`),
  getProviderAppointments: (providerId) =>
    api.get(`/appointments/provider/${providerId}`),
};

// Patients API
export const patientsAPI = {
  // Get current patient profile
  getProfile: () => api.get("/patients/me"),

  // Update patient profile
  updateProfile: (data) => api.put("/patients/me", data),

  // Get patient by ID (admin only)
  getPatient: (id) => api.get(`/patients/${id}`),

  // Get all patients (admin only)
  getAllPatients: () => api.get("/patients"),

  // Get patient appointments
  getAppointments: (patientId) =>
    api.get(`/patients/${patientId}/appointments`),

  // Create a new appointment
  createAppointment: (appointmentData) =>
    api.post("/appointments", appointmentData),

  // Get available time slots
  getAvailableSlots: (providerId, date) =>
    api.get(`/appointments/available/${providerId}?date=${date}`),

  getPatient: (id) => api.get(`/patients/${id}`),
  updatePatient: (id, patientData) => api.put(`/patients/${id}`, patientData),
  getPatientRecords: (patientId) => api.get(`/patients/${patientId}/records`),
};

// Records API
export const recordsAPI = {
  createRecord: (recordData) => api.post("/records", recordData),
  getRecord: (id) => api.get(`/records/${id}`),
  updateRecord: (id, recordData) => api.put(`/records/${id}`, recordData),
  deleteRecord: (id) => api.delete(`/records/${id}`),
};

export default api;
