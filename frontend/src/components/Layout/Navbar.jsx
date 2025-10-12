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

  // Check authentication status on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
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

  // Close menus when clicking outside
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

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
    },
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

  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === path ||
      (path !== "/" &&
        location.pathname.startsWith(path) &&
        path !== "/about" &&
        path !== "/contact")
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                TrustCare
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Desktop Nav Items */}
                <div className="flex space-x-1">
                  {(userType === "patient"
                    ? patientNavItems
                    : providerNavItems
                  ).map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActiveLink(item.path)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Profile Dropdown */}
                <div className="relative ml-3" ref={profileMenuRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {userType === "patient" ? (
                        <FaUserInjured />
                      ) : (
                        <FaUserMd />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {userName || "User"}
                    </span>
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1"
                      role="menu"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaUserCircle />
                        <span>Your Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaCog />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FaSignOutAlt />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-t border-gray-200 bg-white shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="px-3 py-3 border-b border-gray-200 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {userType === "patient" ? (
                        <FaUserInjured size={20} />
                      ) : (
                        <FaUserMd size={20} />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {userName || "User"}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {userType}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Nav Items */}
                {(userType === "patient"
                  ? patientNavItems
                  : providerNavItems
                ).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActiveLink(item.path)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}

                {/* Mobile Profile Links */}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserCircle className="text-lg" />
                    <span>Your Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaCog className="text-lg" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Sign out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2 px-3 py-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaUserMd,
//   FaUserInjured,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaHome,
//   FaChartLine,
//   FaFileMedical,
//   FaPills,
//   FaUsers,
//   FaCalendarAlt,
//   FaCog,
// } from "react-icons/fa";
// // Removed direct UserContext import as we'll use AuthContext

// // Reusable NavLink component
// const NavLink = ({ to, icon, children, onClick }) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
//   >
//     {icon}
//     <span className="ml-2">{children}</span>
//   </Link>
// );

// // Mobile NavLink component
// const MobileNavLink = ({ to, icon, children, onClick }) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
//   >
//     <span className="text-lg">{icon}</span>
//     <span className="ml-3">{children}</span>
//   </Link>
// );

// const Navbar = () => {
//   // State management
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const mobileMenuRef = useRef(null);
//   const profileMenuRef = useRef(null);

//   // Check authentication status on mount and when location changes
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');

//     if (token && storedUser) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(storedUser));
//     } else {
//       setIsAuthenticated(false);
//       setUser(null);
//     }
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     setUser(null);
//     navigate('/login');
//   };

//   const userType = user?.role || "patient";
//   const userName = user?.name || "";

//   // Toggle mobile menu
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isProfileOpen) setIsProfileOpen(false);
//   };

//   // Toggle profile dropdown
//   const toggleProfileMenu = () => {
//     setIsProfileOpen(!isProfileOpen);
//     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
//   };

//   // Close all menus when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
//           profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false);
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setIsProfileOpen(false);
//   }, [location]);

//   // Check authentication status
//   useEffect(() => {
//     const checkAuth = () => {
//       // The UserContext now handles authentication state
//       // This effect is kept for potential future use with localStorage sync
//       // between tabs if needed
//     };

//     // Initial check
//     checkAuth();

//     // Listen for auth changes in other tabs
//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   // Navigation items for patient
//   const patientNavItems = [
//     {
//       name: "Dashboard",
//       path: "/patient/dashboard",
//       icon: <FaHome className="text-lg" />,
//     },
//     {
//       name: "Appointments",
//       path: "/patient/appointments",
//       icon: <FaCalendarAlt className="text-lg" />,
//     },
//     {
//       name: "Medical Records",
//       path: "/patient/medical-records",
//       icon: <FaFileMedical className="text-lg" />,
//     },
//     {
//       name: "Health Metrics",
//       path: "/patient/health-metrics",
//       icon: <FaChartLine className="text-lg" />,
//     },
//     {
//       name: "Medications",
//       path: "/patient/medications",
//       icon: <FaPills className="text-lg" />,
//     }
//   ];

//   // Navigation items for provider
//   const providerNavItems = [
//     {
//       name: "Dashboard",
//       path: "/provider/dashboard",
//       icon: <FaHome className="text-lg" />,
//     },
//     {
//       name: "Patients",
//       path: "/provider/patients",
//       icon: <FaUsers className="text-lg" />,
//     },
//     {
//       name: "Appointments",
//       path: "/provider/appointments",
//       icon: <FaCalendarAlt className="text-lg" />,
//     },
//     {
//       name: "Records",
//       path: "/provider/records",
//       icon: <FaFileMedical className="text-lg" />,
//     },
//   ];

//   const publicNavItems = [
//     { name: "About", path: "/about", icon: null },
//     { name: "Contact", path: "/contact", icon: null },
//   ];

//   const renderNavItem = (item) => (
//     <Link
//       key={item.path}
//       to={item.path}
//       className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//         item.path === "/"
//           ? location.pathname === "/"
//             ? "text-white bg-blue-700"
//             : "text-gray-300 hover:bg-blue-600 hover:text-white"
//           : location.pathname === item.path ||
//           (item.path !== "/" &&
//             location.pathname.startsWith(item.path) &&
//             item.path !== "/about" &&
//             item.path !== "/contact")
//           ? "text-white bg-blue-700"
//           : "text-gray-300 hover:bg-blue-600 hover:text-white"
//       }`}
//       onClick={() => setIsMobileMenuOpen(false)}
//     >
//       {item.icon}
//       {item.name}
//     </Link>
//   );

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-3'
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/" className="flex items-center">
//               <span className="text-2xl font-bold text-blue-600">TrustCare</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <div className="hidden md:flex space-x-1">
//                   {(userType === 'patient' ? patientNavItems : providerNavItems).map((item) => (
//                     <Link
//                       key={item.path}
//                       to={item.path}
//                       className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
//                         location.pathname === item.path ||
//                         (item.path !== "/" &&
//                           location.pathname.startsWith(item.path) &&
//                           item.path !== "/about" &&
//                           item.path !== "/contact")
//                           ? "text-white bg-blue-700"
//                           : "text-gray-300 hover:bg-blue-600 hover:text-white"
//                       }`}
//                       onClick={() => setIsMobileMenuOpen(false)}
//                     >
//                       {item.icon}
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>

//                 {/* Profile dropdown and mobile menu button */}
//               <div className="flex items-center space-x-2">
//                 <div className="relative" ref={profileMenuRef}>
//                   <button
//                     onClick={toggleProfileMenu}
//                     className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     aria-expanded={isProfileOpen}
//                     aria-haspopup="true"
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//                       {userType === 'patient' ? <FaUserInjured /> : <FaUserMd />}
//                     </div>
//                     <span className="ml-2 text-sm font-medium text-gray-700">
//                       {userName || 'User'}
//                     </span>
//                   </button>

//                   {/* Profile dropdown menu */}
//                   {isProfileOpen && (
//                     <div
//                       className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50"
//                       role="menu"
//                       aria-orientation="vertical"
//                       aria-labelledby="user-menu"
//                     >
//                       <Link
//                         to="/profile"
//                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         role="menuitem"
//                         onClick={() => setIsProfileOpen(false)}
//                       >
//                         Your Profile
//                       </Link>
//                       <button
//                         onClick={() => {
//                           handleLogout();
//                           setIsProfileOpen(false);
//                         }}
//                         className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                         role="menuitem"
//                       >
//                         Sign out
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Mobile menu button - only visible on small screens */}
//                 <div className="md:hidden">
//                   <button
//                     onClick={toggleMobileMenu}
//                     className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//                     aria-expanded={isMobileMenuOpen}
//                     aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
//                   >
//                     {isMobileMenuOpen ? (
//                       <FaTimes className="block h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <FaBars className="block h-6 w-6" aria-hidden="true" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               </>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/login"
//                   className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
//                 >
//                   Sign in
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
//                 >
//                   Sign up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
