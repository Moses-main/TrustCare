import React from 'react';

const PatientProfile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-3xl text-gray-500">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Patient ID: PT123456</p>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Personal Information</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Date of Birth:</span> January 1, 1985</p>
              <p><span className="text-gray-600">Gender:</span> Male</p>
              <p><span className="text-gray-600">Blood Type:</span> O+</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p><span className="text-gray-600">Phone:</span> (555) 123-4567</p>
              <p><span className="text-gray-600">Address:</span> 123 Healthcare St, City, Country</p>
              <p><span className="text-gray-600">Emergency Contact:</span> Jane Doe (555) 987-6543</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-3">Medical Information</h3>
          <div className="space-y-2">
            <p><span className="text-gray-600">Primary Care Physician:</span> Dr. Sarah Johnson</p>
            <p><span className="text-gray-600">Insurance Provider:</span> HealthCare Plus</p>
            <p><span className="text-gray-600">Policy Number:</span> HC123456789</p>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
