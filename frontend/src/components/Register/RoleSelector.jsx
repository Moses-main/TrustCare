import React from 'react';
import { FaUserInjured, FaUserMd } from 'react-icons/fa';

const RoleSelector = ({ role, onRoleChange, className = '' }) => {
  const roles = [
    { id: 'patient', label: 'Patient', icon: FaUserInjured },
    { id: 'provider', label: 'Healthcare Provider', icon: FaUserMd },
  ];

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex rounded-lg bg-gray-100 p-1">
        {roles.map((roleItem) => {
          const Icon = roleItem.icon;
          const isActive = role === roleItem.id;
          
          return (
            <button
              key={roleItem.id}
              type="button"
              onClick={() => onRoleChange(roleItem.id)}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon className={`mr-2 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
              {roleItem.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;
