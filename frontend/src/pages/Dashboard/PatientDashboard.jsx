import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Patient Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard Cards */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">My Health Records</h3>
                  <p className="mt-2 text-sm text-gray-500">View and manage your health records</p>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/records')}
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    >
                      View Records →
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
                  <p className="mt-2 text-sm text-gray-500">Schedule or view your appointments</p>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/appointments')}
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    >
                      Manage Appointments →
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Prescriptions</h3>
                  <p className="mt-2 text-sm text-gray-500">View your current prescriptions</p>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/prescriptions')}
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    >
                      View Prescriptions →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
