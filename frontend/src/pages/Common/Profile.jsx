// src/pages/Common/Profile.jsx
import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    address: '0x98F...a12c',
    role: 'patient',
  });

  const update = (e) => {
    e.preventDefault();
    alert('Profile updated (mock)');
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Profile</h2>
      <form onSubmit={update} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <input value={profile.name} onChange={(e)=>setProfile({ ...profile, name: e.target.value })} />
        <input value={profile.email} onChange={(e)=>setProfile({ ...profile, email: e.target.value })} />
        <input value={profile.address} disabled />
        <input value={profile.role} disabled />
        <button type="submit" style={{ padding: '10px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 8 }}>Save</button>
      </form>
    </div>
  );
};

export default Profile;
