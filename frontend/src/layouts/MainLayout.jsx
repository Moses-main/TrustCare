import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

/**
 * Main layout component that wraps all pages with common elements
 * - Navbar at the top
 * - Main content area with Outlet for page content
 * - Footer at the bottom
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Content - flex-grow makes it take up all available space */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
