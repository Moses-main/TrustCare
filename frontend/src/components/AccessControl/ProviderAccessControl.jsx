import React, { useState, useEffect } from 'react';
import { FaUserMd, FaTrash, FaEdit, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { 
  getProviderAccessList, 
  updateProviderAccess,
  applyTemplateToProvider
} from '../../services/accessControlService';
import { toast } from 'react-toastify';

const ProviderAccessControl = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingPermissions, setEditingPermissions] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templates, setTemplates] = useState([
    { id: 'primary-care', name: 'Primary Care' },
    { id: 'specialist', name: 'Specialist' },
    { id: 'emergency', name: 'Emergency' },
  ]);

  const handleEdit = (provider) => {
    setEditingId(provider.id);
    setEditingPermissions({ ...provider.permissions });
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const data = await getProviderAccessList();
        setProviders(data);
      } catch (err) {
        setError('Failed to load provider access list');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleSave = async (id) => {
    try {
      await updateProviderAccess(id, editingPermissions);
      setProviders(providers.map(provider => 
        provider.id === id 
          ? { ...provider, permissions: { ...editingPermissions } } 
          : provider
      ));
      setEditingId(null);
      toast.success('Provider access updated successfully');
    } catch (err) {
      toast.error('Failed to update provider access');
      console.error(err);
    }
  };

  const handlePermissionChange = (permission, value) => {
    setEditingPermissions(prev => ({
      ...prev,
      [permission]: value
    }));
  };

  const handleApplyTemplate = async (providerId) => {
    if (!selectedTemplate) return;
    
    try {
      await applyTemplateToProvider(selectedTemplate, providerId);
      const updatedProviders = await getProviderAccessList();
      setProviders(updatedProviders);
      setSelectedTemplate('');
      toast.success('Template applied successfully');
    } catch (err) {
      toast.error('Failed to apply template');
      console.error(err);
    }
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

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">Provider Access Control</h2>
        <div className="flex space-x-2">
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a template...</option>
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          <button 
            onClick={() => selectedTemplate && handleApplyTemplate(editingId)}
            disabled={!selectedTemplate || !editingId}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedTemplate && editingId
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Apply Template
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Records</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit Records</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescribe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Billing</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUserMd className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                      <div className="text-sm text-gray-500">{provider.specialty}</div>
                    </div>
                  </div>
                </td>
                {editingId === provider.id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={editingPermissions.viewRecords || false}
                        onChange={(e) => handlePermissionChange('viewRecords', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={editingPermissions.editRecords || false}
                        onChange={(e) => handlePermissionChange('editRecords', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={editingPermissions.prescribeMedication || false}
                        onChange={(e) => handlePermissionChange('prescribeMedication', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={editingPermissions.viewBilling || false}
                        onChange={(e) => handlePermissionChange('viewBilling', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleSave(provider.id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        <FaCheck className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTimes className="h-5 w-5" />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${provider.permissions.viewRecords ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {provider.permissions.viewRecords ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${provider.permissions.editRecords ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {provider.permissions.editRecords ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${provider.permissions.prescribeMedication ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {provider.permissions.prescribeMedication ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${provider.permissions.viewBilling ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {provider.permissions.viewBilling ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(provider)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderAccessControl;
