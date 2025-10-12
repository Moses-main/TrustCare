import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Landing/Footer";

/**
 * Main layout component that wraps all pages with common elements
 * - Navbar at the top
 * - Main content area with Outlet for page content
 * - Footer at the bottom
 */
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isLandingPage =
    location.pathname === "/" ||
    location.pathname === "/landing" ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar - Only show for authenticated routes */}
      <Navbar />
      {/* {!isLandingPage && <Navbar />} */}

      {/* Main Content */}
      <main className={`flex-1 ${!isLandingPage ? "pt-16" : ""}`}>
        <div className="max-w-full mx-auto px-0  lg:px-8 py-6 w-full">
          {children || <Outlet />}
        </div>
      </main>

      {/* Footer - Only show for landing page */}
      {isLandingPage && <Footer />}
    </div>
  );
};

export default MainLayout;
