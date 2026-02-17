import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePrivy, useLogin } from '@privy-io/react-auth';
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
  FaCog,
} from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  const { ready, authenticated, user: privyUser, logout: privyLogout } = usePrivy();
  const { login } = useLogin({
    onComplete: (user, isNewUser) => {
      handleLoginSuccess(user, isNewUser);
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const handleLoginSuccess = (privyUser, isNewUser) => {
    const userData = {
      id: privyUser.id,
      email: privyUser.email?.address || null,
      walletAddress: privyUser.wallet?.address || null,
      name: privyUser.email?.address?.split('@')[0] || 'User',
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    setIsMobileMenuOpen(false);
  };

  const openLoginModal = () => {
    login();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';

    if (ready && (authenticated || isAuth)) {
      setIsAuthenticated(true);
      if (privyUser) {
        const userData = {
          id: privyUser.id,
          email: privyUser.email?.address || null,
          walletAddress: privyUser.wallet?.address || null,
          name: privyUser.email?.address?.split('@')[0] || 'User',
        };
        setUser(userData);
      } else if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [ready, authenticated, privyUser, location]);

  const handleLogout = async () => {
    try {
      await privyLogout();
    } catch (e) {
      console.log('Privy logout error:', e);
    }
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUser(null);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const userType = user?.role || "patient";
  const userName = user?.name || "";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const patientNavItems = [
    { name: "Dashboard", path: "/patient/dashboard", icon: <FaHome className="sm:text-base text-sm" /> },
    { name: "Appointments", path: "/patient/appointments", icon: <FaCalendarAlt className="sm:text-base text-sm" /> },
    { name: "Records", path: "/patient/medical-records", icon: <FaFileMedical className="sm:text-base text-sm" /> },
    { name: "Health", path: "/patient/health-metrics", icon: <FaChartLine className="sm:text-base text-sm" /> },
    { name: "Medications", path: "/patient/medications", icon: <FaPills className="sm:text-base text-sm" /> },
  ];

  const providerNavItems = [
    { name: "Dashboard", path: "/provider/dashboard", icon: <FaHome className="sm:text-base text-sm" /> },
    { name: "Patients", path: "/provider/patients", icon: <FaUsers className="sm:text-base text-sm" /> },
    { name: "Appointments", path: "/provider/appointments", icon: <FaCalendarAlt className="sm:text-base text-sm" /> },
    { name: "Records", path: "/provider/records", icon: <FaFileMedical className="sm:text-base text-sm" /> },
  ];

  const isActiveLink = (path) => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path ||
      (path !== "/" && location.pathname.startsWith(path) && path !== "/about" && path !== "/contact")
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-blue-600">TrustCare</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <div className="flex space-x-1">
                  {(userType === "patient" ? patientNavItems : providerNavItems).map((item) => (
                    <Link key={item.path} to={item.path} className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${isActiveLink(item.path) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}`}>
                      {item.icon}
                      <span className="hidden xl:inline">{item.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="relative ml-2" ref={profileMenuRef}>
                  <button onClick={toggleProfileMenu} className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" aria-expanded={isProfileOpen} aria-haspopup="true">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs sm:text-sm">
                      {userType === "patient" ? <FaUserInjured /> : <FaUserMd />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">{userName || "User"}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-44 sm:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1" role="menu">
                      <Link to="/profile" className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
                        <FaUserCircle /><span>Profile</span>
                      </Link>
                      <Link to="/settings" className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
                        <FaCog /><span>Settings</span>
                      </Link>
                      <hr className="my-1" />
                      <button onClick={() => { handleLogout(); setIsProfileOpen(false); }} className="flex items-center gap-2 w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100">
                        <FaSignOutAlt /><span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button onClick={openLoginModal} className="text-gray-700 hover:text-blue-600 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors">
                  Sign in
                </button>
                <button onClick={openLoginModal} className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
                  Sign up
                </button>
              </div>
            )}
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-expanded={isMobileMenuOpen} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              {isMobileMenuOpen ? <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" /> : <FaBars className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-3 border-b border-gray-200 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {userType === "patient" ? <FaUserInjured size={20} /> : <FaUserMd size={20} />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{userName || "User"}</div>
                      <div className="text-xs text-gray-500 capitalize">{userType}</div>
                    </div>
                  </div>
                </div>

                {(userType === "patient" ? patientNavItems : providerNavItems).map((item) => (
                  <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${isActiveLink(item.path) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}`} onClick={() => setIsMobileMenuOpen(false)}>
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}

                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <FaUserCircle className="text-base" /><span>Profile</span>
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    <FaCog className="text-base" /><span>Settings</span>
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full px-3 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-gray-100 transition-colors">
                    <FaSignOutAlt className="text-base" /><span>Sign out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2 px-3 py-2">
                <button onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }} className="block w-full text-center px-4 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                  Sign in
                </button>
                <button onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }} className="block w-full text-center px-4 py-3 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
