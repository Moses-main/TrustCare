import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePrivy, useLogin } from '@privy-io/react-auth';
import {
  IoHomeOutline,
  IoHome,
  IoCalendarOutline,
  IoCalendar,
  IoDocumentTextOutline,
  IoDocumentText,
  IoHeartOutline,
  IoHeart,
  IoMedicalOutline,
  IoMedical,
  IoPeopleOutline,
  IoPeople,
  IoPersonOutline,
  IoPerson,
  IoSettingsOutline,
  IoSettings,
  IoLogOutOutline,
  IoMenu,
  IoClose,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

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
    { name: "Dashboard", path: "/patient/dashboard", icon: <IoHome className="sm:text-base text-sm" />, iconOutline: <IoHomeOutline className="sm:text-base text-sm" /> },
    { name: "Appointments", path: "/patient/appointments", icon: <IoCalendar className="sm:text-base text-sm" />, iconOutline: <IoCalendarOutline className="sm:text-base text-sm" /> },
    { name: "Records", path: "/patient/medical-records", icon: <IoDocumentText className="sm:text-base text-sm" />, iconOutline: <IoDocumentTextOutline className="sm:text-base text-sm" /> },
    { name: "Health", path: "/patient/health-metrics", icon: <IoHeart className="sm:text-base text-sm" />, iconOutline: <IoHeartOutline className="sm:text-base text-sm" /> },
    { name: "Medications", path: "/patient/medications", icon: <IoMedical className="sm:text-base text-sm" />, iconOutline: <IoMedicalOutline className="sm:text-base text-sm" /> },
  ];

  const providerNavItems = [
    { name: "Dashboard", path: "/provider/dashboard", icon: <IoHome className="sm:text-base text-sm" />, iconOutline: <IoHomeOutline className="sm:text-base text-sm" /> },
    { name: "Patients", path: "/provider/patients", icon: <IoPeople className="sm:text-base text-sm" />, iconOutline: <IoPeopleOutline className="sm:text-base text-sm" /> },
    { name: "Appointments", path: "/provider/appointments", icon: <IoCalendar className="sm:text-base text-sm" />, iconOutline: <IoCalendarOutline className="sm:text-base text-sm" /> },
    { name: "Records", path: "/provider/records", icon: <IoDocumentText className="sm:text-base text-sm" />, iconOutline: <IoDocumentTextOutline className="sm:text-base text-sm" /> },
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
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flex justify-between items-center h-14 sm:h-16 max-w-[1920px] mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <IoShieldCheckmarkOutline className="text-blue-600 text-2xl sm:text-3xl" />
              <span className="text-xl sm:text-2xl font-bold text-blue-600">TrustCare</span>
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-1">
                {(userType === "patient" ? patientNavItems : providerNavItems).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveLink(item.path)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                  >
                    {isActiveLink(item.path) ? item.icon : item.iconOutline}
                    <span className="hidden xl:inline">{item.name}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {/* Right Side - Auth Buttons or Profile */}
          <div className="flex-shrink-0 flex items-center">
            {isAuthenticated ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-medium">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">{userName || "User"}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-2" role="menu">
                    <Link
                      to="/profile/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <IoPersonOutline className="text-lg" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/profile/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <IoSettingsOutline className="text-lg" />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-1 mx-2 border-gray-100" />
                    <button
                      onClick={() => { handleLogout(); setIsProfileOpen(false); }}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <IoLogOutOutline className="text-lg" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={openLoginModal}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={openLoginModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <IoClose className="h-6 w-6" /> : <IoMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-3 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{userName || "User"}</div>
                      <div className="text-xs text-gray-500 capitalize">{userType}</div>
                    </div>
                  </div>
                </div>

                {(userType === "patient" ? patientNavItems : providerNavItems).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActiveLink(item.path)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {isActiveLink(item.path) ? item.icon : item.iconOutline}
                    <span>{item.name}</span>
                  </Link>
                ))}

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <Link
                    to="/profile/settings"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IoPersonOutline className="text-lg" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/profile/settings"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IoSettingsOutline className="text-lg" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <IoLogOutOutline className="text-lg" />
                    <span>Sign out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2 px-3 py-2">
                <button
                  onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                  className="block w-full text-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Sign in
                </button>
                <button
                  onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                  className="block w-full text-center px-4 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
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
