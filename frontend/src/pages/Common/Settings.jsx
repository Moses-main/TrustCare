// src/pages/Common/Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [prefs, setPrefs] = useState({
    notifications: true,
    autoConnectWallet: false,
    darkMode: false,
  });

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Settings</h2>
      <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={prefs.notifications} onChange={(e)=>setPrefs({ ...prefs, notifications: e.target.checked })} />
          Enable notifications
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={prefs.autoConnectWallet} onChange={(e)=>setPrefs({ ...prefs, autoConnectWallet: e.target.checked })} />
          Auto connect wallet
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={prefs.darkMode} onChange={(e)=>setPrefs({ ...prefs, darkMode: e.target.checked })} />
          Dark mode
        </label>
      </div>
    </div>
  );
};

export default Settings;
