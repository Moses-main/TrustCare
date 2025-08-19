// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [role, setRole] = useState('patient');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div style={{ display:'grid', placeItems:'center', minHeight:'calc(100vh - 160px)', padding:'40px 20px' }}>
      <div style={{ width:'100%', maxWidth:440, border:'1px solid #eee', borderRadius:16, padding:24, background:'#fff' }}>
        <div style={{ marginBottom:12 }}>
          <h2 style={{ margin:'0 0 6px 0' }}>Welcome back</h2>
          <p style={{ margin:0, color:'#666' }}>Select your role to continue</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display:'grid', gap:12 }}>
          <label style={{ display:'grid', gap:6 }}>
            <span style={{ fontSize:14, color:'#555' }}>Role</span>
            <select value={role} onChange={(e)=>setRole(e.target.value)} style={{ width:'100%', padding:10, border:'1px solid #ddd', borderRadius:10 }}>
              <option value="patient">Patient</option>
              <option value="provider">Provider</option>
            </select>
          </label>
          <button type="submit" style={{ padding:'12px 16px', background:'#111', color:'#fff', border:'none', borderRadius:10 }}>Continue</button>
        </form>
        <div style={{ marginTop:12, fontSize:14, color:'#555' }}>
          No account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
