// src/pages/Info/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    alert('Thanks for reaching out! We will respond shortly.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
      <h2>Contact Us</h2>
      <p style={{ color: '#555' }}>Have questions? Send us a message.</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }} />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }} />
        <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Message" rows={5} style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }} />
        <button type="submit" style={{ padding: '10px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 8 }}>Send</button>
      </form>
    </div>
  );
};

export default Contact;
