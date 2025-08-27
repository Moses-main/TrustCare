import React from 'react';
import { FaUser, FaEnvelope, FaHospital, FaIdCard } from 'react-icons/fa';

const iconMap = {
  user: FaUser,
  email: FaEnvelope,
  hospital: FaHospital,
  idCard: FaIdCard,
};

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon,
  required = false,
  ...props
}) => {
  const Icon = iconMap[icon];
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
              : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
          } ${Icon ? 'pl-10' : ''}`}
          placeholder={placeholder}
          required={required}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
