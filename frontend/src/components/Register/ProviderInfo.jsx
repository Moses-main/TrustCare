import React from 'react';
import FormField from './FormField';

const specializations = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Oncology',
  'Ophthalmology',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'Urology',
  'Other'
];

const ProviderInfo = ({ formData, onChange, errors }) => {
  if (formData.role !== 'provider') return null;

  return (
    <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
      <h3 className="text-lg font-medium text-gray-900">Provider Information</h3>
      
      <FormField
        label="License Number"
        name="licenseNumber"
        value={formData.licenseNumber}
        onChange={onChange}
        placeholder="Enter your medical license number"
        error={errors.licenseNumber}
        icon="idCard"
        required
      />
      
      <div className="mb-4">
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
          Specialization <span className="text-red-500">*</span>
        </label>
        <select
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={onChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
            errors.specialization
              ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
              : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
          }`}
          required
        >
          <option value="">Select your specialization</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        {errors.specialization && (
          <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
        )}
      </div>
      
      <FormField
        label="Hospital/Clinic (Optional)"
        name="hospital"
        value={formData.hospital}
        onChange={onChange}
        placeholder="Enter hospital or clinic name"
        error={errors.hospital}
        icon="hospital"
      />
    </div>
  );
};

export default ProviderInfo;
