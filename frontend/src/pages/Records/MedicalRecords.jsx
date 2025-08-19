// src/pages/Records/MedicalRecords.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MedicalRecords = () => {
  // Placeholder data – replace with fetch from backend/contract
  const records = [
    { id: 'REC-001', date: '2025-08-01', type: 'Consultation', provider: 'Dr. Ada', summary: 'Routine check-up' },
    { id: 'REC-002', date: '2025-08-10', type: 'Lab Result', provider: 'LabX', summary: 'Blood panel normal' },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Medical Records</h2>
      <p style={{ color: '#666' }}>Your on-chain referenced medical records</p>
      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {records.map((r) => (
          <Link key={r.id} to={`/records/${r.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{r.type}</strong>
                <span style={{ color: '#666' }}>{r.date}</span>
              </div>
              <div style={{ color: '#444', marginTop: 8 }}>{r.summary}</div>
              <div style={{ color: '#777', marginTop: 4 }}>Provider: {r.provider}</div>
              <div style={{ marginTop: 8, fontSize: 14, color: '#0f62fe' }}>View →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;
