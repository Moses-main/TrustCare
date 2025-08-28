import api from './api';

// Provider Access Control
export const getProviderAccessList = async () => {
  try {
    const response = await api.get('/api/access-control/providers');
    return response.data;
  } catch (error) {
    console.error('Error fetching provider access list:', error);
    throw error;
  }
};

export const updateProviderAccess = async (providerId, permissions) => {
  try {
    const response = await api.put(`/api/access-control/providers/${providerId}`, {
      permissions,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating provider access:', error);
    throw error;
  }
};

// Time-based Access
export const getTimeBasedGrants = async () => {
  try {
    const response = await api.get('/api/access-control/time-based');
    return response.data;
  } catch (error) {
    console.error('Error fetching time-based grants:', error);
    throw error;
  }
};

export const createTimeBasedGrant = async (grantData) => {
  try {
    const response = await api.post('/api/access-control/time-based', grantData);
    return response.data;
  } catch (error) {
    console.error('Error creating time-based grant:', error);
    throw error;
  }
};

export const deleteTimeBasedGrant = async (grantId) => {
  try {
    await api.delete(`/api/access-control/time-based/${grantId}`);
  } catch (error) {
    console.error('Error deleting time-based grant:', error);
    throw error;
  }
};

// Emergency Access Settings
export const getEmergencyContacts = async () => {
  try {
    const response = await api.get('/api/access-control/emergency-contacts');
    return response.data;
  } catch (error) {
    console.error('Error fetching emergency contacts:', error);
    throw error;
  }
};

export const addEmergencyContact = async (contactData) => {
  try {
    const response = await api.post('/api/access-control/emergency-contacts', contactData);
    return response.data;
  } catch (error) {
    console.error('Error adding emergency contact:', error);
    throw error;
  }
};

export const updateEmergencyContact = async (contactId, updates) => {
  try {
    const response = await api.put(`/api/access-control/emergency-contacts/${contactId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating emergency contact:', error);
    throw error;
  }
};

export const deleteEmergencyContact = async (contactId) => {
  try {
    await api.delete(`/api/access-control/emergency-contacts/${contactId}`);
  } catch (error) {
    console.error('Error deleting emergency contact:', error);
    throw error;
  }
};

// Access History Log
export const getAccessHistory = async (filters = {}) => {
  try {
    const response = await api.get('/api/access-control/history', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching access history:', error);
    throw error;
  }
};

// Permission Templates
export const getPermissionTemplates = async () => {
  try {
    const response = await api.get('/api/access-control/templates');
    return response.data;
  } catch (error) {
    console.error('Error fetching permission templates:', error);
    throw error;
  }
};

export const createPermissionTemplate = async (templateData) => {
  try {
    const response = await api.post('/api/access-control/templates', templateData);
    return response.data;
  } catch (error) {
    console.error('Error creating permission template:', error);
    throw error;
  }
};

export const updatePermissionTemplate = async (templateId, updates) => {
  try {
    const response = await api.put(`/api/access-control/templates/${templateId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating permission template:', error);
    throw error;
  }
};

export const deletePermissionTemplate = async (templateId) => {
  try {
    await api.delete(`/api/access-control/templates/${templateId}`);
  } catch (error) {
    console.error('Error deleting permission template:', error);
    throw error;
  }
};

// Apply a permission template to a provider
export const applyTemplateToProvider = async (templateId, providerId) => {
  try {
    const response = await api.post(`/api/access-control/templates/${templateId}/apply`, { providerId });
    return response.data;
  } catch (error) {
    console.error('Error applying template to provider:', error);
    throw error;
  }
};
