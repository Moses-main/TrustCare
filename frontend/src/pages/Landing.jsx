// src/pages/Landing.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../hooks/useWeb3';

const Icon = ({ path }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d={path} fill="#111" />
  </svg>
);

const Card = ({ icon, title, desc }) => (
  <div style={{ padding:20, border:'1px solid #eee', borderRadius:16, background:'#fff' }}>
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
      <Icon path={icon} />
      <h3 style={{ margin:0, fontSize:18 }}>{title}</h3>
    </div>
    <p style={{ margin:0, color:'#555' }}>{desc}</p>
  </div>
);

const Landing = () => {
  const { isWeb3Enabled, loading, connectWallet, error } = useWeb3();

  return (
    <div>
      {/* HERO */}
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'120px 20px 40px', display:'grid', gap:24 }}>
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 10px', border:'1px solid #eee', borderRadius:999 }}>
            <span style={{ width:8, height:8, background:'#10b981', borderRadius:999 }} />
            <span style={{ fontSize:13, color:'#444' }}>On‑chain access control • Off‑chain encryption</span>
          </div>
        </div>
        <div>
          <h1 style={{ fontSize:52, margin:'8px 0 12px 0', lineHeight:1.05 }}>Secure, patient‑controlled healthcare records</h1>
          <p style={{ fontSize:18, color:'#555', margin:'0 0 20px 0' }}>
            DHRS enables patients and providers to share, verify, and audit medical records with privacy and integrity.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link to="/register" style={{ padding:'12px 18px', background:'#111', color:'#fff', borderRadius:12 }}>Get started</Link>
            <Link to="/records" style={{ padding:'12px 18px', border:'1px solid #ddd', borderRadius:12 }}>Browse records</Link>
            {!isWeb3Enabled && (
              <button onClick={connectWallet} disabled={loading} style={{ padding:'12px 18px', border:'1px solid #ddd', borderRadius:12, background:'#fff' }}>
                {loading ? 'Checking wallet…' : 'Connect wallet'}
              </button>
            )}
          </div>
          {error && <div style={{ color:'#b91c1c', marginTop:10 }}>{error}</div>}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'20px', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:16 }}>
        <Card title="Ownership" desc="Patients own data and control access." icon="M12 2l3 6 6 .9-4.5 4.4L17 20l-5-2.6L7 20l1.5-6.7L4 8.9 10 8z" />
        <Card title="Interoperability" desc="Works across providers and systems." icon="M3 12h18v2H3v-2zm0-6h12v2H3V6zm0 12h12v2H3v-2z" />
        <Card title="Integrity" desc="Tamper‑evident audit trail on‑chain." icon="M12 1l9 5v6c0 5-4 9-9 11-5-2-9-6-9-11V6l9-5z" />
        <Card title="Encryption" desc="Off‑chain encrypted storage with on‑chain refs." icon="M12 17a5 5 0 100-10 5 5 0 000 10zM4 10a8 8 0 1116 0v4H4v-4z" />
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'20px' }}>
        <div style={{ border:'1px solid #eee', borderRadius:16, padding:20, background:'#fff' }}>
          <h3 style={{ marginTop:0 }}>How DHRS works</h3>
          <ol style={{ margin:0, paddingLeft:18, color:'#555', lineHeight:1.7 }}>
            <li>Records are encrypted and stored off‑chain (e.g., IPFS/object storage).</li>
            <li>On‑chain contracts store references and access permissions.</li>
            <li>Patients grant or revoke provider access anytime.</li>
            <li>Providers can verify integrity and provenance instantly.</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Landing;
