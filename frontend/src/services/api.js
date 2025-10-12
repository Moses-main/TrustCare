import axios from "axios";
import { toast } from 'react-toastify';

// Create axios instance with default config
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4501/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

console.log('API Base URL:', API_URL); // Debug log

// Request interceptor for API calls
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

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    // Return the successful response data
    return response.data;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      
      // Handle specific status codes
      if (status === 401) {
        // Unauthorized - token expired or invalid
        localStorage.removeItem("token");
        window.location.href = "/login?session=expired";
      }
      
      // Return error message from server or default message
      return Promise.reject({
        message: data?.message || 'An error occurred',
        status,
        data: data?.data || null
      });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({
        message: 'No response from server. Please check your connection.',
        status: 0
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0
      });
    }
  }
);

// Auth API
export const authAPI = {
  /**
   * Login user with email and password
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @returns {Promise<Object>} User data and auth token
   */
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      // Store token in localStorage if available
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - User's full name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @param {string} userData.role - User's role (patient/doctor)
   * @param {string} [userData.walletAddress] - User's wallet address
   * @returns {Promise<Object>} Created user data
   */
  register: async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData);
      // Store token in localStorage if available
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Get current authenticated user's profile
   * @returns {Promise<Object>} User profile data
   */
  getMe: async () => {
    try {
      return await api.get("/auth/me");
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  /**
   * Update current user's profile
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user data
   */
  updateMe: async (userData) => {
    try {
      return await api.put("/auth/me", userData);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
  
  // Password Management
  /**
   * Request password reset email
   * @param {string} email - User's email
   * @returns {Promise<Object>} Success message
   */
  forgotPassword: async (email) => {
    try {
      return await api.post("/auth/forgot-password", { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  /**
   * Reset password with token from email
   * @param {string} token - Password reset token
   * @param {string} password - New password
   * @returns {Promise<Object>} Success message
   */
  resetPassword: async (token, password) => {
    try {
      return await api.post(`/auth/reset-password/${token}`, { password });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  /**
   * Update current user's password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Success message
   */
  updatePassword: async (currentPassword, newPassword) => {
    try {
      return await api.put("/auth/update-password", { currentPassword, newPassword });
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  },
  
  // Email Verification
  /**
   * Verify email with token
   * @param {string} token - Email verification token
   * @returns {Promise<Object>} Success message
   */
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return response;
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  },

  /**
   * Resend verification email
   * @param {string} email - User's email
   * @returns {Promise<Object>} Success message
   */
  resendVerificationEmail: async (email) => {
    try {
      const response = await api.post('/auth/resend-verification', { email });
      return response;
    } catch (error) {
      console.error('Resend verification email error:', error);
      throw error;
    }
  },
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
  
  // Provider Patients
  getProviderPatients: () => api.get("/patients/provider/patients"),
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
  getPatientRecords(patientWallet) {
    return api.get(`/records/${patientWallet}`);
  },
  getProviderRecords() {
    return api.get('/records/provider/records');
  },
  downloadRecord(recordId) {
    return api.get(`/records/download/${recordId}`, { responseType: 'blob' });
  },
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
