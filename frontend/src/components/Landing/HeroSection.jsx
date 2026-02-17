import React from "react";
import { useLogin } from '@privy-io/react-auth';
import { FaShieldAlt, FaLock, FaUserShield } from "react-icons/fa";

const HeroSection = ({ id }) => {
  const { login } = useLogin({
    onComplete: (user, isNewUser) => {
      console.log('Logged in:', user, isNewUser);
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const openLoginModal = () => {
    login();
  };

  return (
    <div id={id} className="relative bg-gray-900 text-white overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900/80"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 z-10">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/5 text-blue-300 mb-6 border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Secure. Private. Decentralized.
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              Transforming Healthcare
            </span>
            <span className="block mt-2 sm:mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
              Through Blockchain
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            Secure, decentralized medical records that put you in control. 
            Your health data, protected by blockchain technology.
          </p>

          <div className="mt-8 sm:mt-10">
            <button
              onClick={openLoginModal}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-base sm:text-lg font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <FaShieldAlt className="w-6 h-6" />,
              value: "100%",
              label: "Secure",
            },
            {
              icon: <FaLock className="w-6 h-6" />,
              value: "HIPAA",
              label: "Compliant",
            },
            {
              icon: <FaUserShield className="w-6 h-6" />,
              value: "Zero-Knowledge",
              label: "Proof",
            },
            { value: "24/7", label: "Access" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="flex justify-center text-blue-300 mb-2">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative
        before:absolute before:content-[''] before:block before:w-full before:h-20 before:bg-white before:rounded-t-full before:bottom-0 before:left-0"
      ></div>
    </div>
  );
};

export default HeroSection;
