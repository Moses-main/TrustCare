import React, { useState } from 'react';
import { FaSearch, FaFilter, FaUserPlus, FaEnvelope, FaPhone, FaNotesMedical, FaCalendarAlt, FaFileMedical } from 'react-icons/fa';

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample patient data
  const patients = [
    {
      id: 1,
      name: 'John Smith',
      mrn: 'MRN123456',
      dob: '1985-03-15',
      age: 38,
      gender: 'Male',
      bloodType: 'O+',
      lastVisit: '2023-11-10',
      nextAppointment: '2023-12-05',
      status: 'Active',
      phone: '(555) 123-4567',
      email: 'john.smith@example.com',
      address: '123 Main St, Anytown, USA',
      insurance: 'HealthCare Plus',
      policyNumber: 'HC78901234',
      primaryCarePhysician: 'Dr. Sarah Johnson',
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      medications: ['Lisinopril 10mg', 'Metformin 500mg'],
      allergies: ['Penicillin', 'Sulfa'],
      notes: 'Patient is responding well to current medication. Monitor blood pressure regularly.'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      mrn: 'MRN789012',
      dob: '1990-07-22',
      age: 33,
      gender: 'Female',
      bloodType: 'A-',
      lastVisit: '2023-11-12',
      nextAppointment: '2023-11-28',
      status: 'Active',
      phone: '(555) 987-6543',
      email: 'emma.j@example.com',
      address: '456 Oak Ave, Somewhere, USA',
      insurance: 'WellCare',
      policyNumber: 'WC45678901',
      primaryCarePhysician: 'Dr. Michael Chen',
      conditions: ['Asthma', 'Seasonal Allergies'],
      medications: ['Albuterol Inhaler', 'Fluticasone'],
      allergies: ['Peanuts', 'Dust Mites'],
      notes: 'New patient. Follow up on asthma action plan.'
    },
    {
      id: 3,
      name: 'Michael Brown',
      mrn: 'MRN345678',
      dob: '1978-11-05',
      age: 45,
      gender: 'Male',
      bloodType: 'B+',
      lastVisit: '2023-11-05',
      nextAppointment: '2024-02-15',
      status: 'Inactive',
      phone: '(555) 456-7890',
      email: 'michael.b@example.com',
      address: '789 Pine Rd, Elsewhere, USA',
      insurance: 'Medicare',
      policyNumber: 'MC12345678',
      primaryCarePhysician: 'Dr. Robert Wilson',
      conditions: ['High Cholesterol', 'GERD'],
      medications: ['Atorvastatin 20mg', 'Omeprazole 20mg'],
      allergies: ['Ibuprofen'],
      notes: 'Annual physical completed. Labs ordered.'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      mrn: 'MRN901234',
      dob: '1982-09-18',
      age: 41,
      gender: 'Female',
      bloodType: 'AB+',
      lastVisit: '2023-10-28',
      nextAppointment: '2023-12-10',
      status: 'Active',
      phone: '(555) 234-5678',
      email: 'sarah.w@example.com',
      address: '321 Elm St, Anywhere, USA',
      insurance: 'Blue Cross Blue Shield',
      policyNumber: 'BC87654321',
      primaryCarePhysician: 'Dr. Emily Davis',
      conditions: ['Hypothyroidism', 'Anemia'],
      medications: ['Levothyroxine 50mcg', 'Iron Supplement'],
      allergies: ['Latex'],
      notes: 'Recent thyroid levels within normal range.'
    },
    {
      id: 5,
      name: 'David Lee',
      mrn: 'MRN567890',
      dob: '1975-12-30',
      age: 47,
      gender: 'Male',
      bloodType: 'A+',
      lastVisit: '2023-11-01',
      nextAppointment: null,
      status: 'Inactive',
      phone: '(555) 876-5432',
      email: 'david.lee@example.com',
      address: '654 Maple Dr, Nowhere, USA',
      insurance: 'Aetna',
      policyNumber: 'AE34567890',
      primaryCarePhysician: 'Dr. Robert Wilson',
      conditions: ['Type 1 Diabetes', 'Hypertension'],
      medications: ['Insulin Glargine', 'Lisinopril 5mg'],
      allergies: ['Sulfa'],
      notes: 'Needs annual diabetic eye exam.'
    }
  ];

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         patient.mrn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeTab === 'all' || patient.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const openPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  const closePatientModal = () => {
    setShowPatientModal(false);
    setSelectedPatient(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      new: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const PatientDetailRow = ({ label, value, icon: Icon }) => (
    <div className="py-2">
      <dt className="text-sm font-medium text-gray-500 flex items-center">
        {Icon && <Icon className="mr-2 text-gray-400" />}
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900">{value || 'N/A'}</dd>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Management</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <FaUserPlus className="mr-2" />
          Add New Patient
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients by name or MRN..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Status:</span>
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="all">All Patients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="new">New</option>
            </select>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              <FaFilter className="mr-2" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MRN
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age/Gender
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Appointment
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
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.primaryCarePhysician}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.mrn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.age} years</div>
                      <div className="text-sm text-gray-500">{patient.gender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(patient.lastVisit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(patient.nextAppointment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(patient.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openPatientDetails(patient)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaEnvelope className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No patients found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {selectedPatient.name}
                        </h3>
                        <div className="mt-1 text-sm text-gray-500">
                          MRN: {selectedPatient.mrn} | DOB: {formatDate(selectedPatient.dob)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-500">
                          <FaFileMedical className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={closePatientModal}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <FaTimes className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">CONTACT INFORMATION</h4>
                          <PatientDetailRow 
                            label="Phone" 
                            value={selectedPatient.phone} 
                            icon={FaPhone} 
                          />
                          <PatientDetailRow 
                            label="Email" 
                            value={selectedPatient.email} 
                            icon={FaEnvelope} 
                          />
                          <PatientDetailRow 
                            label="Address" 
                            value={selectedPatient.address} 
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">MEDICAL INFORMATION</h4>
                          <PatientDetailRow 
                            label="Blood Type" 
                            value={selectedPatient.bloodType} 
                          />
                          <PatientDetailRow 
                            label="Primary Care" 
                            value={selectedPatient.primaryCarePhysician} 
                          />
                          <PatientDetailRow 
                            label="Insurance" 
                            value={`${selectedPatient.insurance} (${selectedPatient.policyNumber})`} 
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-3">APPOINTMENTS</h4>
                          <PatientDetailRow 
                            label="Last Visit" 
                            value={formatDate(selectedPatient.lastVisit)} 
                            icon={FaCalendarAlt} 
                          />
                          <PatientDetailRow 
                            label="Next Appointment" 
                            value={formatDate(selectedPatient.nextAppointment) || 'Not scheduled'} 
                            icon={FaCalendarAlt} 
                          />
                          <PatientDetailRow 
                            label="Status" 
                            value={selectedPatient.status} 
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">MEDICAL SUMMARY</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 mb-2">CONDITIONS</h5>
                            <ul className="space-y-1">
                              {selectedPatient.conditions.map((condition, index) => (
                                <li key={index} className="text-sm text-gray-900">• {condition}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 mb-2">MEDICATIONS</h5>
                            <ul className="space-y-1">
                              {selectedPatient.medications.map((med, index) => (
                                <li key={index} className="text-sm text-gray-900">• {med}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500 mb-2">ALLERGIES</h5>
                            <ul className="space-y-1">
                              {selectedPatient.allergies.map((allergy, index) => (
                                <li key={index} className="text-sm text-gray-900">• {allergy}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">NOTES</h4>
                        <p className="text-sm text-gray-900">{selectedPatient.notes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Schedule Appointment
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={closePatientModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;
