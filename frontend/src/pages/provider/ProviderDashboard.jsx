import React, { useState } from 'react';
import { FaCalendarAlt, FaUserInjured, FaFileMedical, FaBell, FaSearch } from 'react-icons/fa';

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  
  // Sample data
  const stats = [
    { name: 'Today\'s Appointments', value: 8, change: '+2', changeType: 'increase', icon: FaCalendarAlt },
    { name: 'New Patients', value: 3, change: '+1', changeType: 'increase', icon: FaUserInjured },
    { name: 'Pending Records', value: 5, change: '-2', changeType: 'decrease', icon: FaFileMedical },
    { name: 'Alerts', value: 2, change: '+1', changeType: 'increase', icon: FaBell },
  ];

  const recentPatients = [
    { id: 1, name: 'John Smith', lastVisit: '2023-11-10', nextAppointment: '2023-11-25', status: 'Follow-up' },
    { id: 2, name: 'Emma Johnson', lastVisit: '2023-11-12', nextAppointment: '2023-12-05', status: 'New Patient' },
    { id: 3, name: 'Michael Brown', lastVisit: '2023-11-14', nextAppointment: '2023-11-28', status: 'Follow-up' },
  ];

  const upcomingAppointments = [
    { id: 1, time: '09:00 AM', patient: 'Sarah Wilson', type: 'Annual Checkup', duration: '30 min' },
    { id: 2, time: '10:00 AM', patient: 'David Lee', type: 'Consultation', duration: '45 min' },
    { id: 3, time: '11:00 AM', patient: 'Lisa Chen', type: 'Follow-up', duration: '30 min' },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Smith</p>
        </div>
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients, records..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last week
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          
          <div className="space-y-4">
            {upcomingAppointments.map((appt) => (
              <div key={appt.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{appt.time}</p>
                    <p className="text-gray-600">{appt.patient}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{appt.type}</p>
                    <p className="text-sm text-gray-400">{appt.duration}</p>
                  </div>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                    Start
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  {patient.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <div className="flex text-sm text-gray-500">
                    <span>Last: {formatDate(patient.lastVisit)}</span>
                    <span className="mx-1">•</span>
                    <span>Next: {formatDate(patient.nextAppointment)}</span>
                  </div>
                </div>
                <span className="ml-auto px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
              <FaFileMedical className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">New Note</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
              <FaCalendarAlt className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Schedule</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
              <FaUserInjured className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">New Patient</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2">
              <FaBell className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
