import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Landing/Footer";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isLandingPage =
    location.pathname === "/" ||
    location.pathname === "/landing" ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className={`flex-1 ${!isLandingPage ? "pt-14 sm:pt-16" : ""}`}>
        <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
          {children || <Outlet />}
        </div>
      </main>
      {isLandingPage && <Footer />}
    </div>
  );
};

export default MainLayout;
