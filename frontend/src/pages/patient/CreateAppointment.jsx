import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentsAPI, patientsAPI } from '../../services/api';

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    providerId: '',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });
  const [providers, setProviders] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch providers on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        // In a real app, you would fetch providers from your API
        // This is a mock implementation
        setProviders([
          { _id: '1', name: 'Dr. Smith', specialty: 'Cardiology' },
          { _id: '2', name: 'Dr. Johnson', specialty: 'Dermatology' },
          { _id: '3', name: 'Dr. Williams', specialty: 'Pediatrics' },
        ]);
      } catch (err) {
        setError('Failed to load providers');
      }
    };

    fetchProviders();
  }, []);

  // Fetch available slots when provider or date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (formData.providerId && formData.date) {
        try {
          setLoading(true);
          // In a real app, you would fetch available slots from your API
          // This is a mock implementation
          const slots = [
            '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'
          ];
          setAvailableSlots(slots);
        } catch (err) {
          setError('Failed to load available time slots');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAvailableSlots();
  }, [formData.providerId, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset time when provider or date changes
    if (name === 'providerId' || name === 'date') {
      setFormData(prev => ({
        ...prev,
        time: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get the patient ID from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      setError('Please log in to book an appointment');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Format the appointment data
      const appointmentData = {
        patientId: user._id,
        providerId: formData.providerId,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        notes: formData.notes,
        status: 'scheduled'
      };

      // Create the appointment
      const response = await appointmentsAPI.createAppointment(appointmentData);
      
      setSuccess('Appointment booked successfully!');
      
      // Redirect to appointments page after a short delay
      setTimeout(() => {
        navigate('/patient/appointments');
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Book a New Appointment
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Schedule an appointment with your healthcare provider.
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="providerId" className="block text-sm font-medium text-gray-700">
                  Select Provider *
                </label>
                <select
                  id="providerId"
                  name="providerId"
                  required
                  value={formData.providerId}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a provider</option>
                  {providers.map(provider => (
                    <option key={provider._id} value={provider._id}>
                      {provider.name} - {provider.specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Available Time Slots *
                </label>
                <select
                  id="time"
                  name="time"
                  required
                  disabled={!formData.date || !formData.providerId || availableSlots.length === 0}
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:opacity-50"
                >
                  <option value="">Select a time slot</option>
                  {availableSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {loading && availableSlots.length === 0 && formData.date && formData.providerId && (
                  <p className="mt-1 text-sm text-gray-500">Loading available time slots...</p>
                )}
                {!loading && availableSlots.length === 0 && formData.date && formData.providerId && (
                  <p className="mt-1 text-sm text-yellow-600">No available time slots for the selected date.</p>
                )}
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason for Visit *
                </label>
                <input
                  type="text"
                  name="reason"
                  id="reason"
                  required
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="e.g., Annual checkup, Follow-up, Consultation"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Notes (Optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Any additional information you'd like to share with your provider"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking Appointment...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
