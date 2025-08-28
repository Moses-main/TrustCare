import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserMd,
  FaUserInjured,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaChartLine,
  FaFileMedical,
  FaPills,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";

// Reusable NavLink component
const NavLink = ({ to, icon, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
  >
    {icon}
    <span className="ml-2">{children}</span>
  </Link>
);

// Mobile NavLink component
const MobileNavLink = ({ to, icon, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
  >
    <span className="text-lg">{icon}</span>
    <span className="ml-3">{children}</span>
  </Link>
);

const Navbar = () => {
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("patient");
  const [userName, setUserName] = useState("");
  
  // Refs
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  // Toggle profile dropdown
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  // Close all menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
          profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const type = localStorage.getItem("userType") || "patient";
      const name = localStorage.getItem("userName") || "";

      setIsAuthenticated(authStatus);
      setUserType(type);
      setUserName(name);
    };

    // Initial check
    checkAuth();
    
    // Listen for auth changes in other tabs
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Logout handler
  const handleLogout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    localStorage.removeItem("licenseNumber");

    // Update state
    setIsAuthenticated(false);
    setUserType("patient");
    setUserName("");
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);

    // Redirect to home page
    navigate("/");
  };

  // Navigation items for patient
  const patientNavItems = [
    {
      name: "Dashboard",
      path: "/patient/dashboard",
      icon: <FaHome className="text-lg" />,
    },
    {
      name: "Appointments",
      path: "/patient/appointments",
      icon: <FaCalendarAlt className="text-lg" />,
    },
    {
      name: "Medical Records",
      path: "/patient/medical-records",
      icon: <FaFileMedical className="text-lg" />,
    },
    {
      name: "Health Metrics",
      path: "/patient/health-metrics",
      icon: <FaChartLine className="text-lg" />,
    },
    {
      name: "Medications",
      path: "/patient/medications",
      icon: <FaPills className="text-lg" />,
    }
  ];

  // Navigation items for provider
  const providerNavItems = [
    {
      name: "Dashboard",
      path: "/provider/dashboard",
      icon: <FaHome className="text-lg" />,
    },
    {
      name: "Patients",
      path: "/provider/patients",
      icon: <FaUsers className="text-lg" />,
    },
    {
      name: "Appointments",
      path: "/provider/appointments",
      icon: <FaCalendarAlt className="text-lg" />,
    },
    {
      name: "Records",
      path: "/provider/records",
      icon: <FaFileMedical className="text-lg" />,
    },
  ];

  const publicNavItems = [
    { name: "About", path: "/about", icon: null },
    { name: "Contact", path: "/contact", icon: null },
  ];

  const renderNavItem = (item) => (
    <Link
      key={item.path}
      to={item.path}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        item.path === "/"
          ? location.pathname === "/"
            ? "text-white bg-blue-700"
            : "text-gray-300 hover:bg-blue-600 hover:text-white"
          : location.pathname === item.path ||
          (item.path !== "/" &&
            location.pathname.startsWith(item.path) &&
            item.path !== "/about" &&
            item.path !== "/contact")
          ? "text-white bg-blue-700"
          : "text-gray-300 hover:bg-blue-600 hover:text-white"
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {item.icon}
      {item.name}
    </Link>
  );

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">DHRS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex space-x-1">
                  {(userType === 'patient' ? patientNavItems : providerNavItems).map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === item.path ||
                        (item.path !== "/" &&
                          location.pathname.startsWith(item.path) &&
                          item.path !== "/about" &&
                          item.path !== "/contact")
                          ? "text-white bg-blue-700"
                          : "text-gray-300 hover:bg-blue-600 hover:text-white"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Profile dropdown */}
                <div className="ml-4 relative" ref={profileMenuRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {userType === 'patient' ? <FaUserInjured /> : <FaUserMd />}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {userName || 'User'}
                    </span>
                  </button>

                  {/* Dropdown menu */}
                  {isProfileOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      tabIndex="-1"
                    >
                      <div className="py-1">
                        <Link
                          to={userType === 'patient' ? '/patient/profile' : '/provider/profile'}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FaUserCircle className="text-lg mr-2" />
                          Your Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FaUserCircle className="text-lg mr-2" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                        >
                          <FaSignOutAlt className="text-lg mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        ref={mobileMenuRef}
        className={`md:hidden bg-white shadow-lg rounded-b-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isAuthenticated ? (
            <>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {(userType === 'patient' ? patientNavItems : providerNavItems).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {userType === 'patient' ? <FaUserInjured size={20} /> : <FaUserMd size={20} />}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {userName || 'User'}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {userType === 'patient' ? 'Patient' : 'Healthcare Provider'}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    to={userType === 'patient' ? '/patient/profile' : '/provider/profile'}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserCircle className="text-lg mr-2" />
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserCircle className="text-lg mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-base font-medium text-red-600 hover:bg-gray-100 rounded-md"
                  >
                    <FaSignOutAlt className="text-lg mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="px-2 pt-2 pb-3 space-y-3">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
