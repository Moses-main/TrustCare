import React, { useState } from 'react';
import ProviderAccessControl from '../../components/AccessControl/ProviderAccessControl';
import TimeBasedAccess from '../../components/AccessControl/TimeBasedAccess';
import EmergencyAccessSettings from '../../components/AccessControl/EmergencyAccessSettings';
import AccessHistoryLog from '../../components/AccessControl/AccessHistoryLog';
import PermissionTemplates from '../../components/AccessControl/PermissionTemplates';

const AccessPermissionPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 'provider', label: 'Provider Access', component: <ProviderAccessControl /> },
    { id: 'time-based', label: 'Time-based Access', component: <TimeBasedAccess /> },
    { id: 'emergency', label: 'Emergency Access', component: <EmergencyAccessSettings /> },
    { id: 'history', label: 'Access History', component: <AccessHistoryLog /> },
    { id: 'templates', label: 'Permission Templates', component: <PermissionTemplates /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Access Permission Management</h1>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default AccessPermissionPage;
