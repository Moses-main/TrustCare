import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

// Components
import HeroSection from "../components/Landing/HeroSection";
import FeaturesSection from "../components/Landing/FeaturesSection";
import HowItWorks from "../components/Landing/HowItWorks";
import TestimonialsSection from "../components/Landing/TestimonialsSection";
import CTASection from "../components/Landing/CTASection";

// Initialize AOS (Animate on Scroll)
const initAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);
};

// Smooth scroll to section
const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Landing = () => {
  // Initialize AOS
  initAOS();

  // Navigation items for landing page
  const navItems = [
    { name: "Features", section: "features" },
    { name: "How It Works", section: "how-it-works" },
    { name: "Testimonials", section: "testimonials" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
    {
      name: "Login",
      to: "/login",
      className: "text-blue-600 hover:text-blue-700",
    },
    {
      name: "Sign Up",
      to: "/register",
      className:
        "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar - Simplified for landing page */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                TrustCare
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item, index) =>
                item.section ? (
                  <button
                    key={index}
                    onClick={(e) => scrollToSection(e, item.section)}
                    className={`px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 ${item.className || ""}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={item.to}
                    className={`px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 ${item.className || ""}`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        <HeroSection id="hero" />
        <FeaturesSection id="features" />
        <HowItWorks id="how-it-works" />
        <TestimonialsSection id="testimonials" />
        <CTASection id="cta" />
      </div>
    </div>
  );
};

export default Landing;
