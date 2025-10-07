import React from 'react';
import { Link } from 'react-router-dom';

const CTA = ({ id }) => {
  return (
    <section id={id} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 -skew-y-3 transform origin-top-left"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
              Ready to take control of your health records?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of users who trust our platform with their medical data. 
              Get started in minutes and experience healthcare security redefined.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-white/30 hover:border-white/50 text-white font-medium rounded-lg text-lg transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              No credit card required. HIPAA compliant. 256-bit encryption.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
