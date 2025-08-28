import React, { useState } from 'react';
import { 
  FaExclamationCircle as ExclamationCircleIcon,
  FaPlus as PlusIcon,
  FaPencilAlt as PencilIcon,
  FaTrash as TrashIcon,
  FaInfoCircle as InformationCircleIcon,
  FaBell as BellIcon,
  FaTimes as XIcon
} from 'react-icons/fa';

// Sample alerts data
const sampleAlerts = [
  {
    id: 1,
    type: 'allergy',
    severity: 'high',
    name: 'Penicillin',
    description: 'Severe allergic reaction including anaphylaxis',
    dateIdentified: '2018-05-10',
    symptoms: 'Hives, difficulty breathing, swelling',
    notes: 'Carry epinephrine auto-injector at all times',
    active: true,
  },
  {
    id: 2,
    type: 'condition',
    severity: 'medium',
    name: 'Type 2 Diabetes',
    description: 'Insulin resistance and high blood sugar',
    dateIdentified: '2020-11-15',
    symptoms: 'Increased thirst, frequent urination, fatigue',
    notes: 'Monitor blood sugar levels regularly',
    active: true,
  },
  {
    id: 3,
    type: 'allergy',
    severity: 'low',
    name: 'Latex',
    description: 'Mild skin irritation',
    dateIdentified: '2021-03-22',
    symptoms: 'Itching, redness, rash',
    notes: 'Inform healthcare providers before procedures',
    active: true,
  },
  {
    id: 4,
    type: 'medication',
    severity: 'high',
    name: 'ACE Inhibitors',
    description: 'Severe reaction to blood pressure medication',
    dateIdentified: '2019-07-05',
    symptoms: 'Swelling of face, lips, tongue, or throat',
    notes: 'Avoid all ACE inhibitors, use alternative medications',
    active: true,
  },
];

const AlertBadge = ({ type, severity }) => {
  const getTypeColor = () => {
    switch (type) {
      case 'allergy': return 'bg-red-100 text-red-800';
      case 'condition': return 'bg-blue-100 text-blue-800';
      case 'medication': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = () => {
    switch (severity) {
      case 'high': return <ExclamationCircleIcon className="h-4 w-4" />;
      case 'medium': return <InformationCircleIcon className="h-4 w-4" />;
      default: return <BellIcon className="h-4 w-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'allergy': return 'Allergy';
      case 'condition': return 'Medical Condition';
      case 'medication': return 'Medication Reaction';
      default: return 'Alert';
    }
  };

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor()}`}>
      {getSeverityIcon()}
      <span className="ml-1">{getTypeLabel()}</span>
    </div>
  );
};

const MedicalAlerts = () => {
  const [alerts, setAlerts] = useState(sampleAlerts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [newAlert, setNewAlert] = useState({
    type: 'allergy',
    severity: 'medium',
    name: '',
    description: '',
    dateIdentified: new Date().toISOString().split('T')[0],
    symptoms: '',
    notes: '',
    active: true,
  });

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && alert.active) || 
                         (filter === 'inactive' && !alert.active) ||
                         alert.type === filter;
    
    const matchesSearch = alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.notes.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleAddAlert = (e) => {
    e.preventDefault();
    const newId = Math.max(...alerts.map(a => a.id), 0) + 1;
    setAlerts([...alerts, { ...newAlert, id: newId }]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateAlert = (e) => {
    e.preventDefault();
    setAlerts(alerts.map(alert => 
      alert.id === selectedAlert.id ? { ...newAlert, id: selectedAlert.id } : alert
    ));
    setSelectedAlert(null);
    resetForm();
  };

  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    setShowDeleteModal(null);
  };

  const toggleAlertStatus = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const resetForm = () => {
    setNewAlert({
      type: 'allergy',
      severity: 'medium',
      name: '',
      description: '',
      dateIdentified: new Date().toISOString().split('T')[0],
      symptoms: '',
      notes: '',
      active: true,
    });
  };

  const handleEditClick = (alert) => {
    setSelectedAlert(alert);
    setNewAlert({
      type: alert.type,
      severity: alert.severity,
      name: alert.name,
      description: alert.description,
      dateIdentified: alert.dateIdentified,
      symptoms: alert.symptoms,
      notes: alert.notes,
      active: alert.active,
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Medical Alerts & Allergies</h2>
            <p className="mt-1 text-sm text-gray-500">
              Important medical information for healthcare providers
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Alert
          </button>
        </div>

        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Alerts</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive</option>
                <option value="allergy">Allergies</option>
                <option value="condition">Conditions</option>
                <option value="medication">Medication Reactions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts Grid */}
        {filteredAlerts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{alert.name}</h3>
                      <div className="mt-1">
                        <AlertBadge type={alert.type} severity={alert.severity} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleEditClick(alert)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <PencilIcon className="h-5 w-5" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowDeleteModal(alert.id)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-600">{alert.description}</p>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-start">
                      <CalendarIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                      <span className="ml-2">Identified: {formatDate(alert.dateIdentified)}</span>
                    </div>
                    {alert.symptoms && (
                      <div className="flex items-start">
                        <ExclamationCircleIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                        <span className="ml-2">Symptoms: {alert.symptoms}</span>
                      </div>
                    )}
                  </div>
                  
                  {alert.notes && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                      <p className="text-sm text-yellow-700">{alert.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                            alert.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                          onClick={() => toggleAlertStatus(alert.id)}
                        >
                          {alert.active ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                      <div className="text-xs text-gray-500">
                        {alert.active ? 'Visible to providers' : 'Hidden from providers'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <ExclamationCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No alerts found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || filter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding a new medical alert.'}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add Alert
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Alert Modal */}
      {(showAddModal || selectedAlert) && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedAlert(null);
                    resetForm();
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {selectedAlert ? 'Edit Medical Alert' : 'Add New Medical Alert'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={selectedAlert ? handleUpdateAlert : handleAddAlert}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Alert Type</label>
                          <select
                            id="type"
                            name="type"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={newAlert.type}
                            onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
                            required
                          >
                            <option value="allergy">Allergy</option>
                            <option value="condition">Medical Condition</option>
                            <option value="medication">Medication Reaction</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
                          <select
                            id="severity"
                            name="severity"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={newAlert.severity}
                            onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})}
                            required
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            {newAlert.type === 'allergy' ? 'Allergen/Substance' : 
                             newAlert.type === 'condition' ? 'Condition Name' : 
                             newAlert.type === 'medication' ? 'Medication Name' : 'Name'}
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newAlert.name}
                            onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows="2"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newAlert.description}
                            onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="dateIdentified" className="block text-sm font-medium text-gray-700">
                            Date Identified
                          </label>
                          <input
                            type="date"
                            name="dateIdentified"
                            id="dateIdentified"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newAlert.dateIdentified}
                            onChange={(e) => setNewAlert({...newAlert, dateIdentified: e.target.value})}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                            Symptoms/Reactions
                          </label>
                          <input
                            type="text"
                            name="symptoms"
                            id="symptoms"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newAlert.symptoms}
                            onChange={(e) => setNewAlert({...newAlert, symptoms: e.target.value})}
                          />
                        </div>

                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Additional Notes
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows="2"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={newAlert.notes}
                            onChange={(e) => setNewAlert({...newAlert, notes: e.target.value})}
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            id="active"
                            name="active"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={newAlert.active}
                            onChange={(e) => setNewAlert({...newAlert, active: e.target.checked})}
                          />
                          <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                            This alert is active and visible to healthcare providers
                          </label>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        >
                          {selectedAlert ? 'Update Alert' : 'Add Alert'}
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => {
                            setShowAddModal(false);
                            setSelectedAlert(null);
                            resetForm();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal !== null && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Medical Alert
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this medical alert? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  onClick={() => handleDeleteAlert(showDeleteModal)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowDeleteModal(null)}
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

export default MedicalAlerts;
