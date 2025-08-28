import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  FaCalendarAlt as CalendarIcon,
  FaClock as ClockIcon,
  FaFileAlt as DocumentTextIcon,
  FaPlus as PlusIcon,
  FaChevronDown as ChevronDownIcon,
  FaCheckCircle as CheckCircleIcon,
  FaExclamationCircle as ExclamationCircleIcon,
  FaInfoCircle as InformationCircleIcon
} from 'react-icons/fa';

const eventTypes = {
  appointment: { icon: ClockIcon, bgColor: 'bg-blue-500' },
  lab: { icon: DocumentTextIcon, bgColor: 'bg-green-500' },
  medication: { icon: CheckCircleIcon, bgColor: 'bg-purple-500' },
  alert: { icon: ExclamationCircleIcon, bgColor: 'bg-red-500' },
  note: { icon: InformationCircleIcon, bgColor: 'bg-yellow-500' },
};

const filters = [
  { id: 'all', name: 'All Events' },
  { id: 'appointment', name: 'Appointments' },
  { id: 'lab', name: 'Lab Results' },
  { id: 'medication', name: 'Medications' },
  { id: 'alert', name: 'Alerts' },
  { id: 'note', name: 'Notes' },
];

// Sample data - in a real app, this would come from an API
const sampleEvents = [
  {
    id: 1,
    type: 'appointment',
    title: 'Annual Physical Exam',
    date: new Date(2023, 6, 15, 10, 0),
    doctor: 'Dr. Sarah Johnson',
    location: 'Main Street Clinic',
    notes: 'Routine checkup. Blood pressure slightly elevated. Recommended to reduce sodium intake.',
  },
  {
    id: 2,
    type: 'lab',
    title: 'Blood Test Results',
    date: new Date(2023, 6, 10, 14, 30),
    testType: 'Complete Blood Count',
    results: 'All values within normal range',
    notes: 'Follow up in 6 months',
  },
  {
    id: 3,
    type: 'medication',
    title: 'Ibuprofen',
    date: new Date(2023, 6, 5, 8, 0),
    dosage: '200mg',
    frequency: 'Every 6 hours as needed',
    prescribedBy: 'Dr. Sarah Johnson',
    notes: 'For headache relief',
  },
  {
    id: 4,
    type: 'alert',
    title: 'Allergy Alert',
    date: new Date(2023, 5, 20, 9, 15),
    severity: 'High',
    description: 'Allergic reaction to Penicillin',
    notes: 'Patient experienced hives and difficulty breathing',
  },
  {
    id: 5,
    type: 'note',
    title: 'Dietary Changes',
    date: new Date(2023, 5, 10, 16, 45),
    notes: 'Started low-sodium diet as recommended by nutritionist',
  },
];

const Timeline = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = sampleEvents.filter(event => {
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (event.notes && event.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const toggleEvent = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const getEventIcon = (eventType) => {
    const Icon = eventTypes[eventType]?.icon || InformationCircleIcon;
    return <Icon className="h-5 w-5 text-white" />;
  };

  const getEventDetails = (event) => {
    switch (event.type) {
      case 'appointment':
        return (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600"><span className="font-medium">Doctor:</span> {event.doctor}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Location:</span> {event.location}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Notes:</span> {event.notes}</p>
          </div>
        );
      case 'lab':
        return (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600"><span className="font-medium">Test Type:</span> {event.testType}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Results:</span> {event.results}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Notes:</span> {event.notes}</p>
          </div>
        );
      case 'medication':
        return (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600"><span className="font-medium">Dosage:</span> {event.dosage}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Frequency:</span> {event.frequency}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Prescribed by:</span> {event.prescribedBy}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Notes:</span> {event.notes}</p>
          </div>
        );
      case 'alert':
        return (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600"><span className="font-medium">Severity:</span> {event.severity}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Description:</span> {event.description}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Notes:</span> {event.notes}</p>
          </div>
        );
      case 'note':
        return (
          <div className="mt-2">
            <p className="text-sm text-gray-600">{event.notes}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Medical History Timeline</h2>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Event
          </button>
        </div>

        {/* Filters and Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedFilter === filter.id
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flow-root">
          <ul className="-mb-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8">
                    {eventIdx !== filteredEvents.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            eventTypes[event.type]?.bgColor || 'bg-gray-400'
                          }`}
                        >
                          {getEventIcon(event.type)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div className="w-full">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              {event.title}
                            </h3>
                            <div className="text-sm text-gray-500">
                              <time dateTime={event.date.toISOString()}>
                                {format(event.date, 'MMM d, yyyy')}
                              </time>
                              <span className="mx-1">•</span>
                              <time dateTime={event.date.toISOString()}>
                                {format(event.date, 'h:mm a')}
                              </time>
                            </div>
                          </div>
                          
                          {expandedEvent === event.id && getEventDetails(event)}
                          
                          <div className="mt-2">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => toggleEvent(event.id)}
                            >
                              {expandedEvent === event.id ? 'Show less' : 'Show details'}
                              <ChevronDownIcon
                                className={`ml-1 h-4 w-4 transform ${expandedEvent === event.id ? 'rotate-180' : ''}`}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No events found matching your criteria.</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
