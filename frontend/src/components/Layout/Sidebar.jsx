import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  FaHome,
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaFileMedical,
  FaFilePrescription,
  FaChartLine,
  FaCreditCard,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { userType } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const patientNavItems = [
    { to: '/patient/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { to: '/patient/appointments', icon: <FaCalendarAlt />, label: 'Appointments' },
    { to: '/patient/medical-records', icon: <FaFileMedical />, label: 'Medical Records' },
    { to: '/patient/prescriptions', icon: <FaFilePrescription />, label: 'Prescriptions' },
    { to: '/patient/billing', icon: <FaCreditCard />, label: 'Billing' },
  ];

  const providerNavItems = [
    { to: '/provider/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { to: '/provider/patients', icon: <FaUserInjured />, label: 'Patients' },
    { to: '/provider/appointments', icon: <FaCalendarAlt />, label: 'Appointments' },
    { to: '/provider/records', icon: <FaFileMedical />, label: 'Medical Records' },
    { to: '/provider/prescribe', icon: <FaFilePrescription />, label: 'Prescribe' },
    { to: '/provider/analytics', icon: <FaChartLine />, label: 'Analytics' },
  ];

  const navItems = userType === 'patient' ? patientNavItems : providerNavItems;

  if (isMobile && !isOpen) return null;

  return (
    <div 
      className={`bg-gray-800 text-white h-screen fixed md:static z-40 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold">
            {userType === 'patient' ? 'Patient' : 'Provider'} Portal
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700"
          >
            <FaTimes />
          </button>
        )}
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 ${
              location.pathname.startsWith(item.to) ? 'bg-gray-700 text-white' : ''
            }`}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </nav>
      
      {!collapsed && (
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <Link
            to={`/${userType}/settings`}
            className="flex items-center text-gray-300 hover:text-white"
          >
            <FaCog className="text-xl" />
            <span className="ml-4">Settings</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
