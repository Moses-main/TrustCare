import React, { useState } from 'react';
import { FaSearch, FaUserMd, FaUserNurse, FaFileMedical, FaCalendarAlt, FaFilter } from 'react-icons/fa';

const AccessHistoryLog = () => {
  // Sample data for access history
  const [accessLogs, setAccessLogs] = useState([
    {
      id: 1,
      timestamp: '2023-06-15T09:30:15Z',
      user: 'Dr. Sarah Johnson',
      userRole: 'Cardiologist',
      action: 'Viewed',
      resource: 'Medical Records',
      resourceType: 'Patient Records',
      details: 'Viewed patient medical history',
      ipAddress: '192.168.1.45',
      location: 'New York, NY',
      device: 'Desktop Chrome',
    },
    {
      id: 2,
      timestamp: '2023-06-15T10:15:22Z',
      user: 'Nurse Emily Chen',
      userRole: 'Registered Nurse',
      action: 'Updated',
      resource: 'Vital Signs',
      resourceType: 'Clinical Notes',
      details: 'Updated blood pressure reading',
      ipAddress: '192.168.1.67',
      location: 'New York, NY',
      device: 'iPad Safari',
    },
    {
      id: 3,
      timestamp: '2023-06-14T14:22:10Z',
      user: 'Dr. Michael Brown',
      userRole: 'Primary Care',
      action: 'Prescribed',
      resource: 'Medication: Lisinopril',
      resourceType: 'Prescription',
      details: 'Prescribed new medication',
      ipAddress: '203.0.113.12',
      location: 'Remote',
      device: 'MacBook Chrome',
    },
  ]);

  // Filter states
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    user: '',
    action: '',
    resourceType: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLog, setExpandedLog] = useState(null);

  // Available filter options
  const actionOptions = ['All', 'Viewed', 'Created', 'Updated', 'Deleted', 'Prescribed'];
  const resourceTypeOptions = ['All', 'Patient Records', 'Clinical Notes', 'Prescription', 'Lab Results', 'Billing'];

  // Apply filters to logs
  const filteredLogs = accessLogs.filter(log => {
    const matchesSearch = searchQuery === '' || 
      Object.values(log).some(val => 
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      
      switch (key) {
        case 'dateFrom':
          return new Date(log.timestamp) >= new Date(value);
        case 'dateTo':
          const nextDay = new Date(value);
          nextDay.setDate(nextDay.getDate() + 1);
          return new Date(log.timestamp) < nextDay;
        case 'user':
          return log.user.toLowerCase().includes(value.toLowerCase());
        case 'action':
          return value === 'All' || log.action === value;
        case 'resourceType':
          return value === 'All' || log.resourceType === value;
        default:
          return true;
      }
    });
    
    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      user: '',
      action: '',
      resourceType: '',
    });
    setSearchQuery('');
  };

  const getActionIcon = (action) => {
    switch (action.toLowerCase()) {
      case 'viewed':
        return <FaSearch className="text-blue-500" />;
      case 'updated':
        return <FaFileMedical className="text-yellow-500" />;
      case 'prescribed':
        return <FaFileMedical className="text-green-500" />;
      default:
        return <FaFileMedical className="text-gray-500" />;
    }
  };

  const getUserIcon = (userRole) => {
    return userRole.toLowerCase().includes('nurse') ? 
      <FaUserNurse className="text-purple-500" /> : 
      <FaUserMd className="text-blue-500" />;
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Access History Log</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search access logs..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <FaFilter className="mr-2 text-gray-500" /> Filters
          </h3>
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-3 w-3 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="pl-8 w-full text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-3 w-3 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="pl-8 w-full text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">User</label>
            <input
              type="text"
              placeholder="Filter by user"
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
              className="w-full text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Action</label>
            <select
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
              className="w-full text-sm border-gray-300 rounded-md"
            >
              <option value="">All Actions</option>
              {actionOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Resource Type</label>
            <select
              value={filters.resourceType}
              onChange={(e) => handleFilterChange('resourceType', e.target.value)}
              className="w-full text-sm border-gray-300 rounded-md"
            >
              <option value="">All Types</option>
              {resourceTypeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Access Logs Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.length > 0 ? (
              filteredLogs.map(log => (
                <React.Fragment key={log.id}>
                  <tr 
                    className={`hover:bg-gray-50 cursor-pointer ${expandedLog === log.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          {getActionIcon(log.action)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{log.action}</div>
                          <div className="text-xs text-gray-500">{log.resourceType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {getUserIcon(log.userRole)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{log.user}</div>
                          <div className="text-xs text-gray-500">{log.userRole}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{log.resource}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{log.details}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{log.details}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        {expandedLog === log.id ? 'Less' : 'More'} details
                      </button>
                    </td>
                  </tr>
                  {expandedLog === log.id && (
                    <tr className="bg-blue-50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="font-medium text-gray-700">Access Details</h4>
                            <dl className="mt-2 space-y-1">
                              <div className="flex">
                                <dt className="w-32 text-gray-500">IP Address:</dt>
                                <dd className="font-medium">{log.ipAddress}</dd>
                              </div>
                              <div className="flex">
                                <dt className="w-32 text-gray-500">Location:</dt>
                                <dd className="font-medium">{log.location}</dd>
                              </div>
                              <div className="flex">
                                <dt className="w-32 text-gray-500">Device:</dt>
                                <dd className="font-medium">{log.device}</dd>
                              </div>
                            </dl>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">Security Information</h4>
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Secure Connection
                              </span>
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {log.action} Verified
                              </span>
                            </div>
                            <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
                              Report Suspicious Activity
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No access logs found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLogs.length}</span> of{' '}
          <span className="font-medium">{filteredLogs.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            disabled
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            disabled
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessHistoryLog;
