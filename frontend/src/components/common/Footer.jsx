import React from 'react'
import "./Footer.css";
import logo from "./imgs/Screenshot_2025-07-10_163103-removebg-preview.png";


const Footer = () => {
  return (
    <div className='footer-container'>
        <div className="footer">
            <img src={logo} alt="" className='footer-logo' />
        </div>


        <div className="footer-txts">
            <div className="txt-container1">
                <h3 className="aaa">Dashboard</h3>
                <p>Overview</p>
                <p>Timeline</p>
                <p>Appointments</p>
            </div>
            <div className="txt-container1">
                <h3 className="aaa">Resources</h3>
                <p>Help Center</p>
                <p>Privacy</p>
                <p>Training</p>
            </div>
            <div className="txt-container1">
                <h3 className="aaa">Legal</h3>
                <p>HIPPA</p>
                <p>GDPR</p>
                <p>Terms</p>
            </div>
            <div className="txt-container1">
                <h3 className="aaa">Contact</h3>
                <p>Support</p>
                <p>Blog</p>
                <p>Career</p>
            </div>
        </div>
    </div>
  )
}

export default Footer