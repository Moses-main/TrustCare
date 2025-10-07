import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Landing.css";
const securityBoxImage = new URL(
  "/images/security-box-usdt.png",
  import.meta.url
).href;

const Landing = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden rounded-xl min-h-[500px] flex flex-col items-center justify-center text-white text-center p-16 my-16"
        style={{
          backgroundImage: 'url("/images/security-box-usdt.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div style={{ position: "relative", maxWidth: "800px" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
            }}
          >
            Secure, Decentralized Healthcare Records
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              marginBottom: "2.5rem",
              lineHeight: "1.6",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            Take control of your medical data with our blockchain-powered
            healthcare records system. Secure, private, and always accessible.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link 
              to="/register" 
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              to="/about" 
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Learn More
            </Link>
          </div>
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
