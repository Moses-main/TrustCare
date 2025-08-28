import React, { useState } from 'react';
import { FaCalendarAlt, FaUserMd, FaSearch, FaFilter, FaPlus, FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const ProviderAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Sample appointment data
  const appointments = {
    '2023-11-15': [
      {
        id: 1,
        time: '09:00 AM',
        patient: 'John Smith',
        type: 'Follow-up',
        duration: '30 min',
        status: 'confirmed',
        notes: 'Follow up on blood pressure medication',
        photo: 'JS'
      },
      {
        id: 2,
        time: '10:00 AM',
        patient: 'Emma Johnson',
        type: 'New Patient',
        duration: '45 min',
        status: 'confirmed',
        notes: 'Initial consultation',
        photo: 'EJ'
      },
      {
        id: 3,
        time: '11:00 AM',
        patient: 'Michael Brown',
        type: 'Annual Physical',
        duration: '30 min',
        status: 'confirmed',
        notes: 'Annual checkup',
        photo: 'MB'
      }
    ],
    '2023-11-16': [
      {
        id: 4,
        time: '09:30 AM',
        patient: 'Sarah Wilson',
        type: 'Follow-up',
        duration: '30 min',
        status: 'pending',
        notes: 'Review test results',
        photo: 'SW'
      },
      {
        id: 5,
        time: '10:30 AM',
        patient: 'David Lee',
        type: 'Consultation',
        duration: '45 min',
        status: 'confirmed',
        notes: 'Discuss treatment options',
        photo: 'DL'
      }
    ],
    '2023-11-17': [
      {
        id: 6,
        time: '02:00 PM',
        patient: 'Lisa Chen',
        type: 'Follow-up',
        duration: '30 min',
        status: 'confirmed',
        notes: 'Post-surgery check',
        photo: 'LC'
      },
      {
        id: 7,
        time: '03:00 PM',
        patient: 'Robert Taylor',
        type: 'New Patient',
        duration: '45 min',
        status: 'pending',
        notes: 'Initial consultation',
        photo: 'RT'
      }
    ]
  };

  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const getAppointmentsForDate = (date) => {
    return appointments[date] || [];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderAppointmentCard = (appt) => (
    <div key={appt.id} className={`border-l-4 ${
      appt.status === 'confirmed' ? 'border-green-500' : 
      appt.status === 'pending' ? 'border-yellow-500' : 
      'border-gray-300'
    } bg-white rounded-r-lg shadow-sm p-4 mb-3`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
            {appt.photo}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{appt.patient}</h3>
            <p className="text-sm text-gray-500">{appt.type} • {appt.duration}</p>
            {appt.notes && <p className="text-sm text-gray-600 mt-1">{appt.notes}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {appt.status === 'pending' && (
            <>
              <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-full">
                <FaCheck />
              </button>
              <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-full">
                <FaTimes />
              </button>
            </>
          )}
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
            <FaClock />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTimeSlot = (time) => {
    const currentAppointments = getAppointmentsForDate(selectedDate);
    const appointment = currentAppointments.find(apt => apt.time === time);
    
    return (
      <div key={time} className="flex border-b border-gray-100 py-2">
        <div className="w-24 text-sm text-gray-500 pt-1">{time}</div>
        <div className="flex-1">
          {appointment ? (
            renderAppointmentCard(appointment)
          ) : (
            <div className="h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer">
              + Add appointment
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointment Schedule</h1>
          <p className="text-gray-600">Manage your daily appointments and patient consultations</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FaPlus className="mr-2" />
            New Appointment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2 mb-3 sm:mb-0">
              <button className="px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                Today
              </button>
              <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                &lt;
              </button>
              <span className="text-gray-700 font-medium">
                {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
                &gt;
              </button>
            </div>
            <div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-4 flex overflow-x-auto pb-2">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() + day - new Date(selectedDate).getDay());
              const dateString = date.toISOString().split('T')[0];
              const isSelected = dateString === selectedDate;
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNumber = date.getDate();
              
              return (
                <button
                  key={dateString}
                  onClick={() => setSelectedDate(dateString)}
                  className={`flex flex-col items-center justify-center w-16 py-3 mx-1 rounded-lg ${
                    isSelected 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm">{dayName}</span>
                  <span className="text-lg font-medium">{dayNumber}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'upcoming' 
                  ? 'bg-white shadow text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-white'
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'pending' 
                  ? 'bg-white shadow text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-white'
              }`}
            >
              Pending Approval
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'completed' 
                  ? 'bg-white shadow text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-white'
              }`}
            >
              Completed
            </button>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaUserMd className="mr-2 text-blue-500" />
            <span>Dr. Smith</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {timeSlots.map(renderTimeSlot)}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">5</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">2</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">1</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">Recent Patients</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-4">
              {getAppointmentsForDate(selectedDate).slice(0, 3).map(appt => (
                <div key={`recent-${appt.id}`} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium mr-3">
                    {appt.photo}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{appt.patient}</p>
                    <p className="text-sm text-gray-500">{appt.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appt.time}</p>
                    {getStatusBadge(appt.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-md mr-3">
                <FaPlus />
              </div>
              <span className="text-left">
                <p className="font-medium">Add New Patient</p>
                <p className="text-xs text-gray-500">Register a new patient</p>
              </span>
            </button>
            
            <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="p-2 bg-green-100 text-green-600 rounded-md mr-3">
                <FaCalendarAlt />
              </div>
              <span className="text-left">
                <p className="font-medium">Schedule Follow-up</p>
                <p className="text-xs text-gray-500">Book next appointment</p>
              </span>
            </button>
            
            <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-md mr-3">
                <FaUserMd />
              </div>
              <span className="text-left">
                <p className="font-medium">Start Telemedicine</p>
                <p className="text-xs text-gray-500">Begin virtual consultation</p>
              </span>
            </button>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-800 mb-3">Upcoming Schedule</h3>
              <div className="space-y-3">
                {getAppointmentsForDate(selectedDate).slice(0, 2).map(appt => (
                  <div key={`upcoming-${appt.id}`} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{appt.patient}</p>
                    <p className="text-xs text-gray-500">{appt.time} • {appt.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderAppointments;
