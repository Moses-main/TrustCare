import React from 'react';
import { FaShieldAlt, FaLock, FaUserShield, FaMobileAlt, FaChartLine, FaDatabase, FaFileMedical } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, delay }) => (
  <div 
    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-2xl mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeaturesSection = ({ id }) => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Military-Grade Security',
      description: 'Your health data is encrypted with AES-256 and stored securely on the blockchain, ensuring it remains private and tamper-proof.'
    },
    {
      icon: <FaLock />,
      title: 'Complete Control',
      description: 'You decide exactly who can access your medical records and for how long, with full transparency and audit trails.'
    },
    {
      icon: <FaUserShield />,
      title: 'Zero-Knowledge Proof',
      description: 'Verify your identity and medical credentials without revealing sensitive information using advanced cryptography.'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Access Anywhere',
      description: 'View and manage your health records from any device, anytime, anywhere in the world with our mobile-friendly platform.'
    },
    {
      icon: <FaChartLine />,
      title: 'Health Insights',
      description: 'Get personalized health analytics and trends based on your medical history to make informed decisions about your health.'
    },
    {
      icon: <FaDatabase />,
      title: 'Interoperable Records',
      description: 'Seamlessly share your medical records with any healthcare provider, regardless of their EHR system.'
    },
    {
      icon: <FaFileMedical />,
      title: 'Emergency Access',
      description: 'Grant temporary access to your medical records in emergency situations to ensure you receive the best possible care.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'HIPAA Compliant',
      description: 'Our platform meets all HIPAA requirements for handling protected health information (PHI).'
    }
  ];

  return (
    <section id={id} className="py-16 bg-gray-50 scroll-mt-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Advanced Healthcare Technology
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Our platform combines cutting-edge blockchain technology with user-friendly design to revolutionize healthcare data management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={(index * 100) % 400}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
