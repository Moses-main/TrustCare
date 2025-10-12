import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaWallet,
  FaUserMd,
  FaUserInjured,
  FaIdCard,
  FaCheckCircle,
} from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    walletAddress: "",
    licenseNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!formData.name || !formData.email || !formData.walletAddress) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.role === "provider" && !formData.licenseNumber?.trim()) {
      toast.error("Please provide your medical license number");
      return;
    }

    try {
      setIsLoading(true);

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        walletAddress: formData.walletAddress,
        ...(formData.role === "provider" && {
          licenseNumber: formData.licenseNumber,
        }),
      };

      const response = await authAPI.register(userData);

      toast.success(
        "Registration successful! Please check your email to verify your account.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      setShowVerificationMessage(true);

      setFormData({
        name: "",
        email: formData.email,
        password: "",
        confirmPassword: "",
        role: "patient",
        walletAddress: "",
        licenseNumber: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (showVerificationMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Check your email
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            We've sent a verification link to{" "}
            <span className="font-semibold text-gray-900">
              {formData.email}
            </span>
            . Please check your inbox and click the link to verify your account.
          </p>
          <div className="mt-8 space-y-3">
            <button
              onClick={() => setShowVerificationMessage(false)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Back to form
            </button>
            <p className="text-sm text-gray-600">
              Didn't receive the email?{" "}
              <button
                onClick={async () => {
                  try {
                    await authAPI.resendVerificationEmail(formData.email);
                    toast.success("Verification email resent!");
                  } catch (error) {
                    toast.error(
                      "Failed to resend verification email. Please try again."
                    );
                  }
                }}
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Resend verification email
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Branding */}
            <div className="hidden lg:block space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Welcome to
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    TrustCare
                  </span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  Join our blockchain-powered healthcare platform. Secure,
                  transparent, and patient-centered care.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: FaCheckCircle, text: "Blockchain-secured Records" },
                  { icon: FaCheckCircle, text: "Complete Data Privacy" },
                  { icon: FaCheckCircle, text: "Instant Verification" },
                  { icon: FaCheckCircle, text: "Trusted Healthcare Network" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <item.icon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-base">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="p-8 sm:p-10">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Create your TrustCare account
                    </h2>
                    <p className="text-gray-600">
                      Or{" "}
                      <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        sign in to existing account
                      </Link>
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <FaUser className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 outline-none"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Email address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <FaEnvelope className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 outline-none"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Wallet Address */}
                    <div>
                      <label
                        htmlFor="walletAddress"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Wallet Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <FaWallet className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          id="walletAddress"
                          name="walletAddress"
                          type="text"
                          required
                          className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 outline-none"
                          placeholder="Blockchain Wallet Address"
                          value={formData.walletAddress}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-gray-500">
                        Your secure blockchain wallet address
                      </p>
                    </div>

                    {/* Role Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        I am a:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <input
                            id="patient"
                            name="role"
                            type="radio"
                            value="patient"
                            checked={formData.role === "patient"}
                            onChange={handleChange}
                            className="hidden peer"
                          />
                          <label
                            htmlFor="patient"
                            className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              formData.role === "patient"
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <FaUserInjured
                              className={`h-6 w-6 mb-2 ${formData.role === "patient" ? "text-blue-600" : "text-gray-400"}`}
                            />
                            <span
                              className={`text-sm font-semibold ${formData.role === "patient" ? "text-blue-900" : "text-gray-700"}`}
                            >
                              Patient
                            </span>
                            {formData.role === "patient" && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </label>
                        </div>
                        <div>
                          <input
                            id="provider"
                            name="role"
                            type="radio"
                            value="provider"
                            checked={formData.role === "provider"}
                            onChange={handleChange}
                            className="hidden peer"
                          />
                          <label
                            htmlFor="provider"
                            className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              formData.role === "provider"
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                          >
                            <FaUserMd
                              className={`h-6 w-6 mb-2 ${formData.role === "provider" ? "text-blue-600" : "text-gray-400"}`}
                            />
                            <span
                              className={`text-sm font-semibold ${formData.role === "provider" ? "text-blue-900" : "text-gray-700"}`}
                            >
                              Healthcare Provider
                            </span>
                            {formData.role === "provider" && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* License Number (Provider only) */}
                    {formData.role === "provider" && (
                      <div className="animate-fadeIn">
                        <label
                          htmlFor="licenseNumber"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Medical License Number
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <FaIdCard className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          </div>
                          <input
                            id="licenseNumber"
                            name="licenseNumber"
                            type="text"
                            required
                            className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 outline-none"
                            placeholder="Medical License Number"
                            value={formData.licenseNumber || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <FaLock className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          required
                          minLength="6"
                          className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 outline-none"
                          placeholder="Password (min 6 characters)"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <FaLock className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          autoComplete="new-password"
                          required
                          minLength="6"
                          className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 outline-none"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-3 text-sm text-gray-600"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Mobile branding */}
              <div className="lg:hidden mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Secured by blockchain technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Register;
