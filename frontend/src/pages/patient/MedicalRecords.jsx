import React, { useState } from 'react';
import { FaFilePdf, FaFileImage, FaFileWord, FaSearch, FaDownload, FaEye, FaTrash } from 'react-icons/fa';

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for medical records
  const [records, setRecords] = useState([
    {
      id: 1,
      name: 'Blood Test Results',
      type: 'pdf',
      date: '2023-06-15',
      doctor: 'Dr. Smith',
      category: 'Lab Results',
      size: '2.5 MB'
    },
    {
      id: 2,
      name: 'X-Ray Scan',
      type: 'image',
      date: '2023-05-28',
      doctor: 'Dr. Johnson',
      category: 'Imaging',
      size: '5.1 MB'
    },
    {
      id: 3,
      name: 'Prescription',
      type: 'doc',
      date: '2023-07-02',
      doctor: 'Dr. Williams',
      category: 'Prescriptions',
      size: '1.2 MB'
    },
  ]);

  const filteredRecords = records.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FaFilePdf className="text-red-500 text-2xl" />;
      case 'image':
        return <FaFileImage className="text-blue-500 text-2xl" />;
      case 'doc':
        return <FaFileWord className="text-blue-600 text-2xl" />;
      default:
        return <FaFilePdf className="text-gray-500 text-2xl" />;
    }
  };

  const handleView = (id) => {
    // Implement view functionality
    console.log(`Viewing record ${id}`);
  };

  const handleDownload = (id) => {
    // Implement download functionality
    console.log(`Downloading record ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <span>Upload Record</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Record
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getFileIcon(record.type)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {record.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.doctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleView(record.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title="View"
                    >
                      <FaEye className="inline" />
                    </button>
                    <button
                      onClick={() => handleDownload(record.id)}
                      className="text-green-600 hover:text-green-900 mr-4"
                      title="Download"
                    >
                      <FaDownload className="inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <FaTrash className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
