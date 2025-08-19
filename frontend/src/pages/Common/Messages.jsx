// src/pages/Common/Messages.jsx
import React, { useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, from: 'Dr. Ada', text: 'Please review your lab results.', time: '10:12' },
    { id: 2, from: 'You', text: 'Thanks, doctor! Looks good.', time: '10:14' },
  ]);
  const [text, setText] = useState('');

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: 'You', text, time: new Date().toLocaleTimeString() }]);
    setText('');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Messages</h2>
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 10 }}>
            <div style={{ fontWeight: 600 }}>{m.from}</div>
            <div style={{ color: '#444', marginTop: 4 }}>{m.text}</div>
            <div style={{ color: '#777', fontSize: 12 }}>{m.time}</div>
          </div>
        ))}
      </div>
      <form onSubmit={send} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" style={{ flex: 1, padding: 10, border: '1px solid #ddd', borderRadius: 8 }} />
        <button type="submit" style={{ padding: '10px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 8 }}>Send</button>
      </form>
    </div>
  );
};

export default Messages;
