// src/pages/Provider/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  const patients = [
    { id: '0x98F...a12c', name: 'John Doe', lastSeen: '2025-08-12' },
    { id: '0x5B1...f3D9', name: 'Jane Smith', lastSeen: '2025-08-09' },
    { id: '0x77C...b11A', name: 'Sam Lee', lastSeen: '2025-08-03' },
  ];

  const recentActivity = [
    { id: 'REC-010', patient: 'John Doe', type: 'Consultation', date: '2025-08-12' },
    { id: 'REC-009', patient: 'Jane Smith', type: 'Lab Order', date: '2025-08-10' },
    { id: 'REC-008', patient: 'Sam Lee', type: 'Prescription', date: '2025-08-05' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Provider Dashboard</h2>
      <p style={{ color: '#666' }}>View patients, create new records, and manage access.</p>

      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          marginTop: 16,
        }}
      >
        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3>Quick Actions</h3>
          <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
            <Link to="/create-record">Create New Record</Link>
            <Link to="/records">Browse Patient Records</Link>
          </div>
        </div>

        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3>My Patients</h3>
          <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
            {patients.map((p) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div><strong>{p.name}</strong></div>
                  <div style={{ color: '#666', fontSize: 13 }}>{p.id}</div>
                </div>
                <span style={{ color: '#666' }}>{p.lastSeen}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
          <h3>Recent Activity</h3>
          <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
            {recentActivity.map((a) => (
              <div key={a.id} style={{ border: '1px solid #f1f1f1', borderRadius: 10, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{a.type}</strong>
                  <span style={{ color: '#666' }}>{a.date}</span>
                </div>
                <div style={{ color: '#444', marginTop: 6 }}>Patient: {a.patient}</div>
                <div style={{ color: '#777', fontSize: 13 }}>Ref: {a.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
