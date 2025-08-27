import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaUserMd, 
  FaUserInjured, 
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt, 
  FaHome, 
  FaBars, 
  FaTimes, 
  FaCalendarAlt, 
  FaFileMedical, 
  FaFileInvoiceDollar, 
  FaComments,
  FaCog,
  FaUserCircle
} from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Navigation items for patients
  const patientNavItems = [
    { to: '/patient/dashboard', label: 'Dashboard', icon: <MdDashboard className="mr-2" /> },
    { to: '/patient/appointments', label: 'Appointments', icon: <FaCalendarAlt className="mr-2" /> },
    { to: '/patient/medical-records', label: 'Records', icon: <FaFileMedical className="mr-2" /> },
    { to: '/patient/billing', label: 'Billing', icon: <FaFileInvoiceDollar className="mr-2" /> },
    { to: '/patient/messages', label: 'Messages', icon: <FaComments className="mr-2" /> },
  ];

  // Navigation items for providers
  const providerNavItems = [
    { to: '/provider/dashboard', label: 'Dashboard', icon: <MdDashboard className="mr-2" /> },
    { to: '/provider/appointments', label: 'Appointments', icon: <FaCalendarAlt className="mr-2" /> },
    { to: '/provider/patients', label: 'Patients', icon: <FaUserInjured className="mr-2" /> },
    { to: '/provider/billing', label: 'Billing', icon: <FaFileInvoiceDollar className="mr-2" /> },
  ];

  // Navigation items for guests
  const guestNavItems = [
    { to: '/', label: 'Home', icon: <FaHome className="mr-2" /> },
    { to: '/login', label: 'Login', icon: <FaSignInAlt className="mr-2" /> },
    { to: '/register', label: 'Register', icon: <FaUserPlus className="mr-2" /> },
  ];

  // Get the appropriate navigation items based on user role
  const getNavItems = () => {
    if (!user) return guestNavItems;
    return user.role === 'patient' ? patientNavItems : providerNavItems;
  };

  const navItems = getNavItems();

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              DHRS
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:inline-block">
              Decentralized Healthcare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors font-medium ${
                  location.pathname === item.to
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            {user && (
              <div className="ml-4 flex items-center space-x-2">
                <Link
                  to={`/${user.role}/profile`}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <FaUserCircle className="text-xl" />
                  <span className="ml-2 hidden lg:inline">
                    {user.firstName || 'Profile'}
                  </span>
                </Link>
                <Link
                  to={`/${user.role}/settings`}
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-lg transition-colors"
                  title="Settings"
                >
                  <FaCog className="text-lg" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  title="Logout"
                >
                  <FaSignOutAlt className="mr-1" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            )}
            {process.env.NODE_ENV === 'development' && (
              <span className="ml-4 px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                Development Mode
              </span>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <div className="flex items-center mr-4 space-x-2">
                <Link
                  to={`/${user.role}/profile`}
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
                >
                  <FaUserCircle className="text-xl" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-500 hover:text-red-600 rounded-full hover:bg-red-50"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none p-2 rounded-full hover:bg-gray-100"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-2 pb-4`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-base font-medium ${
                  location.pathname === item.to
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </div>
              </Link>
            ))}
            {user && (
              <div className="border-t border-gray-100 pt-2 mt-2">
                <Link
                  to={`/${user.role}/profile`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  <div className="flex items-center">
                    <FaUserCircle className="mr-3" />
                    <span>My Profile</span>
                  </div>
                </Link>
                <Link
                  to={`/${user.role}/settings`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  <div className="flex items-center">
                    <FaCog className="mr-3" />
                    <span>Settings</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
