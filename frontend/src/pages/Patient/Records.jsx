import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileImage, FaFileAlt, FaDownload, FaSearch, FaSortUp, FaSortDown, FaFilter } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import api from '../../services/api';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });
  const [error, setError] = useState(null);

  // Fetch records from API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        setError(null);
        
        try {
          // Try to fetch from the real API first
          console.log('Fetching records from API...');
          const response = await api.get('/api/records/me/records');
          console.log('API Response:', response);
          
          if (response.data && Array.isArray(response.data)) {
            console.log('Records received:', response.data.length);
            setRecords(response.data);
            return;
          }
          throw new Error('Invalid response format: ' + JSON.stringify(response.data));
        } catch (apiError) {
          console.error('API Error Details:', {
            message: apiError.message,
            response: apiError.response?.data,
            status: apiError.response?.status,
            config: {
              url: apiError.config?.url,
              method: apiError.config?.method,
              headers: apiError.config?.headers
            }
          });
          // Fall through to mock data
          throw apiError;
        }
      } catch (err) {
        console.error('Error fetching records:', err);
        setError('Failed to load medical records. Please try again later.');
        toast.error('Failed to load medical records');
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const getSortedAndFilteredRecords = () => {
    let filtered = [...records];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(record => 
        record.title.toLowerCase().includes(term) ||
        record.doctor.toLowerCase().includes(term) ||
        record.notes.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.type !== 'all') {
      filtered = filtered.filter(record => record.type === filters.type);
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(record => record.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(record => record.date <= filters.dateTo);
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'image':
        return <FaFileImage className="text-blue-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sortedAndFilteredRecords = getSortedAndFilteredRecords();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Medical Records</h1>
          <p className="mt-2 text-sm text-gray-600">View and manage your medical records</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="all">All Types</option>
                <option value="exam">Exams</option>
                <option value="lab">Lab Results</option>
                <option value="imaging">Imaging</option>
                <option value="prescription">Prescriptions</option>
              </select>
              
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="block w-full md:w-auto pl-3 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  placeholder="From"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  className="block w-full md:w-auto pl-3 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  placeholder="To"
                />
              </div>
              
              <button
                onClick={() => setFilters({ type: 'all', dateFrom: '', dateTo: '' })}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('title')}
                  >
                    <div className="flex items-center">
                      Title
                      {sortConfig.key === 'title' && (
                        sortConfig.direction === 'asc' ? 
                          <FaSortUp className="ml-1" /> : 
                          <FaSortDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('date')}
                  >
                    <div className="flex items-center">
                      Date
                      {sortConfig.key === 'date' && (
                        sortConfig.direction === 'asc' ? 
                          <FaSortUp className="ml-1" /> : 
                          <FaSortDown className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAndFilteredRecords.length > 0 ? (
                  sortedAndFilteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                            {getFileIcon(record.fileType)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.title}</div>
                            <div className="text-sm text-gray-500">{record.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(record.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {record.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.doctor}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {record.notes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={record.fileUrl}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                          download
                        >
                          <FaDownload className="inline mr-1" /> Download
                        </a>
                        <a
                          href={record.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Records</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{records.length}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Lab Results</dt>
              <dd className="mt-1 text-3xl font-semibold text-blue-600">
                {records.filter(r => r.type === 'lab').length}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Imaging</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">
                {records.filter(r => r.type === 'imaging').length}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Prescriptions</dt>
              <dd className="mt-1 text-3xl font-semibold text-purple-600">
                {records.filter(r => r.type === 'prescription').length}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
