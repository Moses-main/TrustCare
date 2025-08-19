// src/pages/Patient/Medications.jsx
import React from 'react';
import Card from '../../components/Common/Card';

const Medications = () => {
  const active = [
    { name: 'Atorvastatin', dose: '20mg', schedule: 'Once daily', started: '2025-05-10' },
    { name: 'Metformin', dose: '500mg', schedule: 'Twice daily', started: '2025-03-21' },
  ];
  const history = [
    { name: 'Ibuprofen', dose: '200mg', schedule: 'PRN', stopped: '2025-07-01' },
  ];

  return (
    <div className="container">
      <h2>Medications</h2>
      <div className="grid" style={{ marginTop: 16 }}>
        <Card title="Active">
          <div className="grid" style={{ gap: 10 }}>
            {active.map((m, i) => (
              <div key={i} style={{ border: '1px dashed var(--border)', borderRadius: 10, padding: 12 }}>
                <strong>{m.name}</strong> — {m.dose}
                <div className="muted" style={{ fontSize: 14 }}>{m.schedule} • Since {m.started}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="History">
          <div className="grid" style={{ gap: 10 }}>
            {history.map((m, i) => (
              <div key={i} style={{ border: '1px dashed var(--border)', borderRadius: 10, padding: 12 }}>
                <strong>{m.name}</strong> — {m.dose}
                <div className="muted" style={{ fontSize: 14 }}>Stopped {m.stopped}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Medications;
