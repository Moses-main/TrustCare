import React from "react";
import { Link } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaFileMedical, 
  FaChartLine, 
  FaPills, 
  FaUserMd, 
  FaBell, 
  FaFileInvoiceDollar 
} from "react-icons/fa";

const PatientDashboard = () => {
  // Mock data for the dashboard
  const recentRecords = [
    { id: "REC-001", title: "Annual Physical Exam", date: "2023-07-10", type: "Report" },
    { id: "REC-002", title: "Blood Test Results", date: "2023-06-28", type: "Lab Result" },
    { id: "REC-003", title: "X-Ray - Right Arm", date: "2023-06-15", type: "Imaging" },
  ];

  const upcomingAppointments = [
    { 
      id: 1, 
      date: "2023-07-20", 
      time: "10:00 AM", 
      provider: "Dr. Sarah Johnson", 
      specialty: "Cardiology",
      type: "Follow-up" 
    },
    { 
      id: 2, 
      date: "2023-07-22", 
      time: "2:30 PM", 
      provider: "Dr. Michael Chen", 
      specialty: "Dermatology",
      type: "Consultation" 
    },
  ];

  const healthSummary = {
    lastCheckup: "2023-07-10",
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    weight: "68 kg",
    height: "175 cm",
    bmi: "22.2"
  };

  const quickActions = [
    { 
      title: "Book Appointment", 
      icon: <FaCalendarAlt className="text-blue-500 text-xl" />, 
      link: "/patient/appointments",
      description: "Schedule a new appointment with your healthcare provider"
    },
    { 
      title: "View Records", 
      icon: <FaFileMedical className="text-green-500 text-xl" />, 
      link: "/patient/medical-records",
      description: "Access your medical records and test results"
    },
    { 
      title: "Health Metrics", 
      icon: <FaChartLine className="text-purple-500 text-xl" />, 
      link: "/patient/health-metrics",
      description: "Track and monitor your health measurements"
    },
    { 
      title: "Medications", 
      icon: <FaPills className="text-yellow-500 text-xl" />, 
      link: "/patient/medications",
      description: "View and manage your current medications"
    },
  ];

  const notifications = [
    { 
      id: 1, 
      title: "Prescription Refill Ready", 
      message: "Your prescription for Metformin is ready for pickup",
      date: "2023-07-12",
      read: false
    },
    { 
      id: 2, 
      title: "Appointment Reminder", 
      message: "You have an appointment with Dr. Johnson in 2 days",
      date: "2023-07-11",
      read: true
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, John!</h1>
        <p className="text-gray-600">Here's what's happening with your health today.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Link 
            to={action.link} 
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-50 rounded-lg mr-4">
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{action.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
              <Link to="/patient/appointments" className="text-blue-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appt) => (
                  <div key={appt.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-full mr-3">
                            <FaUserMd className="text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{appt.provider}</h3>
                            <p className="text-sm text-gray-500">{appt.specialty}</p>
                          </div>
                        </div>
                        <div className="mt-3 ml-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">When:</span> {new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            <span className="mx-2">•</span>
                            {appt.time}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Type:</span> {appt.type}
                          </p>
                        </div>
                      </div>
                      <Link to={`/patient/appointments/${appt.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming appointments</h3>
                <p className="mt-1 text-sm text-gray-500">Book an appointment to get started.</p>
                <div className="mt-6">
                  <Link
                    to="/patient/appointments"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Recent Records */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Medical Records</h2>
              <Link to="/patient/medical-records" className="text-blue-600 hover:underline text-sm">
                View All
              </Link>
            </div>
            
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {record.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/patient/medical-records/${record.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Health Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Checkup</span>
                <span className="text-sm font-medium text-gray-900">
                  {new Date(healthSummary.lastCheckup).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Blood Pressure</span>
                <span className="text-sm font-medium text-gray-900">{healthSummary.bloodPressure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Heart Rate</span>
                <span className="text-sm font-medium text-gray-900">{healthSummary.heartRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Weight</span>
                <span className="text-sm font-medium text-gray-900">{healthSummary.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Height</span>
                <span className="text-sm font-medium text-gray-900">{healthSummary.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">BMI</span>
                <span className="text-sm font-medium text-gray-900">{healthSummary.bmi}</span>
              </div>
            </div>
            <div className="mt-4">
              <Link 
                to="/patient/health-metrics" 
                className="text-blue-600 hover:underline text-sm font-medium flex items-center"
              >
                View Detailed Metrics <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {notifications.filter(n => !n.read).length} New
              </span>
            </div>
            
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${!notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'}`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaBell className={`h-5 w-5 ${!notification.read ? 'text-blue-500' : 'text-gray-400'}`} />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(notification.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No new notifications</p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
            <div className="space-y-3">
              <Link to="/patient/medical-records" className="flex items-center text-blue-600 hover:text-blue-800">
                <FaFileMedical className="mr-2 text-blue-500" />
                <span>View Medical Records</span>
              </Link>
              <Link to="/patient/medications" className="flex items-center text-blue-600 hover:text-blue-800">
                <FaFileInvoiceDollar className="mr-2 text-green-500" />
                <span>Manage Medications</span>
              </Link>
              <Link to="/patient/appointments" className="flex items-center text-blue-600 hover:text-blue-800">
                <FaUserMd className="mr-2 text-purple-500" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
