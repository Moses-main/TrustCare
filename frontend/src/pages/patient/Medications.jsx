import React, { useState } from 'react';
import { FaPills, FaPlus, FaSearch, FaBell, FaTrash, FaEdit } from 'react-icons/fa';

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      startDate: '2023-01-15',
      prescriber: 'Dr. Smith',
      instructions: 'Take in the morning with food',
      refillDate: '2023-07-15',
      remainingRefills: 2,
      active: true
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2022-11-20',
      prescriber: 'Dr. Johnson',
      instructions: 'Take with meals',
      refillDate: '2023-08-01',
      remainingRefills: 1,
      active: true
    },
    {
      id: 3,
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      startDate: '2023-03-10',
      endDate: '2023-06-10',
      prescriber: 'Dr. Williams',
      instructions: 'Take at bedtime',
      refillDate: '2023-06-10',
      remainingRefills: 0,
      active: false
    },
  ]);

  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    prescriber: '',
    instructions: '',
    remainingRefills: 0,
    active: true
  });

  const filteredMeds = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.prescriber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeMeds = filteredMeds.filter(med => med.active);
  const inactiveMeds = filteredMeds.filter(med => !med.active);

  const handleAddMedication = (e) => {
    e.preventDefault();
    const newMed = {
      ...newMedication,
      id: medications.length > 0 ? Math.max(...medications.map(m => m.id)) + 1 : 1,
      refillDate: newMedication.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    setMedications([...medications, newMed]);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'Once daily',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      prescriber: '',
      instructions: '',
      remainingRefills: 0,
      active: true
    });
    setShowAddModal(false);
  };

  const handleRequestRefill = (medication) => {
    setSelectedMedication(medication);
    setShowRefillModal(true);
  };

  const submitRefillRequest = () => {
    // In a real app, this would send a request to the provider
    alert(`Refill request submitted for ${selectedMedication.name}`);
    setShowRefillModal(false);
  };

  const deleteMedication = (id) => {
    if (window.confirm('Are you sure you want to remove this medication from your list?')) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  const getRefillStatus = (med) => {
    if (!med.active) return 'Completed';
    if (med.remainingRefills <= 0) return 'No refills remaining';
    
    const daysUntilRefill = Math.ceil((new Date(med.refillDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilRefill <= 0) {
      return 'Refill overdue!';
    } else if (daysUntilRefill <= 7) {
      return `Refill in ${daysUntilRefill} day${daysUntilRefill > 1 ? 's' : ''}`;
    } else {
      return `Next refill: ${new Date(med.refillDate).toLocaleDateString()}`;
    }
  };

  const getStatusColor = (med) => {
    if (!med.active) return 'bg-gray-100 text-gray-800';
    
    const daysUntilRefill = Math.ceil((new Date(med.refillDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (med.remainingRefills <= 0) return 'bg-yellow-100 text-yellow-800';
    if (daysUntilRefill <= 0) return 'bg-red-100 text-red-800';
    if (daysUntilRefill <= 7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Medications</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FaPlus className="mr-2" />
            <span>Add Medication</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search medications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Active Medications */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Medications</h2>
        {activeMeds.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeMeds.map((med) => (
              <div key={med.id} className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{med.name}</h3>
                      <p className="text-gray-600">{med.dosage} • {med.frequency}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => deleteMedication(med.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="Remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Prescriber:</span> {med.prescriber}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Started:</span> {new Date(med.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Instructions:</span> {med.instructions}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Refills:</span> {med.remainingRefills} remaining
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className={`text-sm px-3 py-1 rounded-full inline-flex items-center ${getStatusColor(med)}`}>
                      {med.remainingRefills <= 0 && <FaBell className="mr-1" />}
                      {getRefillStatus(med)}
                    </div>
                    
                    {med.remainingRefills > 0 && (
                      <button
                        onClick={() => handleRequestRefill(med)}
                        className="mt-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-md text-sm"
                      >
                        Request Refill
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaPills className="mx-auto text-gray-300 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No active medications</h3>
            <p className="mt-1 text-gray-500">Add a medication to get started</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPlus className="mr-2" /> Add Medication
            </button>
          </div>
        )}
      </div>

      {/* Inactive Medications */}
      {inactiveMeds.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Past Medications</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inactiveMeds.map((med) => (
              <div key={med.id} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-700">{med.name}</h3>
                      <p className="text-gray-500">{med.dosage} • {med.frequency}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Prescriber:</span> {med.prescriber}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Period:</span> {new Date(med.startDate).toLocaleDateString()} - {med.endDate ? new Date(med.endDate).toLocaleDateString() : 'Present'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Medication</h2>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddMedication}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Medication Name *</label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosage *</label>
                      <input
                        type="text"
                        id="dosage"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="e.g., 10mg"
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency *</label>
                      <select
                        id="frequency"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={newMedication.frequency}
                        onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                        required
                      >
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">Three times daily</option>
                        <option value="Four times daily">Four times daily</option>
                        <option value="As needed">As needed</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date *</label>
                      <input
                        type="date"
                        id="startDate"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={newMedication.startDate}
                        onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date (if applicable)</label>
                      <input
                        type="date"
                        id="endDate"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={newMedication.endDate}
                        onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="prescriber" className="block text-sm font-medium text-gray-700">Prescriber *</label>
                    <input
                      type="text"
                      id="prescriber"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newMedication.prescriber}
                      onChange={(e) => setNewMedication({...newMedication, prescriber: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions</label>
                    <textarea
                      id="instructions"
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      placeholder="e.g., Take with food, Avoid alcohol, etc."
                      value={newMedication.instructions}
                      onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="refills" className="block text-sm font-medium text-gray-700">Number of Refills</label>
                    <input
                      type="number"
                      id="refills"
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={newMedication.remainingRefills}
                      onChange={(e) => setNewMedication({...newMedication, remainingRefills: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Medication
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Refill Request Modal */}
      {showRefillModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Request Refill</h2>
                <button 
                  onClick={() => setShowRefillModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  You are requesting a refill for <span className="font-semibold">{selectedMedication.name} {selectedMedication.dosage}</span>.
                </p>
                
                <div>
                  <label htmlFor="pharmacy" className="block text-sm font-medium text-gray-700">Pharmacy Information</label>
                  <select
                    id="pharmacy"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue=""
                  >
                    <option value="" disabled>Select your preferred pharmacy</option>
                    <option value="cvs">CVS Pharmacy</option>
                    <option value="walgreens">Walgreens</option>
                    <option value="walmart">Walmart Pharmacy</option>
                    <option value="other">Other (specify in notes)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                  <textarea
                    id="notes"
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Any special instructions for your provider"
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-700">
                    Your refill request will be sent to your provider for approval. You'll be notified once it's been processed.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowRefillModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitRefillRequest}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medications;
