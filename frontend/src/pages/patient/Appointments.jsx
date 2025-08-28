import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUserMd, FaClock, FaSearch, FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Appointments = () => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [reason, setReason] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for providers
  const providers = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', image: '/images/doctor1.jpg' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatology', image: '/images/doctor2.jpg' },
    { id: 3, name: 'Dr. Emily Wilson', specialty: 'Pediatrics', image: '/images/doctor3.jpg' },
    { id: 4, name: 'Dr. Robert Davis', specialty: 'Orthopedics', image: '/images/doctor4.jpg' },
  ];

  // Mock data for appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      provider: providers[0],
      date: '2023-07-15',
      time: '10:00 AM',
      status: 'confirmed',
      reason: 'Annual checkup',
      notes: 'Please fast for 12 hours before the appointment.'
    },
    {
      id: 2,
      provider: providers[1],
      date: '2023-07-20',
      time: '2:30 PM',
      status: 'confirmed',
      reason: 'Skin consultation',
      notes: 'Bring any relevant medical records.'
    },
    {
      id: 3,
      provider: providers[2],
      date: '2023-06-28',
      time: '11:15 AM',
      status: 'completed',
      reason: 'Vaccination',
      notes: 'Follow-up in 6 months.'
    },
  ]);

  // Available time slots
  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(apt => 
    apt.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group appointments by status
  const upcomingAppointments = filteredAppointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status !== 'cancelled' && apt.status !== 'completed'
  );
  
  const pastAppointments = filteredAppointments.filter(apt => 
    new Date(apt.date) < new Date() || apt.status === 'completed' || apt.status === 'cancelled'
  );

  // Calendar navigation
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const hasAppointment = appointments.some(apt => apt.date === dateString);
      const isSelected = selectedDay && date.toDateString() === selectedDay.toDateString();
      
      days.push(
        <div 
          key={day}
          onClick={() => setSelectedDay(date)}
          className={`h-10 flex items-center justify-center rounded-full cursor-pointer ${
            isSelected 
              ? 'bg-blue-600 text-white' 
              : hasAppointment 
                ? 'bg-blue-100 text-blue-800' 
                : 'hover:bg-gray-100'
          }`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    
    if (!selectedProvider || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }
    
    const provider = providers.find(p => p.id === parseInt(selectedProvider));
    
    const newAppointment = {
      id: appointments.length + 1,
      provider: provider,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      status: 'pending',
      reason: reason || 'General Consultation',
      notes: ''
    };
    
    setAppointments([...appointments, newAppointment]);
    setShowBookModal(false);
    
    // Reset form
    setSelectedDate(new Date());
    setSelectedTime('');
    setSelectedProvider('');
    setReason('');
  };

  const cancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      ));
    }
  };

  const rescheduleAppointment = (id) => {
    const appointment = appointments.find(apt => apt.id === id);
    if (appointment) {
      setSelectedProvider(appointment.provider.id);
      setSelectedDate(new Date(appointment.date));
      setSelectedTime(appointment.time);
      setReason(appointment.reason);
      setShowBookModal(true);
      
      // Remove the old appointment
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Appointments</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowBookModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center whitespace-nowrap"
          >
            <FaPlus className="mr-2" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              view === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              view === 'calendar' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-r border-gray-300'
            }`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <>
          {/* Upcoming Appointments */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
            {upcomingAppointments.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <li key={appointment.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUserMd className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.provider.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {appointment.provider.specialty}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FaClock className="mr-1 text-gray-400" />
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div className="mr-6 flex items-center text-sm text-gray-500">
                              <span>Reason: {appointment.reason}</span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              {getStatusBadge(appointment.status)}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <button
                              onClick={() => rescheduleAppointment(appointment.id)}
                              className="text-blue-600 hover:text-blue-800 mr-4"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => cancelAppointment(appointment.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                        {appointment.notes && (
                          <div className="mt-2 text-sm text-gray-500">
                            <p className="font-medium">Notes:</p>
                            <p>{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming appointments</h3>
                <p className="mt-1 text-gray-500">Book an appointment to get started.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowBookModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                    Book Appointment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Past Appointments</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {pastAppointments.map((appointment) => (
                    <li key={appointment.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                              <FaUserMd className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {appointment.provider.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {appointment.provider.specialty}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            <div className="text-right">
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div className="mr-6 flex items-center text-sm text-gray-500">
                              <span>Reason: {appointment.reason}</span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              {getStatusBadge(appointment.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Calendar View */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={handlePreviousMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FaChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FaChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200 text-center text-xs font-medium leading-6 text-gray-700">
            {weekdays.map((day) => (
              <div key={day} className="bg-gray-100 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200 text-sm">
            {renderCalendarDays()}
          </div>
          
          {/* Appointments for selected day */}
          {selectedDay && (
            <div className="p-4 border-t">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Appointments for {selectedDay.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              
              {appointments.filter(apt => {
                const aptDate = new Date(apt.date);
                return aptDate.toDateString() === selectedDay.toDateString();
              }).length > 0 ? (
                <ul className="space-y-4">
                  {appointments
                    .filter(apt => {
                      const aptDate = new Date(apt.date);
                      return aptDate.toDateString() === selectedDay.toDateString();
                    })
                    .map(apt => (
                      <li key={apt.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {apt.provider.name} - {apt.provider.specialty}
                            </h4>
                            <p className="text-gray-600">{apt.time}</p>
                          </div>
                          <div>
                            {getStatusBadge(apt.status)}
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Reason:</span> {apt.reason}
                        </p>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No appointments scheduled for this day.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Book Appointment Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Book New Appointment</h2>
                <button 
                  onClick={() => setShowBookModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleBookAppointment}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="provider" className="block text-sm font-medium text-gray-700">
                      Healthcare Provider *
                    </label>
                    <select
                      id="provider"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      required
                    >
                      <option value="">Select a provider</option>
                      {providers.map(provider => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name} - {provider.specialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time *
                      </label>
                      <select
                        id="time"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time, index) => (
                          <option key={index} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                      Reason for Visit
                    </label>
                    <input
                      type="text"
                      id="reason"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Annual checkup, Follow-up, Specific symptoms"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows="3"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Any specific concerns or information you'd like to share with your provider"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
