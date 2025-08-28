import React, { useState } from 'react';
import { FaCalendarAlt, FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Sample appointment data
  const upcomingAppointments = [
    {
      id: 1,
      date: '2023-11-15',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      type: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2023-11-20',
      time: '2:15 PM',
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      type: 'Consultation',
      status: 'confirmed'
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      date: '2023-10-28',
      time: '9:00 AM',
      doctor: 'Dr. Robert Wilson',
      specialty: 'General Medicine',
      type: 'Check-up',
      status: 'completed'
    }
  ];

  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} className="bg-white rounded-lg shadow-sm p-4 mb-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaCalendarAlt className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
            <p className="text-gray-600">{appointment.specialty}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              <span className="mx-2">•</span>
              <span>{appointment.time}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{appointment.type}</span>
            </div>
          </div>
        </div>
        <div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            appointment.status === 'confirmed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {appointment.status}
          </span>
        </div>
      </div>
      
      {appointment.status === 'upcoming' && (
        <div className="mt-4 flex justify-end space-x-3">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Reschedule
          </button>
          <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200">
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <FaPlus className="mr-2" />
          New Appointment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-md ${activeTab === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-md ${activeTab === 'past' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Past
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search appointments..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {activeTab === 'upcoming' ? 'Upcoming Appointments' : 'Past Appointments'}
          </h2>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
            <FaFilter className="mr-1" />
            Filter
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'upcoming' ? (
            upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(renderAppointmentCard)
            ) : (
              <div className="text-center py-8 text-gray-500">
                No upcoming appointments scheduled.
              </div>
            )
          ) : (
            pastAppointments.length > 0 ? (
              pastAppointments.map(renderAppointmentCard)
            ) : (
              <div className="text-center py-8 text-gray-500">
                No past appointments found.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
