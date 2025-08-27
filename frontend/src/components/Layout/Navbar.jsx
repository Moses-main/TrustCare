// src/components/Layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaBell, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, userType, logout } = useAuth();
  const accounts = useSelector((s) => s.web3.accounts);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const patientLinks = [
    { to: '/dashboard', text: 'Dashboard' },
    { to: '/records', text: 'Medical Records' },
    { to: '/appointments', text: 'Appointments' },
    { to: '/medications', text: 'Medications' },
    { to: '/wellness', text: 'Wellness' },
    { to: '/care-team', text: 'Care Team' },
  ];

  const providerLinks = [
    { to: '/dashboard', text: 'Dashboard' },
    { to: '/patients', text: 'Patients' },
    { to: '/records', text: 'Records' },
    { to: '/create-record', text: 'Create Record' },
  ];

  const commonLinks = [
    { to: '/messages', text: 'Messages', icon: <FaEnvelope /> },
    { to: '/notifications', text: 'Notifications', icon: <FaBell /> },
  ];

  const navLinks = isAuthenticated 
    ? (userType === 'patient' ? patientLinks : providerLinks)
    : [];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-text">DHRS</span>
            <span className="logo-subtext">Decentralized Healthcare</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.text}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <div className="icon-links">
                {commonLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="icon-link" aria-label={link.text}>
                    {link.icon}
                    <span className="badge">3</span> {/* Replace with actual count */}
                  </Link>
                ))}
              </div>
              
              <div className="profile-dropdown">
                <button className="profile-button">
                  <FaUser className="profile-icon" />
                  <span className="wallet-address">
                    {accounts?.[0] ? `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}` : 'Wallet'}
                  </span>
                  <FaChevronDown className="dropdown-arrow" />
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">My Profile</Link>
                  <Link to="/settings" className="dropdown-item">Settings</Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <nav>
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                {commonLinks.map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to}
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon} {link.text}
                  </Link>
                ))}
                <Link 
                  to="/profile" 
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser /> My Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="mobile-nav-link logout"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            )}
          </nav>
          {!isAuthenticated && (
            <div className="mobile-auth-buttons">
              <Link 
                to="/login" 
                className="btn btn-outline"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaSignInAlt /> Login
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
          <div className="wallet-info-mobile">
            {accounts?.[0] && (
              <span className="wallet-address">
                {`${accounts[0].slice(0, 10)}...${accounts[0].slice(-8)}`}
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
