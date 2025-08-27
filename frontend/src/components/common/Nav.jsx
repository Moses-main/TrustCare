import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; 
import menu from "./imgs/more.png";
import logo from "./imgs/Screenshot_2025-07-10_163103-removebg-preview.png";


const Nav = ({ onMenuToggle }) => {
  return (
    <div>
      <div className="Nav-container">
        <div className="nav-logo flex items-center">
          <img src={logo} alt="logo" className="nav-logos" />
          <div className="mt-[-60px]">
            <h2 className="nav-logo-text pl-[-10px] font-bold mt-[-30px]">DHCRS</h2>
          </div>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link">
            Overview
          </a>
          <Link to="/interactions" className="nav-link">
            Interactions
          </Link>
          <a href="#" className="nav-link">
            Appointments
          </a>
        </div>
        <div className="emergency-btns">
          <button className="emergency-btn">Emergency Info</button>
        </div>
        <img src={menu} alt="" className="cursor-pointer w-[3%]" onClick={onMenuToggle} />
      </div>
    </div>
  );
}

export default Nav
