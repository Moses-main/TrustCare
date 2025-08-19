// src/pages/Provider/Patients.jsx
import React from 'react';

const Patients = () => {
  const list = [
    { id: '0x98F...a12c', name: 'John Doe', lastRecord: 'Consultation (2025-08-12)' },
    { id: '0x5B1...f3D9', name: 'Jane Smith', lastRecord: 'Lab Order (2025-08-10)' },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Patients</h2>
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        {list.map((p) => (
          <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 14, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div><strong>{p.name}</strong></div>
              <div style={{ color: '#666', fontSize: 13 }}>{p.id}</div>
            </div>
            <div style={{ color: '#555' }}>{p.lastRecord}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;
