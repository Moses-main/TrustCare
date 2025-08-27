import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaEnvelope,
  FaChevronDown,
  FaUserMd,
  FaHome,
  FaFileMedical,
  FaCalendarAlt,
  FaPills,
  FaUserFriends,
  FaPlusCircle,
  FaCog,
  FaUserPlus,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    } finally {
      setMobileMenuOpen(false);
      setProfileOpen(false);
    }
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Navigation links based on user role
  const patientLinks = [
    { to: "/patient/dashboard", text: "Dashboard", icon: <MdDashboard /> },
    {
      to: "/patient/appointments",
      text: "Appointments",
      icon: <FaCalendarAlt />,
    },
    {
      to: "/patient/medical-records",
      text: "Records",
      icon: <FaFileMedical />,
    },
    { to: "/patient/medications", text: "Medications", icon: <FaPills /> },
    { to: "/patient/care-team", text: "Care Team", icon: <FaUserFriends /> },
  ];

  const providerLinks = [
    { to: "/provider/dashboard", text: "Dashboard", icon: <MdDashboard /> },
    {
      to: "/provider/appointments",
      text: "Appointments",
      icon: <FaCalendarAlt />,
    },
    { to: "/provider/patients", text: "Patients", icon: <FaUserFriends /> },
    { to: "/provider/records", text: "Records", icon: <FaFileMedical /> },
    {
      to: "/provider/create-record",
      text: "Create Record",
      icon: <FaPlusCircle />,
    },
  ];

  const commonLinks = [
    {
      to: isAuthenticated ? `/${user.role}/messages` : "/login",
      text: "Messages",
      icon: <FaEnvelope />,
    },
  ];

  const navLinks = isAuthenticated
    ? user.role === "patient"
      ? patientLinks
      : providerLinks
    : [];

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-text">TrustCare</span>
            <span className="logo-subtext">Decentralized Healthcare</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
            >
              {link.icon}
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <div className="icon-links">
                {commonLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="icon-link"
                    aria-label={link.text}
                    title={link.text}
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>

              <div className="relative">
                <button
                  className="profile-button"
                  onClick={toggleProfile}
                  aria-expanded={profileOpen}
                  aria-label="Profile menu"
                >
                  <div className="profile-avatar">
                    {user.firstName?.charAt(0) || <FaUser />}
                  </div>
                  <span className="user-name">
                    {user.firstName || "Profile"}
                    <FaChevronDown
                      className={`ml-1 transition-transform ${profileOpen ? "transform rotate-180" : ""}`}
                    />
                  </span>
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <Link
                      to={`/${user.role}/profile`}
                      className="dropdown-item"
                    >
                      <FaUser className="mr-2" />
                      My Profile
                    </Link>
                    <Link
                      to={`/${user.role}/settings`}
                      className="dropdown-item"
                    >
                      <FaCog className="mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link
                to="/login"
                className="btn btn-outline"
                state={{ from: location.pathname }}
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        <nav>
          {isAuthenticated ? (
            <>
              <div className="mobile-user-info">
                <div className="mobile-avatar">
                  {user.firstName?.charAt(0) || <FaUser />}
                </div>
                <div>
                  <div className="mobile-user-name">
                    {user.firstName
                      ? `${user.firstName} ${user.lastName || ""}`
                      : "User"}
                  </div>
                  <div className="mobile-user-role">
                    {user.role === "patient"
                      ? "Patient"
                      : "Healthcare Provider"}
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`mobile-nav-link ${location.pathname === link.to ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              ))}

              <div className="mobile-nav-divider"></div>

              {commonLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              ))}

              <Link
                to={`/${user.role}/profile`}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUser className="mr-3" />
                My Profile
              </Link>

              <Link
                to={`/${user.role}/settings`}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaCog className="mr-3" />
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="mobile-nav-link text-red-600"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHome className="mr-3" />
                Home
              </Link>
              <Link
                to="/login"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
                state={{ from: location.pathname }}
              >
                <FaSignInAlt className="mr-3" />
                Login
              </Link>
              <Link
                to="/register"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaUserPlus className="mr-3" />
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
