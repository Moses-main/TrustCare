// src/pages/Billing/Invoices.jsx
import React from 'react';

const Invoices = () => {
  const invoices = [
    { id: 'INV-001', date: '2025-07-30', amount: '$120.00', status: 'Paid' },
    { id: 'INV-002', date: '2025-08-10', amount: '$60.00', status: 'Pending' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Invoices</h2>
      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        {invoices.map((i) => (
          <div key={i.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 14, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div><strong>{i.id}</strong></div>
              <div style={{ color: '#666', fontSize: 13 }}>{i.date}</div>
            </div>
            <div style={{ color: '#444' }}>{i.amount} • {i.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoices;
