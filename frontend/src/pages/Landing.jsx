import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import HeroSection from "../components/Landing/HeroSection";
import FeaturesSection from "../components/Landing/FeaturesSection";
import HowItWorks from "../components/Landing/HowItWorks";
import TestimonialsSection from "../components/Landing/TestimonialsSection";
import CTASection from "../components/Landing/CTASection";
import Footer from "../components/Landing/Footer";

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

const Landing = () => {
  // Initialize AOS
  initAOS();

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Landing;
