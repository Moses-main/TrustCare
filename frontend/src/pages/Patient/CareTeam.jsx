// src/pages/Patient/CareTeam.jsx
import React from 'react';
import Card from '../../components/Common/Card';

const CareTeam = () => {
  const members = [
    { name: 'Dr. Ada Lovelace', role: 'Primary Physician', contact: 'ada@clinic.example' },
    { name: 'LabX Diagnostics', role: 'Laboratory', contact: 'support@labx.example' },
    { name: 'Dr. Alan Turing', role: 'Cardiologist', contact: 'alan@heart.example' },
  ];

  return (
    <div className="container">
      <h2>Care Team</h2>
      <div className="grid" style={{ marginTop: 16 }}>
        <Card>
          <div className="grid" style={{ gap: 12 }}>
            {members.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', border: '1px dashed var(--border)', borderRadius: 10, padding: 12 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div className="muted" style={{ fontSize: 14 }}>{m.role}</div>
                </div>
                <div className="muted" style={{ fontSize: 14 }}>{m.contact}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CareTeam;
