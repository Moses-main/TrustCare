// src/pages/Common/Notifications.jsx
import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, title: 'Access Granted', detail: 'Dr. Ada now has read access to your records', date: '2025-08-11' },
    { id: 2, title: 'New Record Added', detail: 'Lab result uploaded by LabX', date: '2025-08-10' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Notifications</h2>
      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {notifications.map((n) => (
          <div key={n.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{n.title}</strong>
              <span style={{ color: '#666' }}>{n.date}</span>
            </div>
            <div style={{ color: '#444', marginTop: 6 }}>{n.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
