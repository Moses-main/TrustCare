import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "../../components/Landing/HeroSection";
import HowItWorks from "../../components/Landing/HowItWorks";
import Features from "../../components/Landing/Features";
import Testimonials from "../../components/Landing/Testimonials";
import CTA from "../../components/Landing/CTA";
import Footer from "../../components/Landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <HeroSection id="hero" />
      <HowItWorks id="how-it-works" />
      <Features id="features" />
      <Testimonials id="testimonials" />
      <CTA id="cta" />
      <Footer />
    </div>
  );
};

export default Landing;
