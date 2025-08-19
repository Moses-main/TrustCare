// src/components/Layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ borderTop:'1px solid #eee', marginTop:40, background:'#fafafa' }}>
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'28px 20px', display:'grid', gap:18, gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))' }}>
      <div>
        <div style={{ fontWeight:700, marginBottom:8 }}>DHRS</div>
        <div style={{ color:'#666' }}>Decentralized Healthcare Records</div>
      </div>
      <div>
        <div style={{ fontWeight:600, marginBottom:8 }}>Product</div>
        <nav style={{ display:'grid', gap:8 }}>
          <Link to="/" >Home</Link>
          <Link to="/records" >Records</Link>
          <Link to="/access-management" >Access</Link>
          <Link to="/create-record" >Create Record</Link>
        </nav>
      </div>
      <div>
        <div style={{ fontWeight:600, marginBottom:8 }}>Company</div>
        <nav style={{ display:'grid', gap:8 }}>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <div>
        <div style={{ fontWeight:600, marginBottom:8 }}>Legal</div>
        <nav style={{ display:'grid', gap:8 }}>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
      </div>
    </div>
    <div style={{ borderTop:'1px solid #eee', color:'#666' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'14px 20px', display:'flex', justifyContent:'space-between', fontSize:14 }}>
        <span>© {new Date().getFullYear()} DHRS</span>
        <span>Built for secure patient data ownership</span>
      </div>
    </div>
  </footer>
);

export default Footer;
