import React from 'react';
import { FaBell, FaSearch, FaSignOutAlt, FaCog, FaCalendarAlt, FaUserFriends, FaComment, FaFileAlt } from 'react-icons/fa';

export default function DoctorsDashboard() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-60 bg-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-24 h-14 rounded-full bg-red-300 flex items-center mt-10 justify-center text-xl font-bold">
            SJ
          </div>
          <div>
            <h2 className="text-lg font-semibold">Dr. Sarah Johnson</h2>
            <p className="text-sm text-gray-500">Cardiologist</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          {[
            { icon: <FaCalendarAlt className="mr-3" />, label: 'Appointments' },
            { icon: <FaUserFriends className="mr-3" />, label: 'Patients' },
            { icon: <FaComment className="mr-3" />, label: 'Messages' },
            { icon: <FaFileAlt className="mr-3" />, label: 'Medical Records' },
            { icon: <FaCog className="mr-3" />, label: 'Settings' },
            { icon: <FaSignOutAlt className="mr-3" />, label: 'Logout' },
          ].map((item, index) => (
            <div 
              key={index}
              className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-red-50 ${
                index === 0 ? 'bg-red-100 text-red-700' : 'text-gray-600'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-red-700">DHCRS</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                placeholder="Search..."
                className="rounded-lg border px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-red-200"
              />
              <FaSearch className="absolute right-2 top-2 text-gray-400" />
            </div>
            <div className="relative">
              <FaBell className="text-gray-600 cursor-pointer text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: 12, label: "Today's Appointments", color: "text-gray-800" },
            { num: 8, label: "Completed", color: "text-green-600" },
            { num: 3, label: "Upcoming", color: "text-yellow-600" },
            { num: 1, label: "Cancelled", color: "text-red-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-4 text-center">
              <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.num}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Today's Appointments */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b font-semibold">Today's Appointments</div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Time</th>
                  <th>Patient</th>
                  <th>Appointment Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    time: "09:00 AM",
                    name: "John Doe",
                    email: "john.doe@example.com",
                    type: "Annual Checkup",
                    status: "Completed",
                  },
                  {
                    time: "10:30 AM",
                    name: "Jane Smith",
                    email: "jane.smith@example.com",
                    type: "Blood Pressure Check",
                    status: "Completed",
                  },
                  {
                    time: "11:45 AM",
                    name: "Robert Johnson",
                    email: "robert.j@example.com",
                    type: "Cardiac Consultation",
                    status: "Checked-in",
                  },
                  {
                    time: "01:15 PM",
                    name: "Emily Wilson",
                    email: "emily.w@example.com",
                    type: "Follow-up Visit",
                    status: "Confirmed",
                  },
                  {
                    time: "02:30 PM",
                    name: "Michael Brown",
                    email: "michael.b@example.com",
                    type: "ECG Test",
                    status: "Confirmed",
                  },
                ].map((a, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3">{a.time}</td>
                    <td>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-xs text-gray-500">{a.email}</div>
                    </td>
                    <td>{a.type}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          a.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : a.status === "Checked-in"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <button className="text-gray-500 hover:text-red-600">
                        ✏️
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        👁️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b font-semibold">
            Upcoming Appointments This Week
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 text-center">
            {[
              {
                day: "Mon",
                date: "24",
                appts: [
                  { time: "9:00 AM", name: "John D." },
                  { time: "10:00 AM", name: "Sarah R." },
                ],
              },
              {
                day: "Tue",
                date: "25",
                appts: [
                  { time: "10:00 AM", name: "Sarah R." },
                  { time: "2:15 PM", name: "David M." },
                ],
              },
              {
                day: "Wed",
                date: "26",
                appts: [
                  { time: "9:30 AM", name: "Lisa K." },
                  { time: "3:00 PM", name: "Mark T." },
                ],
              },
              {
                day: "Thu",
                date: "27",
                appts: [
                  { time: "11:00 AM", name: "Kevin R." },
                  { time: "1:30 PM", name: "Emma W." },
                ],
              },
              {
                day: "Fri",
                date: "28",
                appts: [
                  { time: "9:15 AM", name: "Thomas B." },
                  { time: "4:00 PM", name: "Olivia G." },
                ],
              },
              {
                day: "Sat",
                date: "29",
                appts: [{ time: "10:45 AM", name: "James H." }],
              },
              { day: "Sun", date: "30", appts: [] },
            ].map((d, i) => (
              <div
                key={i}
                className={`border rounded-lg p-2 ${
                  d.appts.length > 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <p className="font-medium">{d.day}</p>
                <p className="text-2xl font-bold mb-2">{d.date}</p>
                {d.appts.length > 0 ? (
                  d.appts.map((appt, j) => (
                    <div
                      key={j}
                      className="text-xs bg-red-50 text-red-600 rounded p-1 mb-1"
                    >
                      <div className="font-medium">{appt.time}</div>
                      <div>{appt.name}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 mt-2">No appointments</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
