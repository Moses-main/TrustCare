import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Secure, Decentralized Healthcare Records
          </h1>
          <p className="hero-subtitle">
            Take control of your medical data with our blockchain-powered healthcare records system.
            Secure, private, and always accessible.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="/images/healthcare-illustration.svg" 
            alt="Healthcare illustration" 
            className="hero-illustration"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Our Platform</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Secure</h3>
            <p>Your data is encrypted and stored securely on the blockchain.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-user-shield"></i>
            </div>
            <h3>Private</h3>
            <p>You control who can access your health records.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Accessible</h3>
            <p>Access your records anytime, anywhere, from any device.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to take control of your health records?</h2>
        <p>Join thousands of users who trust us with their healthcare data.</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default Landing;
