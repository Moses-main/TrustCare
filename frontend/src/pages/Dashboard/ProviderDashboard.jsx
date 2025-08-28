import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProviderDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Healthcare Provider Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard Cards */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Patient Records</h3>
                  <p className="mt-2 text-sm text-gray-500">Access and manage patient health records</p>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/patients')}
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    >
                      View Patients →
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
                  <p className="mt-2 text-sm text-gray-500">View and manage your schedule</p>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/schedule')}
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    >
                      View Schedule →
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Prescriptions</h3>
                  <p className="mt-2 text-sm text-gray-500">Write and manage prescriptions</p>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/prescriptions')}
                      className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                    >
                      Manage Prescriptions →
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

export default ProviderDashboard;
