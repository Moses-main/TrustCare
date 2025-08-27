import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FaHome,
  FaCalendarAlt,
  FaFileMedical,
  FaCreditCard,
  FaComments,
  FaUserCog,
  FaSignOutAlt,
  FaUserMd,
  FaUsers,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const DashboardLayout = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const patientNav = [
    { to: '/patient', label: 'Dashboard', icon: <FaHome className="mr-2" /> },
    { to: '/patient/appointments', label: 'Appointments', icon: <FaCalendarAlt className="mr-2" /> },
    { to: '/patient/medical-records', label: 'Medical Records', icon: <FaFileMedical className="mr-2" /> },
    { to: '/patient/billing', label: 'Billing', icon: <FaCreditCard className="mr-2" /> },
    { to: '/patient/messages', label: 'Messages', icon: <FaComments className="mr-2" /> },
  ];

  const providerNav = [
    { to: '/provider', label: 'Dashboard', icon: <FaHome className="mr-2" /> },
    { to: '/provider/appointments', label: 'Appointments', icon: <FaCalendarAlt className="mr-2" /> },
    { to: '/provider/patients', label: 'Patients', icon: <FaUsers className="mr-2" /> },
    { to: '/provider/billing', label: 'Billing', icon: <FaCreditCard className="mr-2" /> },
  ];

  const commonNav = [
    { to: `/${role}/profile`, label: 'Profile', icon: <FaUserCog className="mr-2" /> },
  ];

  const navigation = role === 'patient' 
    ? [...patientNav, ...commonNav]
    : [...providerNav, ...commonNav];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">
              {role === 'patient' ? 'Patient Portal' : 'Provider Portal'}
            </h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-200"
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="p-2 text-gray-500 rounded-md md:hidden focus:outline-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-700">
                  {role === 'patient' ? 'Patient' : 'Provider'} Dashboard
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
