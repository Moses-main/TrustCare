import React from 'react';
import { FaUserPlus, FaFileMedicalAlt, FaUserMd, FaChartLine } from 'react-icons/fa';

const Step = ({ number, title, description, icon, delay }) => {
  const icons = {
    'user-plus': <FaUserPlus className="w-6 h-6" />,
    'file-medical': <FaFileMedicalAlt className="w-6 h-6" />,
    'user-md': <FaUserMd className="w-6 h-6" />,
    'chart-line': <FaChartLine className="w-6 h-6" />
  };

  return (
    <div 
      className="relative pl-16 py-6 group"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="absolute left-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icons[icon] || <span className="font-bold text-xl">{number}</span>}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      
      {number < 4 && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 group-last:hidden"></div>
      )}
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Create Your Account',
      description: 'Sign up in seconds with your email or social accounts. Complete your profile with basic information to get started.',
      icon: 'user-plus'
    },
    {
      number: 2,
      title: 'Upload Your Records',
      description: 'Easily upload your medical records, test results, and health information. Our system automatically organizes everything for you.',
      icon: 'file-medical'
    },
    {
      number: 3,
      title: 'Connect with Providers',
      description: 'Grant secure access to your healthcare providers, ensuring they have the most up-to-date information.',
      icon: 'user-md'
    },
    {
      number: 4,
      title: 'Track Your Health',
      description: 'Monitor your health metrics, set goals, and receive personalized insights to improve your wellbeing.',
      icon: 'chart-line'
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-blue-100"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get started in just a few simple steps and take control of your health data
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={index * 100}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
            <span>Ready to get started?</span>
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
