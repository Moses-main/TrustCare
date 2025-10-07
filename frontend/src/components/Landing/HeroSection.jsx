import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';

const HeroSection = ({ id }) => {
  return (
    <div id={id} className="relative bg-cover bg-center bg-no-repeat text-white overflow-hidden min-h-screen flex items-center" 
         style={{ backgroundImage: 'url(/images/security-box-usdt.png)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 z-10">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm text-blue-100 mb-6 border border-white/20">
            <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            Secure. Private. Decentralized.
          </div>
          
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Transforming Healthcare</span>
            <span className="block text-blue-200">Through Blockchain</span>
          </h1>
          
          <p className="mt-6 max-w-lg mx-auto text-xl text-blue-100">
            Take control of your medical records with our secure, decentralized platform built on blockchain technology.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 backdrop-blur-sm md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <FaShieldAlt className="w-6 h-6" />, value: '100%', label: 'Secure' },
            { icon: <FaLock className="w-6 h-6" />, value: 'HIPAA', label: 'Compliant' },
            { icon: <FaUserShield className="w-6 h-6" />, value: 'Zero-Knowledge', label: 'Proof' },
            { value: '24/7', label: 'Access' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="flex justify-center text-blue-300 mb-2">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bottom curve */}
      <div className="relative
        before:absolute before:content-[''] before:block before:w-full before:h-20 before:bg-white before:rounded-t-full before:bottom-0 before:left-0">
      </div>
    </div>
  );
};

export default HeroSection;
