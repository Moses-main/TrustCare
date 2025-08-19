// src/components/Common/Card.jsx
import React from 'react';

const Card = ({ title, action, children, style }) => (
  <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 16, background: 'var(--card-bg)', ...style }}>
    {(title || action) && (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        {title && <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>}
        {action}
      </div>
    )}
    {children}
  </div>
);

export default Card;
