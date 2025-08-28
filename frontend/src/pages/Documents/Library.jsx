import React, { useState } from 'react';
import { 
  FaFileAlt as DocumentTextIcon, 
  FaFileMedicalAlt as DocumentReportIcon, 
  FaFileDownload as DocumentDownloadIcon, 
  FaSearch as DocumentSearchIcon, 
  FaFilter as FilterIcon,
  FaPlus as PlusIcon,
  FaSearch as SearchIcon,
  FaTimes as XIcon,
  FaClock as ClockIcon,
  FaUser as UserIcon,
  FaCalendarAlt as CalendarIcon
} from 'react-icons/fa';

// Sample document categories
const categories = [
  { id: 'all', name: 'All Documents' },
  { id: 'reports', name: 'Medical Reports' },
  { id: 'prescriptions', name: 'Prescriptions' },
  { id: 'labs', name: 'Lab Results' },
  { id: 'imaging', name: 'Imaging' },
  { id: 'bills', name: 'Bills & Receipts' },
];

// Sample document types
const documentTypes = [
  { id: 'pdf', name: 'PDF', count: 12 },
  { id: 'image', name: 'Images', count: 8 },
  { id: 'word', name: 'Word', count: 3 },
  { id: 'other', name: 'Other', count: 2 },
];

// Sample documents data
const sampleDocuments = [
  {
    id: 1,
    name: 'Blood Test Results - June 2023',
    type: 'pdf',
    category: 'labs',
    size: '2.4 MB',
    date: '2023-06-15',
    uploadedBy: 'Dr. Sarah Johnson',
    previewUrl: '#',
    downloadUrl: '#',
    tags: ['blood test', 'lab results'],
  },
  {
    id: 2,
    name: 'Prescription - Ibuprofen',
    type: 'pdf',
    category: 'prescriptions',
    size: '1.2 MB',
    date: '2023-06-10',
    uploadedBy: 'Dr. Michael Chen',
    previewUrl: '#',
    downloadUrl: '#',
    tags: ['prescription', 'medication'],
  },
  {
    id: 3,
    name: 'X-Ray - Right Knee',
    type: 'image',
    category: 'imaging',
    size: '4.7 MB',
    date: '2023-05-28',
    uploadedBy: 'Radiology Dept.',
    previewUrl: '#',
    downloadUrl: '#',
    tags: ['x-ray', 'knee', 'imaging'],
  },
  {
    id: 4,
    name: 'Discharge Summary - General Hospital',
    type: 'pdf',
    category: 'reports',
    size: '3.1 MB',
    date: '2023-05-15',
    uploadedBy: 'General Hospital',
    previewUrl: '#',
    downloadUrl: '#',
    tags: ['discharge', 'hospital'],
  },
  {
    id: 5,
    name: 'Insurance Claim - April 2023',
    type: 'pdf',
    category: 'bills',
    size: '1.8 MB',
    date: '2023-04-22',
    uploadedBy: 'You',
    previewUrl: '#',
    downloadUrl: '#',
    tags: ['insurance', 'claim'],
  },
];

const DocumentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');

  // Get all unique tags from documents
  const allTags = [...new Set(sampleDocuments.flatMap(doc => doc.tags))];

  // Filter documents based on search, category, and selected types
  const filteredDocuments = sampleDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesTypes = selectedTypes.length === 0 || selectedTypes.includes(doc.type);
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => doc.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTypes && matchesTags;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date); // date-desc (default)
  });

  const toggleType = (typeId) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId) 
        : [...prev, typeId]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTypes([]);
    setSelectedTags([]);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <DocumentTextIcon className="h-5 w-5 text-red-500" />;
      case 'image':
        return <DocumentReportIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Document Library</h2>
            <p className="mt-1 text-sm text-gray-500">
              Access and manage all your medical documents in one place
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Upload Document
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FilterIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                Filters
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== 'all' || selectedTypes.length > 0 || selectedTags.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Search: {searchQuery}
                  <button
                    type="button"
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    onClick={() => setSearchQuery('')}
                  >
                    <span className="sr-only">Remove search</span>
                    <XIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              )}
              
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {categories.find(c => c.id === selectedCategory)?.name}
                  <button
                    type="button"
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                    onClick={() => setSelectedCategory('all')}
                  >
                    <span className="sr-only">Remove category</span>
                    <XIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              )}
              
              {selectedTypes.map(typeId => {
                const type = documentTypes.find(t => t.id === typeId);
                return type ? (
                  <span key={typeId} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {type.name}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
                      onClick={() => toggleType(typeId)}
                    >
                      <span className="sr-only">Remove type</span>
                      <XIcon className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </span>
                ) : null;
              })}
              
              {selectedTags.map(tag => (
                <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {tag}
                  <button
                    type="button"
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:outline-none focus:bg-purple-500 focus:text-white"
                    onClick={() => toggleTag(tag)}
                  >
                    <span className="sr-only">Remove tag</span>
                    <XIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              ))}
              
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`category-${category.id}`}
                        name="categories"
                        type="radio"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Document Types</h3>
                <div className="space-y-2">
                  {documentTypes.map((type) => (
                    <div key={type.id} className="flex items-center">
                      <input
                        id={`type-${type.id}`}
                        name="document-types"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectedTypes.includes(type.id)}
                        onChange={() => toggleType(type.id)}
                      />
                      <label htmlFor={`type-${type.id}`} className="ml-3 text-sm text-gray-700">
                        {type.name} <span className="text-gray-500">({type.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedTags.includes(tag)
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document List */}
        {sortedDocuments.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {sortedDocuments.map((doc) => (
                <li key={doc.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-indigo-600 truncate">
                            {doc.name}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                            <div className="flex items-center mr-4">
                              <UserIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <span>{doc.uploadedBy}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <time dateTime={doc.date}>{formatDate(doc.date)}</time>
                            </div>
                            <span className="mx-2 text-gray-300">•</span>
                            <span>{doc.size}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {doc.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex">
                        <a
                          href={doc.previewUrl}
                          className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View
                        </a>
                        <a
                          href={doc.downloadUrl}
                          className="ml-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <DocumentDownloadIcon className="-ml-1 mr-1 h-4 w-4" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <DocumentSearchIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || selectedCategory !== 'all' || selectedTypes.length > 0 || selectedTags.length > 0
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by uploading a new document.'}
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Upload Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentLibrary;
