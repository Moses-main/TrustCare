// src/pages/Patient/Wellness.jsx
import React from 'react';
import Card from '../../components/Common/Card';

const Wellness = () => {
  const metrics = [
    { label: 'Steps', value: '8,420', sub: 'Today' },
    { label: 'Sleep', value: '7h 15m', sub: 'Last night' },
    { label: 'Heart Rate', value: '72 bpm', sub: 'Resting' },
  ];
  const tips = [
    'Stay hydrated: 2–3 liters/day',
    'Aim for 30 minutes of activity',
    'Maintain consistent sleep schedule',
  ];

  return (
    <div className="container">
      <h2>Wellness</h2>
      <div className="grid grid-responsive" style={{ marginTop: 16 }}>
        <Card title="Daily Metrics">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ border: '1px dashed var(--border)', borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{m.value}</div>
                <div className="muted" style={{ fontSize: 14 }}>{m.label} • {m.sub}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Recommendations">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {tips.map((t, i) => (
              <li key={i} style={{ margin: '6px 0', color: 'var(--muted)' }}>{t}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Wellness;
