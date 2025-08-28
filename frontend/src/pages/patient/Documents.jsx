import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt, FaUpload, FaSearch, FaTrash, FaDownload } from 'react-icons/fa';

const DocumentCard = ({ document, onDelete }) => {
  const getFileIcon = (type) => {
    if (type.includes('pdf')) return <FaFilePdf className="text-red-500 text-2xl" />;
    if (type.includes('word') || type.includes('document')) return <FaFileWord className="text-blue-500 text-2xl" />;
    if (type.includes('image')) return <FaFileImage className="text-green-500 text-2xl" />;
    return <FaFileAlt className="text-gray-500 text-2xl" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {getFileIcon(document.type)}
          <div>
            <h3 className="font-medium text-gray-900">{document.name}</h3>
            <p className="text-sm text-gray-500">{document.date}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => window.open(URL.createObjectURL(document.file), '_blank')}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
            title="View"
          >
            <FaFileAlt />
          </button>
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = URL.createObjectURL(document.file);
              link.download = document.name;
              link.click();
            }}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full"
            title="Download"
          >
            <FaDownload />
          </button>
          <button 
            onClick={() => onDelete(document.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);

  // Load sample documents (in a real app, this would be an API call)
  useEffect(() => {
    // This is mock data - replace with actual API call
    const mockDocuments = [
      {
        id: 1,
        name: 'Lab Results - March 2023.pdf',
        type: 'application/pdf',
        date: 'March 15, 2023',
        size: '2.4 MB',
        file: new File([''], 'Lab Results - March 2023.pdf', { type: 'application/pdf' })
      },
      {
        id: 2,
        name: 'Prescription - Dr. Smith.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        date: 'February 28, 2023',
        size: '1.2 MB',
        file: new File([''], 'Prescription - Dr. Smith.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
      },
      {
        id: 3,
        name: 'X-Ray - Chest.jpg',
        type: 'image/jpeg',
        date: 'February 10, 2023',
        size: '3.5 MB',
        file: new File([''], 'X-Ray - Chest.jpg', { type: 'image/jpeg' })
      },
    ];
    setDocuments(mockDocuments);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newDocument = {
        id: Date.now(),
        name: file.name,
        type: file.type,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        file: file
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      setFile(null);
      document.getElementById('file-upload').value = '';
      setIsUploading(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <p className="text-gray-600">View and manage your medical documents</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label 
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              <FaUpload className="mr-2" />
              Upload
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            
            {file && (
              <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Save'}
              </button>
            )}
          </div>
        </div>
      </div>

      {file && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <div className="flex justify-between items-center">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-blue-800 truncate">
                {file.name}
              </p>
              <p className="text-sm text-blue-600">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="ml-4 flex-shrink-0 text-blue-700 hover:text-blue-900"
            >
              <span className="sr-only">Remove</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredDocuments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredDocuments.map((document) => (
              <li key={document.id} className="px-4 py-4">
                <DocumentCard document={document} onDelete={handleDelete} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading a new document.
            </p>
            <div className="mt-6">
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                <FaUpload className="-ml-1 mr-2 h-5 w-5" />
                Upload Document
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
