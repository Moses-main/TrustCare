import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = ({ id }) => {
  const testimonials = [
    {
      quote: "This platform has completely transformed how I manage my family's medical records. The security and ease of use are unmatched.",
      author: "Sarah Johnson",
      role: "Patient",
      avatar: "/images/avatars/avatar1.jpg"
    },
    {
      quote: "As a healthcare provider, I appreciate how quickly I can access my patients' records with their permission. It saves us all time and improves care.",
      author: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: "/images/avatars/avatar2.jpg"
    },
    {
      quote: "The security features are top-notch. I know my sensitive health data is protected better here than in traditional systems.",
      author: "David Kim",
      role: "Security Analyst",
      avatar: "/images/avatars/avatar3.jpg"
    }
  ];

  return (
    <section id={id} className="relative py-24 bg-gradient-to-b from-gray-900/95 to-gray-900">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-white mb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              Trusted by
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
              Patients & Providers
            </span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Join thousands of healthcare professionals and patients who trust our platform with their most sensitive data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-gray-800/30 p-8 rounded-2xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div className="absolute -top-6 left-6 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg">
                <FaQuoteLeft className="w-5 h-5" />
              </div>
              <div className="relative z-10">
                <p className="text-gray-300 leading-relaxed mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center pt-6 border-t border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden mr-4 border-2 border-blue-500/30">
                    <div className="w-full h-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-blue-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
