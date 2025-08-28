import React, { useState } from 'react';
import { FaFileMedical, FaSearch, FaFilter, FaDownload, FaEye } from 'react-icons/fa';

const PatientRecords = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample medical records data
  const medicalRecords = [
    {
      id: 1,
      date: '2023-10-15',
      title: 'Annual Physical Exam',
      type: 'Examination',
      doctor: 'Dr. Sarah Johnson',
      description: 'Routine annual checkup with blood work and physical examination.',
      attachments: ['blood_test.pdf', 'exam_summary.pdf']
    },
    {
      id: 2,
      date: '2023-08-22',
      title: 'Cardiology Consultation',
      type: 'Consultation',
      doctor: 'Dr. Michael Chen',
      description: 'Follow-up consultation regarding heart health and stress test results.',
      attachments: ['stress_test_results.pdf']
    },
    {
      id: 3,
      date: '2023-06-10',
      title: 'Blood Test Results',
      type: 'Lab Results',
      doctor: 'Dr. Robert Wilson',
      description: 'Complete blood count and metabolic panel results.',
      attachments: ['cbc_results.pdf', 'metabolic_panel.pdf']
    },
    {
      id: 4,
      date: '2023-05-05',
      title: 'X-Ray - Right Ankle',
      type: 'Imaging',
      doctor: 'Dr. Emily Davis',
      description: 'X-ray of right ankle following sports injury.',
      attachments: ['xray_ankle.pdf']
    }
  ];

  const recordTypes = ['All', 'Examination', 'Consultation', 'Lab Results', 'Imaging', 'Prescription'];

  const filteredRecords = activeTab === 'all' 
    ? medicalRecords 
    : medicalRecords.filter(record => record.type.toLowerCase() === activeTab.toLowerCase());

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Medical Records</h1>
        <div className="flex space-x-3
        ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search records..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FaFileMedical className="mr-2" />
            Request Records
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            {recordTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeTab === type.toLowerCase() || (activeTab === 'all' && type === 'All')
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">Sort by:</span>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Most Recent</option>
              <option>Oldest First</option>
              <option>By Doctor</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold text-gray-800">{record.title}</h3>
                      <span className="ml-3 px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {record.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{record.description}</p>
                    <div className="flex items-center mt-3 text-sm text-gray-500">
                      <span>{formatDate(record.date)}</span>
                      <span className="mx-2">•</span>
                      <span>{record.doctor}</span>
                    </div>
                    {record.attachments && record.attachments.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments:</h4>
                        <div className="flex flex-wrap gap-2">
                          {record.attachments.map((file, index) => (
                            <div key={index} className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md text-sm">
                              <FaFileMedical className="text-gray-400 mr-2" />
                              <span className="text-gray-700 mr-3">{file}</span>
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800" title="View">
                                  <FaEye size={14} />
                                </button>
                                <button className="text-gray-600 hover:text-gray-800" title="Download">
                                  <FaDownload size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                      <FaEye size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full">
                      <FaDownload size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FaFileMedical className="mx-auto text-gray-300 text-4xl mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No records found</h3>
              <p className="mt-1 text-gray-500">There are no medical records matching your current filters.</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between items-center text-sm text-gray-600">
          <div>Showing {filteredRecords.length} of {medicalRecords.length} records</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-blue-50 text-blue-700 font-medium">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
