// src/pages/Patient/AccessManagement.jsx
import React, { useState } from 'react';

const AccessManagement = () => {
  const [grants, setGrants] = useState([
    { id: 1, provider: '0xAbc...1234', scope: 'Read', status: 'Active' },
  ]);
  const [provider, setProvider] = useState('');
  const [scope, setScope] = useState('Read');

  const grantAccess = (e) => {
    e.preventDefault();
    if (!provider) return;
    setGrants((g) => [{ id: Date.now(), provider, scope, status: 'Active' }, ...g]);
    setProvider('');
  };

  const revoke = (id) => setGrants((g) => g.filter((x) => x.id !== id));

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Access Management</h2>
      <p style={{ color: '#666' }}>Grant or revoke provider access to your records</p>

      <form onSubmit={grantAccess} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <input
          placeholder="Provider address (0x...)"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }}
        />
        <select value={scope} onChange={(e) => setScope(e.target.value)} style={{ padding: 10 }}>
          <option>Read</option>
          <option>Write</option>
        </select>
        <button type="submit" style={{ padding: '10px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 8 }}>
          Grant Access
        </button>
      </form>

      <div style={{ display: 'grid', gap: 10, marginTop: 24 }}>
        {grants.map((g) => (
          <div key={g.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 14, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div><strong>{g.provider}</strong></div>
              <div style={{ color: '#666', fontSize: 14 }}>{g.scope} • {g.status}</div>
            </div>
            <button onClick={() => revoke(g.id)} style={{ padding: '8px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8 }}>Revoke</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessManagement;
