import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaPlus, FaTrash, FaUserMd, FaSpinner } from 'react-icons/fa';
import { 
  getTimeBasedGrants, 
  createTimeBasedGrant, 
  deleteTimeBasedGrant 
} from '../../services/accessControlService';
import { toast } from 'react-toastify';

const TimeBasedAccess = () => {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newGrant, setNewGrant] = useState({
    provider: '',
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00',
    permissions: [],
  });

  const [providers, setProviders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        setLoading(true);
        const data = await getTimeBasedGrants();
        setGrants(data);
      } catch (err) {
        setError('Failed to load time-based grants');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrants();
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await fetch('/api/providers');
        const providers = await data.json();
        setProviders(providers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProviders();
  }, []);

  const handleAddGrant = async () => {
    try {
      const createdGrant = await createTimeBasedGrant({
        ...newGrant,
        status: 'active'
      });
      
      setGrants([...grants, createdGrant]);
      setIsModalOpen(false);
      setNewGrant({
        provider: '',
        startDate: '',
        endDate: '',
        permissions: [],
      });
      toast.success('Time-based access granted successfully');
    } catch (err) {
      toast.error('Failed to create time-based grant');
      console.error(err);
    }
  };

  const handleDeleteGrant = async (id) => {
    try {
      await deleteTimeBasedGrant(id);
      setGrants(grants.filter(grant => grant.id !== id));
      toast.success('Time-based access removed');
    } catch (err) {
      toast.error('Failed to delete time-based grant');
      console.error(err);
    }
  };

  const handlePermissionToggle = (permission) => {
    setNewGrant(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-500 text-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const permissionOptions = [
    { id: 'viewRecords', label: 'View Records' },
    { id: 'editRecords', label: 'Edit Records' },
    { id: 'prescribeMedication', label: 'Prescribe Medication' },
    { id: 'viewBilling', label: 'View Billing' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">Time-based Access</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Time-based Access
        </button>
      </div>
      
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700">Current Permissions:</h3>
        <div className="flex flex-wrap gap-4">
          {permissionOptions.map(permission => (
            <label key={permission.id} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={newGrant.permissions.includes(permission.id)}
                onChange={() => handlePermissionToggle(permission.id)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{permission.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accessGrants.map(grant => (
              <tr key={grant.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{grant.provider}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(grant.startDate).toLocaleDateString()} - {new Date(grant.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaClock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">
                      {grant.startTime} - {grant.endTime}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {grant.permissions.map(permission => (
                      <span key={permission} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {permission.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleRemoveGrant(grant.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeBasedAccess;
