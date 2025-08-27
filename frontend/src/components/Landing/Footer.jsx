import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    solutions: [
      { name: 'For Patients', href: '/patients' },
      { name: 'For Providers', href: '/providers' },
      { name: 'For Enterprises', href: '/enterprise' },
      { name: 'Pricing', href: '/pricing' },
    ],
    support: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Guides', href: '/guides' },
      { name: 'API Status', href: '/status' },
      { name: 'Contact Support', href: '/support' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
    social: [
      {
        name: 'Twitter',
        href: 'https://twitter.com',
        icon: FaTwitter,
      },
      {
        name: 'GitHub',
        href: 'https://github.com',
        icon: FaGithub,
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com',
        icon: FaLinkedin,
      },
      {
        name: 'Facebook',
        href: 'https://facebook.com',
        icon: FaFacebook,
      },
      {
        name: 'Instagram',
        href: 'https://instagram.com',
        icon: FaInstagram,
      },
    ],
  };

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <span className="text-white text-2xl font-bold">DHRS</span>
            </div>
            <p className="text-gray-300 text-base">
              The most secure and private way to manage your healthcare records, powered by blockchain technology.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-gray-400 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-gray-400 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-gray-400 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-base text-gray-400 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {currentYear} DHRS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
