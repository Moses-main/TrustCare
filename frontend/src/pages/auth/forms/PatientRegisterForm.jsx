import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientRegisterSchema } from '../../../utils/validations/authSchemas';

const PatientRegisterForm = ({ onSubmit, loading, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientRegisterSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="firstName"
              {...register('firstName')}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last name
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="lastName"
              {...register('lastName')}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } rounded-md`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="dateOfBirth"
              {...register('dateOfBirth')}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="mt-1">
            <select
              id="gender"
              {...register('gender')}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                errors.gender ? 'border-red-300' : 'border-gray-300'
              } rounded-md`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="mt-1">
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  );
};

export default PatientRegisterForm;
