import React, { useState } from 'react';
import { 
  FaPlus as PlusIcon,
  FaPencilAlt as PencilIcon,
  FaTrash as TrashIcon,
  FaClock as ClockIcon,
  FaCalendarAlt as CalendarIcon,
  FaBell as BellIcon,
  FaCheckCircle as CheckCircleIcon,
  FaExclamationCircle as ExclamationCircleIcon,
  FaInfoCircle as InformationCircleIcon
} from 'react-icons/fa';

// Sample medication data
const sampleMedications = [
  {
    id: 1,
    name: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'Every 6 hours as needed',
    startDate: '2023-06-01',
    endDate: '2023-07-31',
    instructions: 'Take with food',
    prescribedBy: 'Dr. Sarah Johnson',
    status: 'active',
    schedule: [
      { time: '08:00', taken: true },
      { time: '14:00', taken: true },
      { time: '20:00', taken: false },
    ],
    refillInfo: {
      remaining: 15,
      total: 30,
      lastFilled: '2023-06-15',
      nextRefill: '2023-07-15',
    },
    sideEffects: 'May cause stomach upset',
  },
  {
    id: 2,
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2023-05-15',
    endDate: null,
    instructions: 'Take in the morning',
    prescribedBy: 'Dr. Michael Chen',
    status: 'active',
    schedule: [
      { time: '08:00', taken: true },
    ],
    refillInfo: {
      remaining: 7,
      total: 30,
      lastFilled: '2023-06-10',
      nextRefill: '2023-07-10',
    },
    sideEffects: 'May cause dizziness',
  },
  {
    id: 3,
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Three times daily',
    startDate: '2023-06-20',
    endDate: '2023-06-30',
    instructions: 'Complete the full course',
    prescribedBy: 'Dr. Emily Wilson',
    status: 'completed',
    schedule: [
      { time: '08:00', taken: true },
      { time: '14:00', taken: true },
      { time: '20:00', taken: true },
    ],
    refillInfo: {
      remaining: 0,
      total: 30,
      lastFilled: '2023-06-20',
      nextRefill: null,
    },
    sideEffects: 'May cause diarrhea',
  },
];

const MedicationTracker = () => {
  const [medications, setMedications] = useState(sampleMedications);
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(null);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'once',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    instructions: '',
    prescribedBy: '',
    schedule: [{ time: '08:00' }],
  });
  const [refillInfo, setRefillInfo] = useState({
    remaining: 0,
    total: 30,
    lastFilled: new Date().toISOString().split('T')[0],
    nextRefill: '',
  });

  // Filter medications based on active tab
  const filteredMedications = medications.filter(med => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return med.status === 'active';
    if (activeTab === 'completed') return med.status === 'completed';
    if (activeTab === 'needsRefill') 
      return med.refillInfo && med.refillInfo.remaining <= 7 && med.status === 'active';
    return true;
  });

  // Mark medication as taken
  const markAsTaken = (medId, timeIndex) => {
    setMedications(medications.map(med => {
      if (med.id === medId) {
        const updatedSchedule = [...med.schedule];
        updatedSchedule[timeIndex] = { ...updatedSchedule[timeIndex], taken: true };
        return { ...med, schedule: updatedSchedule };
      }
      return med;
    }));
  };

  // Add a new medication
  const handleAddMedication = (e) => {
    e.preventDefault();
    const newMed = {
      id: medications.length + 1,
      ...newMedication,
      status: 'active',
      refillInfo: {
        remaining: 0,
        total: 0,
        lastFilled: '',
        nextRefill: '',
      },
    };
    setMedications([...medications, newMed]);
    setShowAddModal(false);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'once',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      instructions: '',
      prescribedBy: '',
      schedule: [{ time: '08:00' }],
    });
  };

  // Toggle medication status
  const toggleMedicationStatus = (medId) => {
    setMedications(medications.map(med => {
      if (med.id === medId) {
        return {
          ...med,
          status: med.status === 'active' ? 'completed' : 'active',
          endDate: med.status === 'active' ? new Date().toISOString().split('T')[0] : null
        };
      }
      return med;
    }));
  };

  // Update refill information
  const handleUpdateRefill = (e) => {
    e.preventDefault();
    setMedications(medications.map(med => {
      if (med.id === showRefillModal) {
        return {
          ...med,
          refillInfo: {
            ...refillInfo,
            remaining: parseInt(refillInfo.remaining, 10),
            total: parseInt(refillInfo.total, 10),
          },
        };
      }
      return med;
    }));
    setShowRefillModal(null);
  };

  // Calculate medication adherence percentage
  const calculateAdherence = (medication) => {
    if (!medication.schedule || medication.schedule.length === 0) return 0;
    const taken = medication.schedule.filter(dose => dose.taken).length;
    return Math.round((taken / medication.schedule.length) * 100);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate next dose time
  const getNextDoseTime = (medication) => {
    if (!medication.schedule || medication.schedule.length === 0) return null;
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Find the next scheduled dose
    for (const dose of medication.schedule) {
      const [hours, minutes] = dose.time.split(':').map(Number);
      if (hours > currentHour || (hours === currentHour && minutes > currentMinute)) {
        return dose.taken ? null : dose.time;
      }
    }
    
    // If no more doses today, return the first dose of the next day
    return medication.schedule[0].taken ? null : `Tomorrow at ${medication.schedule[0].time}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Medication Tracker</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your medications and track your adherence
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Medication
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'all', name: 'All Medications', count: medications.length },
              { id: 'active', name: 'Active', count: medications.filter(m => m.status === 'active').length },
              { id: 'needsRefill', name: 'Needs Refill', count: medications.filter(m => m.refillInfo?.remaining <= 7 && m.status === 'active').length },
              { id: 'completed', name: 'Completed', count: medications.filter(m => m.status === 'completed').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
                {tab.count > 0 && (
                  <span
                    className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${
                      activeTab === tab.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Medication Cards */}
      <div className="space-y-4">
        {filteredMedications.length > 0 ? (
          filteredMedications.map((medication) => (
            <div key={medication.id} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {medication.name} <span className="text-gray-500">{medication.dosage}</span>
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Prescribed by {medication.prescribedBy}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex space-x-2">
                    <button
                      onClick={() => toggleMedicationStatus(medication.id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        medication.status === 'active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {medication.status === 'active' ? 'Mark as Completed' : 'Mark as Active'}
                    </button>
                    {medication.refillInfo?.remaining <= 7 && medication.status === 'active' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Needs Refill
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Schedule</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {medication.schedule.map((dose, idx) => (
                        <div key={idx} className="flex items-center">
                          <span className="text-sm text-gray-700">{dose.time}</span>
                          <button
                            onClick={() => markAsTaken(medication.id, idx)}
                            className={`ml-2 p-1 rounded-full ${
                              dose.taken 
                                ? 'text-green-500 hover:text-green-700' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                            title={dose.taken ? 'Mark as not taken' : 'Mark as taken'}
                          >
                            {dose.taken ? (
                              <CheckCircleIcon className="h-5 w-5" />
                            ) : (
                              <ClockOutlineIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Adherence</h4>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${calculateAdherence(medication)}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        {calculateAdherence(medication)}% adherence
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Instructions</h4>
                  <p className="text-sm text-gray-700">
                    {medication.instructions || 'No specific instructions provided.'}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">
                      Started: {formatDate(medication.startDate)}
                    </p>
                    {medication.endDate && (
                      <p className="text-xs text-gray-500">
                        Ended: {formatDate(medication.endDate)}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowRefillModal(medication.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update Refill
                    </button>
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <PencilIcon className="h-3 w-3 mr-1" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No medications</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new medication.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Medication
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add New Medication
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
                        Medication Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., Ibuprofen"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 text-left">
                          Dosage
                        </label>
                        <input
                          type="text"
                          name="dosage"
                          id="dosage"
                          value={newMedication.dosage}
                          onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="e.g., 200mg"
                        />
                      </div>
                      <div>
                        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 text-left">
                          Frequency
                        </label>
                        <select
                          id="frequency"
                          name="frequency"
                          value={newMedication.frequency}
                          onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="once">Once daily</option>
                          <option value="twice">Twice daily</option>
                          <option value="thrice">Three times daily</option>
                          <option value="as_needed">As needed</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 text-left">
                          Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          id="startDate"
                          value={newMedication.startDate}
                          onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 text-left">
                          End Date (optional)
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          id="endDate"
                          value={newMedication.endDate}
                          onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="prescribedBy" className="block text-sm font-medium text-gray-700 text-left">
                        Prescribed By
                      </label>
                      <input
                        type="text"
                        name="prescribedBy"
                        id="prescribedBy"
                        value={newMedication.prescribedBy}
                        onChange={(e) => setNewMedication({...newMedication, prescribedBy: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., Dr. Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 text-left">
                        Instructions (optional)
                      </label>
                      <textarea
                        name="instructions"
                        id="instructions"
                        rows={3}
                        value={newMedication.instructions}
                        onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., Take with food"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleAddMedication}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Add Medication
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Refill Modal */}
      {showRefillModal !== null && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Update Refill Information
                  </h3>
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="remaining" className="block text-sm font-medium text-gray-700 text-left">
                          Remaining Pills
                        </label>
                        <input
                          type="number"
                          name="remaining"
                          id="remaining"
                          value={refillInfo.remaining}
                          onChange={(e) => setRefillInfo({...refillInfo, remaining: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="total" className="block text-sm font-medium text-gray-700 text-left">
                          Total Pills
                        </label>
                        <input
                          type="number"
                          name="total"
                          id="total"
                          value={refillInfo.total}
                          onChange={(e) => setRefillInfo({...refillInfo, total: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="lastFilled" className="block text-sm font-medium text-gray-700 text-left">
                          Last Filled
                        </label>
                        <input
                          type="date"
                          name="lastFilled"
                          id="lastFilled"
                          value={refillInfo.lastFilled}
                          onChange={(e) => setRefillInfo({...refillInfo, lastFilled: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="nextRefill" className="block text-sm font-medium text-gray-700 text-left">
                          Next Refill (optional)
                        </label>
                        <input
                          type="date"
                          name="nextRefill"
                          id="nextRefill"
                          value={refillInfo.nextRefill}
                          onChange={(e) => setRefillInfo({...refillInfo, nextRefill: e.target.value})}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleUpdateRefill}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                >
                  Update Refill
                </button>
                <button
                  type="button"
                  onClick={() => setShowRefillModal(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationTracker;
