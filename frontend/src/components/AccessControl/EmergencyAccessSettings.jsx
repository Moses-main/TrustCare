import React, { useState } from 'react';
import { FaUserMd, FaPhone, FaTrash, FaPlus, FaExclamationTriangle } from 'react-icons/fa';

const EmergencyAccessSettings = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: 'Dr. Michael Chen',
      role: 'Emergency Physician',
      phone: '+1 (555) 123-4567',
      email: 'm.chen@emergencycare.com',
      permissions: ['viewRecords', 'prescribeMedication', 'orderTests'],
      isActive: true,
    },
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    permissions: [],
  });

  const [settings, setSettings] = useState({
    enableEmergencyAccess: true,
    requireVerification: true,
    autoGrantAccess: true,
    notificationRecipients: ['patient@example.com', 'primary@caregiver.com'],
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.role && newContact.phone) {
      setEmergencyContacts([
        ...emergencyContacts,
        { ...newContact, id: Date.now(), isActive: true },
      ]);
      setNewContact({
        name: '',
        role: '',
        phone: '',
        email: '',
        permissions: [],
      });
    }
  };

  const handleRemoveContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
  };

  const toggleContactStatus = (id) => {
    setEmergencyContacts(
      emergencyContacts.map(contact =>
        contact.id === id ? { ...contact, isActive: !contact.isActive } : contact
      )
    );
  };

  const handlePermissionToggle = (permission) => {
    setNewContact(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  const availablePermissions = [
    { id: 'viewRecords', label: 'View Medical Records' },
    { id: 'editRecords', label: 'Edit Medical Records' },
    { id: 'prescribeMedication', label: 'Prescribe Medication' },
    { id: 'orderTests', label: 'Order Lab Tests' },
    { id: 'viewBilling', label: 'View Billing Information' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <FaExclamationTriangle className="h-6 w-6 text-yellow-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Emergency Access Settings</h2>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Enable Emergency Access</h3>
              <p className="text-sm text-gray-500">Allow emergency contacts to access your medical records in case of emergency</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableEmergencyAccess}
                onChange={(e) => handleSettingChange('enableEmergencyAccess', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Emergency Contacts</h3>
              <button
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => document.getElementById('addContactModal').showModal()}
              >
                <FaPlus className="inline mr-1" /> Add Contact
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emergencyContacts.map(contact => (
                    <tr key={contact.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FaUserMd className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <FaPhone className="h-3 w-3 text-gray-400 mr-1" />
                            {contact.phone}
                          </div>
                          {contact.email && (
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {contact.permissions.map(permission => {
                            const perm = availablePermissions.find(p => p.id === permission);
                            return (
                              <span key={permission} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                {perm ? perm.label : permission}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${contact.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {contact.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleContactStatus(contact.id)}
                            className={`text-sm ${contact.isActive ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                          >
                            {contact.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleRemoveContact(contact.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Access Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Require Verification</h4>
                  <p className="text-xs text-gray-500">Require additional verification before granting emergency access</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requireVerification}
                    onChange={(e) => handleSettingChange('requireVerification', e.target.checked)}
                    className="sr-only peer"
                    disabled={!settings.enableEmergencyAccess}
                  />
                  <div className={`w-11 h-6 ${settings.enableEmergencyAccess ? 'bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300' : 'bg-gray-100'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${settings.enableEmergencyAccess ? 'peer-checked:bg-blue-600' : 'peer-checked:bg-gray-400'}`}></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Auto-Grant Access in Emergency</h4>
                  <p className="text-xs text-gray-500">Automatically grant access when emergency is detected</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoGrantAccess}
                    onChange={(e) => handleSettingChange('autoGrantAccess', e.target.checked)}
                    className="sr-only peer"
                    disabled={!settings.enableEmergencyAccess}
                  />
                  <div className={`w-11 h-6 ${settings.enableEmergencyAccess ? 'bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300' : 'bg-gray-100'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${settings.enableEmergencyAccess ? 'peer-checked:bg-blue-600' : 'peer-checked:bg-gray-400'}`}></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Recipients</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {settings.notificationRecipients.map((recipient, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {recipient}
                      <button
                        type="button"
                        className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-600 hover:bg-blue-300"
                        onClick={() => {
                          const newRecipients = [...settings.notificationRecipients];
                          newRecipients.splice(index, 1);
                          handleSettingChange('notificationRecipients', newRecipients);
                        }}
                      >
                        <span className="sr-only">Remove</span>
                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Add email address"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        handleSettingChange('notificationRecipients', [...settings.notificationRecipients, e.target.value]);
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      const input = e.target.previousSibling;
                      if (input.value) {
                        handleSettingChange('notificationRecipients', [...settings.notificationRecipients, input.value]);
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      <dialog id="addContactModal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Add Emergency Contact</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Dr. John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={newContact.role}
                  onChange={(e) => setNewContact({...newContact, role: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="e.g., Primary Care Physician"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    className="pl-10 w-full border border-gray-300 rounded-md p-2"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="space-y-2">
                {availablePermissions.map(permission => (
                  <label key={permission.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newContact.permissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost mr-2">Cancel</button>
              <button 
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  if (newContact.name && newContact.role && newContact.phone) {
                    handleAddContact();
                    document.getElementById('addContactModal').close();
                  }
                }}
              >
                Add Contact
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default EmergencyAccessSettings;
