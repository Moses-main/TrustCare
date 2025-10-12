import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';
import { authAPI } from '@/services/api';
import { FaLock, FaEnvelope, FaUserMd, FaUserInjured, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

// Validation schema using Yup
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: Yup.boolean()
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showResendLink, setShowResendLink] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(from, { replace: true });
    } else {
      // If no token, ensure loading is set to false
      setIsLoading(false);
    }
  }, [navigate, from]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      setIsLoading(true);
      setError('');
      const { email, password, rememberMe } = values;
      
      console.log('Attempting login with:', { email });
      
      // Call the login API
      const response = await authAPI.login({ email, password }).catch(error => {
        console.error('Login API error:', error);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
        throw error;
      });
      
      console.log('Login response:', response);
      
      if (response?.token) {
        // Check if email is verified
        if (!response.user.isEmailVerified) {
          // Store the email for potential resend
          const email = response.user.email;
          
          // Show error message and redirect to resend verification page
          toast.error('Please verify your email before logging in', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          
          // Navigate to resend verification page
          navigate('/resend-verification', { 
            state: { email },
            replace: true 
          });
          return;
        }
        
        // Store the token
        localStorage.setItem('token', response.token);
        
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        
        // Update auth context with user data
        login({
          id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          walletAddress: response.user.walletAddress,
          isEmailVerified: response.user.isEmailVerified
        });
        
        // Show success message
        toast.success('🎉 Login successful! Redirecting...', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        
        // Redirect based on user role
        setTimeout(() => {
          const redirectPath = response.user.role === 'provider' ? '/provider/dashboard' : '/dashboard';
          navigate(redirectPath, { replace: true });
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = 'Invalid email or password';
      
      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
        
        if (error.response.status === 401) {
          if (error.response.data?.code === 'EMAIL_NOT_VERIFIED') {
            errorMessage = 'Please verify your email before logging in.';
            setShowResendLink(true);
          } else {
            errorMessage = 'Invalid email or password. Please try again.';
          }
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
        errorMessage = `Error: ${error.message}`;
      }
      
      setError(errorMessage);
      setFieldError('password', errorMessage);
      setFieldError('email', ' '); // Clear email error to avoid duplicate messages
      
      toast.error(`❌ ${errorMessage}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

        <Formik
          initialValues={{
            email: '',
            password: '',
            rememberMe: false
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="mt-8 space-y-6">

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.email && touched.email 
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    } rounded-md shadow-sm`}
                    placeholder="you@example.com"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`block w-full pl-10 pr-10 py-2 border ${
                      errors.password && touched.password 
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    } rounded-md shadow-sm`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              {showResendLink && (
                <div className="mt-2 text-sm text-center">
                  <span className="text-gray-600">Didn't receive the verification email? </span>
                  <Link 
                    to="/resend-verification" 
                    state={{ email: values.email }}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Resend verification email
                  </Link>
                </div>
              )}
              {error && (
                <div className="mt-2 text-sm text-red-600">
                  {error}
                </div>
              )}
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting || isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {errors.submit}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
