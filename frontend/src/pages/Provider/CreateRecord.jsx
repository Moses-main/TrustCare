// src/pages/Provider/CreateRecord.jsx
import React, { useState } from 'react';

const CreateRecord = () => {
  const [patient, setPatient] = useState('');
  const [type, setType] = useState('Consultation');
  const [summary, setSummary] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!patient || !summary) return;
    // TODO: integrate with backend/smart contract to store IPFS hash and on-chain reference
    alert(`Record created for ${patient}: ${type} — ${summary}`);
    setPatient('');
    setType('Consultation');
    setSummary('');
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Create Record</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <input
          placeholder="Patient address (0x...)"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: 10 }}>
          <option>Consultation</option>
          <option>Lab Result</option>
          <option>Imaging</option>
          <option>Prescription</option>
        </select>
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={5}
          style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }}
        />
        <button type="submit" style={{ padding: '10px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 8 }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecord;
