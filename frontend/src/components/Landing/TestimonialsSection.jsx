import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialCard = ({ quote, author, role, avatar, rating = 5 }) => (
  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
    <div className="text-blue-500 text-3xl mb-4">
      <FaQuoteLeft />
    </div>
    <p className="text-gray-700 italic mb-6 flex-grow">"{quote}"</p>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg mr-4">
        {avatar}
      </div>
      <div>
        <div className="font-medium text-gray-900">{author}</div>
        <div className="text-sm text-gray-500">{role}</div>
        <div className="flex mt-1">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TestimonialsSection = ({ id }) => {
  const testimonials = [
    {
      quote: "This platform has completely transformed how I manage my family's health records. Everything is in one secure place and easily accessible.",
      author: 'Sarah Johnson',
      role: 'Patient',
      avatar: 'SJ',
      rating: 5
    },
    {
      quote: "As a healthcare provider, I can access my patients' complete medical history instantly, which helps me provide better, more informed care.",
      author: 'Dr. Michael Chen',
      role: 'Cardiologist',
      avatar: 'MC',
      rating: 5
    },
    {
      quote: "The security and ease of use are unmatched. I feel confident that my sensitive health data is protected while still being accessible when I need it.",
      author: 'Robert Taylor',
      role: 'Patient',
      avatar: 'RT',
      rating: 4
    },
    {
      quote: "Our clinic has reduced administrative work by 40% since implementing this system. It's a game-changer for healthcare providers.",
      author: 'Dr. Emily Wilson',
      role: 'Family Physician',
      avatar: 'EW',
      rating: 5
    }
  ];

  return (
    <section id={id} className="py-16 bg-gray-50 scroll-mt-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full -ml-32 -mb-32"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Thousands
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
            Read more success stories
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
