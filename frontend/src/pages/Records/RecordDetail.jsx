// src/pages/Records/RecordDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const RecordDetail = () => {
  const { id } = useParams();
  // Mock record indexed by id
  const record = {
    id,
    date: '2025-08-10',
    type: 'Lab Result',
    provider: 'LabX',
    summary: 'Blood panel within normal ranges.',
    ipfsHash: 'QmXyz...123',
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/records" style={{ fontSize: 14 }}>&larr; Back to Records</Link>
      <h2 style={{ marginTop: 8 }}>Record {record.id}</h2>
      <div style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <strong>{record.type}</strong>
          <span style={{ color: '#666' }}>{record.date}</span>
        </div>
        <div style={{ color: '#444', marginTop: 8 }}>{record.summary}</div>
        <div style={{ color: '#777', marginTop: 8 }}>Provider: {record.provider}</div>
        <div style={{ color: '#777', marginTop: 8 }}>IPFS: {record.ipfsHash}</div>
      </div>
    </div>
  );
};

export default RecordDetail;
