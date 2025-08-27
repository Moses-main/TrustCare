import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserMd,
  FaEnvelope,
  FaLock,
  FaUser,
  FaIdCard,
  FaHospital,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaChevronDown
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/auth.css';

const specializations = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Oncology',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'Surgery'
];

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specialization: '',
    hospital: '',
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSpecializationOpen, setIsSpecializationOpen] = useState(false);
  const navigate = useNavigate();

  const showToast = (type, message) => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    switch (type) {
      case 'success':
        toast.success(message, toastOptions);
        break;
      case 'error':
        toast.error(message, toastOptions);
        break;
      case 'warning':
        toast.warn(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  };

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Oncology",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.licenseNumber) {
      newErrors.licenseNumber = "License number is required";
    }

    if (!formData.specialization) {
      newErrors.specialization = "Please select a specialization";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual API call
      const response = await fetch("/api/doctors/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          licenseNumber: formData.licenseNumber,
          specialization: formData.specialization,
          hospital: formData.hospital,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      showToast('success', 'Your account has been created. Please log in.');

      // Redirect to login after successful registration
      navigate("/auth/doctors/login");
    } catch (error) {
      showToast('error', error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <div className="absolute inset-0 flex items-center justify-center p-8 text-white text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Join Our Medical Community</h2>
            <p className="opacity-90">Create your doctor account and start managing patient records securely.</p>
          </div>
        </div>
      </div>
      
      <div className="auth-content">
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title">Create Doctor Account</h2>
          
          {Object.keys(errors).length > 0 && (
            <div className="error-message">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Please fix the following {Object.keys(errors).length} error{Object.keys(errors).length !== 1 ? 's' : ''}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`input pl-10 ${errors.fullName ? 'error' : ''}`}
                placeholder="Dr. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            {errors.fullName && (
              <p className="error-message">{errors.fullName}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className={`input pl-10 ${errors.email ? 'error' : ''}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="licenseNumber">Medical License Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaIdCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                className={`input pl-10 ${errors.licenseNumber ? 'error' : ''}`}
                placeholder="MD-123456"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </div>
            {errors.licenseNumber && (
              <p className="error-message">{errors.licenseNumber}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="specialization">Specialization</label>
            <select
              id="specialization"
              name="specialization"
              required
              value={formData.specialization}
              onChange={handleChange}
              className={`input pl-3 pr-10 ${errors.specialization ? 'error' : ''}`}
            >
              <option value="">Select a specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <p className="error-message">{errors.specialization}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="hospital">
              Hospital/Clinic <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaHospital className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="hospital"
                name="hospital"
                className="input pl-10"
                placeholder="e.g. City General Hospital"
                value={formData.hospital}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`input pl-10 pr-10 ${errors.password ? 'error' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters long
            </p>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className={`input pl-10 pr-10 ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="form-group">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="error-message">{errors.terms}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="divider">or continue with</div>

          <div className="social-login">
            <button 
              type="button" 
              className="btn btn-google"
              onClick={handleGoogleSignup}
            >
              <FaGoogle className="text-red-500" /> 
              <span>Sign up with Google</span>
            </button>
          </div>

          <p className="form-footer">
            Already have an account?{' '}
            <Link to="/auth/doctors/login" className="text-primary-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;
