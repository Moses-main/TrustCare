// src/pages/Patient/Appointments.jsx
import React from 'react';

const Appointments = () => {
  const upcoming = [
    { id: 1, date: '2025-08-20 09:00', with: 'Dr. Ada', type: 'Consultation' },
    { id: 2, date: '2025-08-25 11:00', with: 'LabX', type: 'Blood Test' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Appointments</h2>
      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {upcoming.map((a) => (
          <div key={a.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{a.type}</strong>
              <span style={{ color: '#666' }}>{a.date}</span>
            </div>
            <div style={{ color: '#444', marginTop: 6 }}>With: {a.with}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
