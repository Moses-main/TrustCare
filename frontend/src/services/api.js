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
  // Authentication
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/signup", userData),
  getMe: () => api.get("/auth/me"),
  updateMe: (userData) => api.put("/auth/me", userData),
  
  // Password Management
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  updatePassword: (currentPassword, newPassword) => api.put("/auth/update-password", { currentPassword, newPassword }),
  
  // Email Verification
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerificationEmail: (email) => api.post("/auth/resend-verification", { email }),
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
  // Profile Management
  getProfile: () => api.get("/patients/me"),
  updateProfile: (data) => api.put("/patients/me", data),
  
  // Patient Records
  getPatientRecords: (patientId) => api.get(`/patients/${patientId}/records`),
  getRecord: (recordId) => api.get(`/records/${recordId}`),
  
  // Appointments
  getAppointments: (patientId) => api.get(`/patients/${patientId}/appointments`),
  createAppointment: (appointmentData) => api.post("/appointments", appointmentData),
  cancelAppointment: (appointmentId) => api.delete(`/appointments/${appointmentId}`),
  
  // Provider Search
  searchProviders: (query) => api.get("/providers/search", { params: query }),
  getProviderDetails: (providerId) => api.get(`/providers/${providerId}`),
  
  // Availability
  getAvailableSlots: (providerId, date) => api.get(`/appointments/available/${providerId}?date=${date}`),
  
  // Admin Only
  getAllPatients: (params) => api.get("/patients", { params }),
  getPatient: (id) => api.get(`/patients/${id}`),
  updatePatient: (id, patientData) => api.put(`/patients/${id}`, patientData),
};

// Providers API
export const providersAPI = {
  // Provider Profile
  getProfile: () => api.get("/providers/me"),
  updateProfile: (data) => api.put("/providers/me", data),
  
  // Provider Search
  search: (query) => api.get("/providers/search", { params: query }),
  getProvider: (id) => api.get(`/providers/${id}`),
  
  // Availability
  setAvailability: (availability) => api.post("/providers/availability", availability),
  getAvailability: (providerId, startDate, endDate) => 
    api.get(`/providers/${providerId}/availability?start=${startDate}&end=${endDate}`),
  
  // Appointments
  getUpcomingAppointments: () => api.get("/providers/me/appointments/upcoming"),
  getPastAppointments: (limit = 10) => api.get(`/providers/me/appointments/past?limit=${limit}`),
  updateAppointmentStatus: (appointmentId, status) => 
    api.put(`/appointments/${appointmentId}/status`, { status }),
  
  // Patient Records
  getPatientRecords: (patientId) => api.get(`/providers/patients/${patientId}/records`),
  addRecordNote: (recordId, note) => api.post(`/records/${recordId}/notes`, { note }),
};

// Records API
export const recordsAPI = {
  // Record Management
  createRecord: (recordData) => {
    const formData = new FormData();
    
    // Append file if it exists
    if (recordData.file) {
      formData.append('file', recordData.file);
    }
    
    // Append other fields
    formData.append('patientWallet', recordData.patientWallet);
    formData.append('recordType', recordData.recordType);
    formData.append('metadata', JSON.stringify(recordData.metadata || {}));
    formData.append('clinical', JSON.stringify(recordData.clinical || {}));
    
    return api.post("/records/create", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // Record Access
  getRecord: (id) => api.get(`/records/${id}`),
  getPatientRecords: (patientWallet) => api.get(`/records/${patientWallet}`),
  downloadRecord: (recordId) => api.get(`/records/${recordId}/download`, { responseType: 'blob' }),
  
  // Record Sharing
  shareRecord: (recordId, sharedWith) => api.post(`/records/${recordId}/share`, { sharedWith }),
  revokeAccess: (recordId, walletAddress) => api.delete(`/records/${recordId}/share/${walletAddress}`),
  
  // Record Management
  updateRecord: (id, recordData) => api.put(`/records/${id}`, recordData),
  deleteRecord: (id) => api.delete(`/records/${id}`),
  
  // Verification
  verifyRecord: (recordId) => api.get(`/records/${recordId}/verify`),
};

export default api;
