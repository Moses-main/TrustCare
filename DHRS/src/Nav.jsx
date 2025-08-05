import React from 'react';
import './Nav.css'; 
import logo from "./imgs/Screenshot_2025-07-10_163103-removebg-preview.png";


const Nav = () => {
  return (
    <div>
      <div className="Nav-container">
        <div className="nav-logo">
          <img src={logo} alt="logo" className="nav-logos" />
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link">
            Overview
          </a>
          <a href="#" className="nav-link">
            Medical Timeline
          </a>
          <a href="#" className="nav-link">
            Appointments
          </a>
        </div>
        <div className="emergency-btns">
          <button className="emergency-btn">Emergency Info</button>
        </div>
      </div>
    </div>
  );
}

export default Nav