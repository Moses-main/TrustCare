import React from 'react';
import { FaShieldAlt, FaUserLock, FaExchangeAlt, FaFingerprint } from 'react-icons/fa';

const Features = ({ id }) => {
  const features = [
    {
      icon: <FaShieldAlt className="w-6 h-6 text-blue-400" />,
      title: 'Military-Grade Security',
      description: 'End-to-end encryption with zero-knowledge proof technology to protect your health data.'
    },
    {
      icon: <FaUserLock className="w-6 h-6 text-blue-400" />,
      title: 'Complete Control',
      description: 'You own your data. Grant and revoke access with a single click.'
    },
    {
      icon: <FaExchangeAlt className="w-6 h-6 text-blue-400" />,
      title: 'Seamless Sharing',
      description: 'Securely share records with healthcare providers in seconds.'
    },
    {
      icon: <FaFingerprint className="w-6 h-6 text-blue-400" />,
      title: 'Biometric Access',
      description: 'Quick and secure access using your device\'s biometric authentication.'
    }
  ];

  return (
    <section id={id} className="py-16 sm:py-20 md:py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              Secure Healthcare,
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
              Redefined
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Experience the future of medical record management with our blockchain-powered platform.
            Your health data, secured by cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gray-800/30 p-6 sm:p-6 md:p-7 rounded-xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(feature.icon, { className: 'w-5 h-5 sm:w-6 sm:h-6' })}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
