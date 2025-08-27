import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaCalendarAlt, FaUserMd, FaClock, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data - replace with API call in production
  useEffect(() => {
    // Simulate API call
    const fetchAppointments = async () => {
      try {
        // TODO: Replace with actual API call
        const mockAppointments = [
          {
            id: 1,
            date: '2023-06-15',
            time: '10:00 AM',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Cardiology',
            status: 'upcoming',
            location: 'Main Hospital, Room 302',
            notes: 'Annual checkup',
          },
          {
            id: 2,
            date: '2023-06-10',
            time: '02:30 PM',
            doctor: 'Dr. Michael Chen',
            specialty: 'Dermatology',
            status: 'completed',
            location: 'Dermatology Center, Suite 101',
            notes: 'Follow-up for skin condition',
          },
          {
            id: 3,
            date: '2023-06-20',
            time: '11:15 AM',
            doctor: 'Dr. Emily Wilson',
            specialty: 'Pediatrics',
            status: 'upcoming',
            location: 'Children\'s Wing, Room 205',
            notes: 'Vaccination',
          },
        ];
        
        setAppointments(mockAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === 'all' || 
      appointment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      upcoming: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    
    return (
      <span 
        className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage your upcoming and past medical appointments
          </p>
        </div>
        <Link
          to="/patient/appointments/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2" />
          New Appointment
        </Link>
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
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center">
            <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You have no appointments scheduled.'}
            </p>
            <div className="mt-6">
              <Link
                to="/patient/appointments/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                New Appointment
              </Link>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <li key={appointment.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaUserMd className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.doctor}
                      </div>
                      <div className="text-sm text-gray-500">{appointment.specialty}</div>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center mt-1">
                      <FaClock className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      {appointment.time}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>
                <div className="mt-4 sm:ml-14">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    {appointment.location}
                  </div>
                  {appointment.notes && (
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {appointment.notes}
                    </p>
                  )}
                  <div className="mt-3 flex space-x-3">
                    {appointment.status === 'upcoming' && (
                      <>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Reschedule
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <Link
                      to={`/patient/appointments/${appointment.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Appointments;
