import React from 'react';
import { FaShieldAlt, FaUserShield, FaLock, FaChartLine } from 'react-icons/fa';

const About = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About TrustCare</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Empowering patients and healthcare providers with secure, decentralized health records
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          TrustCare is a decentralized healthcare record system that puts patients in control of their medical data. 
          Our platform ensures privacy, security, and easy access to health records when you need them most.
        </p>
        <p className="text-gray-600">
          We believe in transparency and patient empowerment. With TrustCare, you decide who can access your 
          medical information and for how long, all while maintaining the highest standards of data security.
        </p>
      </div>
      
      <div className="bg-blue-50 p-8 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <FaShieldAlt className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Secure & Private</h4>
              <p className="text-gray-600">Your data is encrypted and stored securely using blockchain technology.</p>
            </div>
          </li>
          <li className="flex items-start">
            <FaUserShield className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Patient-Controlled</h4>
              <p className="text-gray-600">You decide who can view and access your medical records.</p>
            </div>
          </li>
          <li className="flex items-start">
            <FaLock className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Decentralized</h4>
              <p className="text-gray-600">No single point of failure ensures maximum uptime and security.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div className="bg-white shadow rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">1</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Create Your Profile</h3>
          <p className="text-gray-600">Sign up and verify your identity to get started.</p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">2</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Upload Records</h3>
          <p className="text-gray-600">Securely upload and organize your medical records.</p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">3</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Share Securely</h3>
          <p className="text-gray-600">Grant access to healthcare providers when needed.</p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
