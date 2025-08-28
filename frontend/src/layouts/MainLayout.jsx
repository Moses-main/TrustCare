import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

/**
 * Main layout component that wraps all pages with common elements
 * - Navbar at the top
 * - Main content area with Outlet for page content
 * - Footer at the bottom
 */
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/landing';
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Content */}
      <main className={`flex-grow ${!isLandingPage ? 'pt-16' : ''}`}>
        {children || <Outlet />}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
