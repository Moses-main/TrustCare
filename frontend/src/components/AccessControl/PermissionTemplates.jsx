import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaUserMd, FaUserNurse, FaUserInjured } from 'react-icons/fa';

const PermissionTemplates = () => {
  // Sample permission templates
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Primary Care Visit',
      description: 'Standard permissions for primary care physicians during a routine visit',
      permissions: {
        viewRecords: true,
        editRecords: true,
        prescribeMedication: true,
        orderTests: true,
        viewBilling: false,
        scheduleAppointments: true,
      },
      defaultDuration: '24 hours',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Specialist Consultation',
      description: 'Permissions for specialists to review relevant records',
      permissions: {
        viewRecords: true,
        editRecords: false,
        prescribeMedication: true,
        orderTests: true,
        viewBilling: false,
        scheduleAppointments: false,
      },
      defaultDuration: '72 hours',
      isDefault: true,
    },
    {
      id: 3,
      name: 'Emergency Access',
      description: 'Full access for emergency situations',
      permissions: {
        viewRecords: true,
        editRecords: true,
        prescribeMedication: true,
        orderTests: true,
        viewBilling: true,
        scheduleAppointments: true,
      },
      defaultDuration: '6 hours',
      isDefault: true,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    permissions: {
      viewRecords: false,
      editRecords: false,
      prescribeMedication: false,
      orderTests: false,
      viewBilling: false,
      scheduleAppointments: false,
    },
    defaultDuration: '24 hours',
  });

  const availablePermissions = [
    { id: 'viewRecords', label: 'View Medical Records', description: 'View patient medical history and records' },
    { id: 'editRecords', label: 'Edit Records', description: 'Add or update medical records' },
    { id: 'prescribeMedication', label: 'Prescribe Medication', description: 'Create and manage prescriptions' },
    { id: 'orderTests', label: 'Order Lab Tests', description: 'Request laboratory tests and view results' },
    { id: 'viewBilling', label: 'View Billing', description: 'Access billing and insurance information' },
    { id: 'scheduleAppointments', label: 'Schedule Appointments', description: 'Book and manage appointments' },
  ];

  const durationOptions = [
    { value: '1 hour', label: '1 Hour' },
    { value: '6 hours', label: '6 Hours' },
    { value: '12 hours', label: '12 Hours' },
    { value: '24 hours', label: '24 Hours' },
    { value: '72 hours', label: '72 Hours' },
    { value: '1 week', label: '1 Week' },
    { value: '30 days', label: '30 Days' },
    { value: 'indefinite', label: 'Indefinite' },
  ];

  const handleCreateTemplate = () => {
    if (newTemplate.name && newTemplate.description) {
      setTemplates([
        ...templates,
        {
          ...newTemplate,
          id: Date.now(),
          isDefault: false,
        },
      ]);
      setNewTemplate({
        name: '',
        description: '',
        permissions: {
          viewRecords: false,
          editRecords: false,
          prescribeMedication: false,
          orderTests: false,
          viewBilling: false,
          scheduleAppointments: false,
        },
        defaultDuration: '24 hours',
      });
      setIsCreating(false);
    }
  };

  const handleUpdateTemplate = () => {
    if (editingId && newTemplate.name) {
      setTemplates(
        templates.map(template =>
          template.id === editingId
            ? { ...newTemplate, id: editingId, isDefault: template.isDefault }
            : template
        )
      );
      setEditingId(null);
      setNewTemplate({
        name: '',
        description: '',
        permissions: {
          viewRecords: false,
          editRecords: false,
          prescribeMedication: false,
          orderTests: false,
          viewBilling: false,
          scheduleAppointments: false,
        },
        defaultDuration: '24 hours',
      });
    }
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleEditTemplate = (template) => {
    setEditingId(template.id);
    setNewTemplate({
      name: template.name,
      description: template.description,
      permissions: { ...template.permissions },
      defaultDuration: template.defaultDuration,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePermissionToggle = (permission, value) => {
    setNewTemplate(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: value,
      },
    }));
  };

  const getTemplateIcon = (templateName) => {
    if (templateName.includes('Emergency')) {
      return <FaUserInjured className="h-5 w-5 text-red-500" />;
    } else if (templateName.includes('Specialist')) {
      return <FaUserMd className="h-5 w-5 text-blue-500" />;
    } else {
      return <FaUserNurse className="h-5 w-5 text-green-500" />;
    }
  };

  const renderTemplateForm = () => (
    <div className="bg-white shadow rounded-lg p-6 mb-8 border border-blue-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {editingId ? 'Edit Permission Template' : 'Create New Permission Template'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
            <input
              type="text"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="e.g., Primary Care Visit"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-2 h-24"
              placeholder="Describe the purpose of this template..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Duration</label>
            <select
              value={newTemplate.defaultDuration}
              onChange={(e) => setNewTemplate({...newTemplate, defaultDuration: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
          <div className="space-y-3">
            {availablePermissions.map(permission => (
              <div key={permission.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`permission-${permission.id}`}
                    type="checkbox"
                    checked={newTemplate.permissions[permission.id] || false}
                    onChange={(e) => handlePermissionToggle(permission.id, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`permission-${permission.id}`} className="font-medium text-gray-700">
                    {permission.label}
                  </label>
                  <p className="text-gray-500 text-xs">{permission.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => {
            setEditingId(null);
            setIsCreating(false);
            setNewTemplate({
              name: '',
              description: '',
              permissions: {
                viewRecords: false,
                editRecords: false,
                prescribeMedication: false,
                orderTests: false,
                viewBilling: false,
                scheduleAppointments: false,
              },
              defaultDuration: '24 hours',
            });
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={editingId ? handleUpdateTemplate : handleCreateTemplate}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {editingId ? 'Update Template' : 'Create Template'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Permission Templates</h2>
          <p className="text-sm text-gray-500">Pre-configured permission sets for different access scenarios</p>
        </div>
        {!isCreating && !editingId && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="-ml-1 mr-2 h-4 w-4" />
            New Template
          </button>
        )}
      </div>

      {(isCreating || editingId) && renderTemplateForm()}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {templates.length > 0 ? (
            templates.map(template => (
              <li key={template.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {getTemplateIcon(template.name)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{template.name}</div>
                      <div className="text-sm text-gray-500">{template.description}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {Object.entries(template.permissions)
                          .filter(([_, value]) => value)
                          .map(([key]) => (
                            <span key={key} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          ))}
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {template.defaultDuration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    {!template.isDefault && (
                      <>
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    {template.isDefault && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-12 text-center">
              <div className="text-gray-400">No permission templates found. Create one to get started.</div>
            </li>
          )}
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800">How to use permission templates</h3>
        <div className="mt-2 text-sm text-blue-700">
          <p>Permission templates allow you to quickly apply standardized access levels to healthcare providers.</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Create templates for common access scenarios (e.g., primary care visits, specialist consultations)</li>
            <li>Apply templates when granting access to save time and ensure consistency</li>
            <li>Default templates cannot be modified or deleted</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PermissionTemplates;
