// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, logout } = useAuth();
  const accounts = useSelector((s) => s.web3.accounts);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, backdropFilter:'saturate(180%) blur(10px)', background:'rgba(255,255,255,0.7)', borderBottom:'1px solid #eee', zIndex:50 }}>
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:1200, margin:'0 auto', padding:'12px 20px' }}>
        <Link to="/" style={{ fontWeight:700, fontSize:18, color:'#111' }}>DHRS</Link>
        <div style={{ display:'flex', gap:12, rowGap:8, alignItems:'center', flexWrap:'wrap' }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/records">Records</Link>
          {isAuthenticated && userType === 'patient' && <Link to="/appointments">Appointments</Link>}
          {isAuthenticated && userType === 'patient' && <Link to="/medications">Medications</Link>}
          {isAuthenticated && userType === 'patient' && <Link to="/wellness">Wellness</Link>}
          {isAuthenticated && userType === 'patient' && <Link to="/care-team">Care Team</Link>}
          {isAuthenticated && userType === 'patient' && <Link to="/access-management">Access</Link>}
          {isAuthenticated && userType === 'provider' && <Link to="/patients">Patients</Link>}
          {isAuthenticated && userType === 'provider' && <Link to="/create-record">Create</Link>}
          {isAuthenticated && <Link to="/notifications">Notifications</Link>}
          {isAuthenticated && <Link to="/messages">Messages</Link>}
          {isAuthenticated && <Link to="/invoices">Invoices</Link>}
          {isAuthenticated && <Link to="/profile">Profile</Link>}
          {isAuthenticated && <Link to="/settings">Settings</Link>}
          <span style={{ fontSize:12, color:'#555' }}>{accounts?.[0] ? `${accounts[0].slice(0,6)}...${accounts[0].slice(-4)}` : 'No wallet'}</span>
          {!isAuthenticated ? (
            <>
              <Link to="/login" style={{ padding:'6px 10px', border:'1px solid #ddd', borderRadius:8 }}>Login</Link>
              <Link to="/register" style={{ padding:'6px 10px', background:'#111', color:'#fff', borderRadius:8 }}>Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} style={{ padding:'6px 10px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8 }}>Logout</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
