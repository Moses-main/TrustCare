import React, { useState } from 'react';
import { FaSearch, FaFilter, FaPrint, FaDownload, FaHistory } from 'react-icons/fa';

const PatientPrescriptions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample prescription data
  const prescriptions = [
    {
      id: 1,
      date: '2023-11-10',
      medication: 'Lisinopril 10mg',
      dosage: '1 tablet daily',
      doctor: 'Dr. Sarah Johnson',
      status: 'active',
      refills: 2,
      instructions: 'Take one tablet by mouth every morning for blood pressure.'
    },
    {
      id: 2,
      date: '2023-10-15',
      medication: 'Atorvastatin 20mg',
      dosage: '1 tablet at bedtime',
      doctor: 'Dr. Sarah Johnson',
      status: 'active',
      refills: 1,
      instructions: 'Take one tablet at bedtime for cholesterol.'
    },
    {
      id: 3,
      date: '2023-09-05',
      medication: 'Amoxicillin 500mg',
      dosage: '1 tablet every 8 hours',
      doctor: 'Dr. Michael Chen',
      status: 'completed',
      refills: 0,
      instructions: 'Take one tablet every 8 hours for 10 days until finished.'
    },
    {
      id: 4,
      date: '2023-07-22',
      medication: 'Ibuprofen 400mg',
      dosage: '1 tablet every 6 hours as needed',
      doctor: 'Dr. Robert Wilson',
      status: 'expired',
      refills: 0,
      instructions: 'Take as needed for pain, not to exceed 4 doses in 24 hours.'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Prescriptions' },
    { id: 'active', label: 'Active' },
    { id: 'refill', label: 'Refill Available' },
    { id: 'expired', label: 'Expired' }
  ];

  const filteredPrescriptions = activeFilter === 'all' 
    ? prescriptions 
    : prescriptions.filter(p => p.status === activeFilter);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      expired: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Prescriptions</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search medications..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
            <FaFilter className="mr-2" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeFilter === filter.id
                ? 'border-b-2 border-blue-500 text-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Prescriptions List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {filteredPrescriptions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredPrescriptions.map((rx) => (
              <li key={rx.id} className="hover:bg-gray-50">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-3 sm:mb-0">
                      <div className="flex items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {rx.medication}
                        </h3>
                        <span className="ml-2">
                          {getStatusBadge(rx.status)}
                        </span>
                      </div>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Prescribed by {rx.doctor} on {formatDate(rx.date)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {rx.status === 'active' && rx.refills > 0 && (
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Request Refill
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <FaPrint className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <FaDownload className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Dosage</dt>
                      <dd className="mt-1 text-sm text-gray-900">{rx.dosage}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Refills Remaining</dt>
                      <dd className="mt-1 text-sm text-gray-900">{rx.refills}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Instructions</dt>
                      <dd className="mt-1 text-sm text-gray-900">{rx.instructions}</dd>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <FaHistory className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeFilter === 'all' 
                ? "You don't have any prescriptions yet."
                : `No ${activeFilter} prescriptions found.`}
            </p>
          </div>
        )}
      </div>

      {/* Prescription History */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Prescription History</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">View Full History</button>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescribed By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptions.map((rx) => (
                <tr key={`history-${rx.id}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(rx.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{rx.medication}</div>
                    <div className="text-sm text-gray-500">{rx.dosage}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rx.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(rx.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">Details</button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <FaDownload className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientPrescriptions;
