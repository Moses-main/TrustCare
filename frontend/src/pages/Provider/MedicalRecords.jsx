import React, { useState, useEffect } from 'react';
import { FaFileMedical, FaFilePdf, FaFileImage, FaFileAlt, FaDownload, FaSearch, FaSpinner } from 'react-icons/fa';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import api from '../../services/api';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState(null);

  // Fetch records from the API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from the API
        try {
          const response = await api.get('/api/records/provider/records');
          if (response.data && Array.isArray(response.data)) {
            setRecords(response.data);
            return;
          }
          throw new Error('Invalid response format');
        } catch (apiError) {
          console.error('API Error:', apiError);
          // Fall through to mock data
          throw apiError;
        }
      } catch (err) {
        console.error('Error fetching records:', err);
        setError('Failed to load medical records. Using demo data.');
        toast.warning('Using demo data - API connection failed');
        
        // Fallback to mock data for demo purposes
        const mockRecords = [
          {
            id: '1',
            title: 'Annual Physical Exam',
            date: new Date('2023-05-15'),
            category: 'exams',
            type: 'pdf',
            doctor: 'Dr. Sarah Johnson',
            notes: 'Routine annual checkup. All vitals normal.',
            patientName: 'John Doe',
            status: 'active'
          },
          {
            id: '2',
            title: 'Blood Test Results',
            date: new Date('2023-04-20'),
            category: 'lab_results',
            type: 'pdf',
            doctor: 'Dr. Michael Chen',
            notes: 'Complete blood count and metabolic panel. All values within normal range.',
            patientName: 'Jane Smith',
            status: 'active'
          },
          {
            id: '3',
            title: 'X-Ray Results',
            date: new Date('2023-03-15'),
            category: 'imaging',
            type: 'image',
            doctor: 'Dr. Emily Wilson',
            notes: 'Chest X-ray shows clear lungs with no abnormalities detected.',
            patientName: 'Robert Johnson',
            status: 'active'
          },
          {
            id: '4',
            title: 'Prescription: Amoxicillin',
            date: new Date('2023-02-28'),
            category: 'prescriptions',
            type: 'document',
            doctor: 'Dr. Robert Taylor',
            notes: 'For bacterial infection. Take twice daily for 10 days.',
            patientName: 'Sarah Williams',
            status: 'active'
          }
        ];
        
        setRecords(mockRecords);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      record.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (category) => {
    const categories = {
      exams: 'Exams',
      lab_results: 'Lab Results',
      imaging: 'Imaging',
      prescriptions: 'Prescriptions',
      other: 'Other',
    };
    return categories[category] || category;
  };

  const getFileIcon = (type) => {
    const icons = {
      pdf: <FaFilePdf className="h-5 w-5 text-red-500" />,
      image: <FaFileImage className="h-5 w-5 text-blue-500" />,
      document: <FaFileAlt className="h-5 w-5 text-gray-500" />,
    };
    return icons[type] || <FaFileMedical className="h-5 w-5 text-green-500" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Medical Records</h2>
        <p className="mt-1 text-sm text-gray-600">
          Access and manage your complete medical history
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="exams">Exams</option>
                <option value="lab_results">Lab Results</option>
                <option value="imaging">Imaging</option>
                <option value="prescriptions">Prescriptions</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center">
            <FaFileMedical className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You have no medical records available.'}
            </p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <li key={record.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getFileIcon(record.type)}
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {record.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {getCategoryLabel(record.category)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 flex justify-between">
                        <div className="flex text-sm text-gray-500">
                          <span className="mr-2">
                            {format(new Date(record.date), 'MMM d, yyyy')}
                          </span>
                          <span>•</span>
                          <span className="ml-2">
                            {record.doctor}
                          </span>
                        </div>
                      </div>
                      {record.notes && (
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {record.notes}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FaDownload className="-ml-0.5 mr-2 h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Your medical records are secure</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                All your medical records are encrypted and stored securely. You can access them anytime, 
                but they are only shared with healthcare providers you authorize.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
