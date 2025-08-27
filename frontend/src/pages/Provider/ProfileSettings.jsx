import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaKey, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaVenusMars, 
  FaTint, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

export default function ProfileSettings() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Mock user data with reset
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1985-05-15',
    address: '123 Main St, Anytown, CA 90210',
    gender: 'male',
    bloodType: 'O+',
  });

  // Check password strength
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]+/)) strength += 1;
    if (password.match(/[A-Z]+/)) strength += 1;
    if (password.match(/[0-9]+/)) strength += 1;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1;
    return strength;
  };

  // Handle profile form submission
  const onProfileSubmit = async (data) => {
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserData(prev => ({ ...prev, ...data }));
      setFormStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Failed to update profile. Please try again.' });
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle password change
  const onPasswordChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      setFormStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus({ type: 'success', message: 'Password updated successfully!' });
      e.target.reset();
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Failed to update password. Please try again.' });
      console.error('Password update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`${
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Security
          </button>
        </nav>
      </div>

      {/* Form Status Message */}
      {formStatus.message && (
        <div className={`rounded-md p-4 mb-6 ${
          formStatus.type === 'error' ? 'bg-red-50' : 'bg-green-50'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {formStatus.type === 'error' ? (
                <FaExclamationCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              ) : (
                <FaCheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                formStatus.type === 'error' ? 'text-red-800' : 'text-green-800'
              }`}>
                {formStatus.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Form */}
      {activeTab === 'profile' && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit(onProfileSubmit)} className="p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={userData.firstName}
                    {...register('firstName', { 
                      required: 'First name is required',
                      minLength: { value: 2, message: 'First name must be at least 2 characters' }
                    })}
                    className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" /> {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  defaultValue={userData.lastName}
                  {...register('lastName', { required: 'Last name is required' })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    defaultValue={userData.email}
                    disabled
                    className="block w-full pl-10 bg-gray-100 border border-gray-300 rounded-md text-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue={userData.phone}
                    {...register('phone', {
                      pattern: {
                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/,
                        message: 'Please enter a valid phone number'
                      }
                    })}
                    className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" /> {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dateOfBirth"
                    max={new Date().toISOString().split('T')[0]}
                    defaultValue={userData.dateOfBirth}
                    {...register('dateOfBirth', {
                      validate: {
                        validDate: (value) => {
                          const date = new Date(value);
                          return !isNaN(date.getTime()) || 'Please enter a valid date';
                        },
                        notFuture: (value) => {
                          const selectedDate = new Date(value);
                          const today = new Date();
                          return selectedDate <= today || 'Date cannot be in the future';
                        }
                      }
                    })}
                    className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" /> {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    defaultValue={userData.address}
                    {...register('address', {
                      required: 'Address is required',
                      minLength: { value: 5, message: 'Address is too short' }
                    })}
                    className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" /> {errors.address.message}
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaVenusMars className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    id="gender"
                    defaultValue={userData.gender}
                    {...register('gender', { required: 'Gender is required' })}
                    className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" /> {errors.gender.message}
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                  Blood Type
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTint className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    id="bloodType"
                    defaultValue={userData.bloodType}
                    {...register('bloodType')}
                    className="block w-full pl-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-5">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={onPasswordChange} className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your password to keep your account secure.
                </p>
              </div>

              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    className="block w-full pl-10 pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter current password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showCurrentPassword ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaKey className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    onChange={(e) => setPasswordStrength(checkPasswordStrength(e.target.value))}
                    className="block w-full pl-10 pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter new password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showNewPassword ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {passwordStrength > 0 && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          passwordStrength <= 2 ? 'bg-red-500' : 
                          passwordStrength === 3 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {passwordStrength <= 2 ? 'Weak' : passwordStrength === 3 ? 'Good' : 'Strong'} password
                    </p>
                  </div>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Use 8 or more characters with a mix of letters, numbers & symbols
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaKey className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    className="block w-full pl-10 pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Confirm new password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
