import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaClock, 
  FaChartBar, 
  FaFolder, 
  FaClipboardList, 
  FaExclamationCircle,
  FaUser,
  FaCog,
  FaCalendarAlt,
  FaUsers,
  FaCreditCard,
  FaCommentAlt,
  FaShieldAlt
} from 'react-icons/fa';

const patientNavigation = [
  { name: 'Dashboard', href: '/patient', icon: FaHome, roles: ['patient'] },
  { name: 'Appointments', href: '/patient/appointments', icon: FaCalendarAlt, roles: ['patient'] },
  { name: 'Medical Records', href: '/patient/medical-records', icon: FaFolder, roles: ['patient'] },
  { name: 'Billing', href: '/patient/billing', icon: FaCreditCard, roles: ['patient'] },
  { name: 'Messages', href: '/patient/messages', icon: FaCommentAlt, roles: ['patient'] },
  { name: 'Health Timeline', href: '/patient/timeline', icon: FaClock, roles: ['patient'] },
  { name: 'Health Metrics', href: '/patient/metrics', icon: FaChartBar, roles: ['patient'] },
  { name: 'Document Library', href: '/patient/documents', icon: FaFolder, roles: ['patient'] },
  { name: 'Medications', href: '/patient/medications', icon: FaClipboardList, roles: ['patient'] },
  { name: 'Medical Alerts', href: '/patient/alerts', icon: FaExclamationCircle, roles: ['patient'] },
  { name: 'Access Control', href: '/patient/access-control', icon: FaShieldAlt, roles: ['patient'] },
  { name: 'Profile', href: '/dashboard/profile', icon: FaUser },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog }
];

const Sidebar = ({ role = 'patient' }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Filter navigation based on user role
  const filteredNavigation = role === 'patient' 
    ? patientNavigation
    : [
        { name: 'Dashboard', href: '/provider', icon: FaHome, roles: ['provider'] },
        { name: 'Appointments', href: '/provider/appointments', icon: FaCalendarAlt, roles: ['provider'] },
        { name: 'Patients', href: '/provider/patients', icon: FaUsers, roles: ['provider'] },
        { name: 'Billing', href: '/provider/billing', icon: FaCreditCard, roles: ['provider'] },
        { name: 'Access Control', href: '/provider/access-control', icon: FaShieldAlt, roles: ['provider'] },
      ];

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white w-64 fixed inset-y-0 z-50">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-white">
            {role === 'patient' ? 'Patient Portal' : 'Provider Portal'}
          </h1>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 ${
                    isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex bg-gray-700 p-4">
        <div className="flex items-center">
          <div>
            <UserIcon className="h-10 w-10 text-gray-300" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">User Profile</p>
            <div className="flex space-x-2">
              <NavLink 
                to={role === 'patient' ? '/patient/profile' : '/provider/profile'} 
                className="text-xs font-medium text-gray-300 hover:text-white"
              >
                View Profile
              </NavLink>
              <span className="text-gray-500">|</span>
              <NavLink 
                to={role === 'patient' ? '/patient/settings' : '/provider/settings'} 
                className="text-xs font-medium text-gray-300 hover:text-white"
              >
                Settings
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
