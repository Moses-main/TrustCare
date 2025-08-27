import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CTASection = () => {
  const { currentUser } = useAuth();

  return (
    <section className="relative bg-blue-900 text-white py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to take control of your health data?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of users who trust our platform for secure, private, and
            accessible healthcare records management.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {!currentUser ? (
              <>
                <Link
                  to="/register"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to={currentUser.role === 'patient' ? '/patient/dashboard' : '/provider/dashboard'}
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
          
          <div className="mt-8 text-sm text-blue-200">
            No credit card required • Cancel anytime • 30-day free trial
          </div>
        </div>
      </div>
      
      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white rounded-t-full transform translate-y-1/2"></div>
    </section>
  );
};

export default CTASection;
