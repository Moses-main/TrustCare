// src/components/Common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => (
  <div style={{ display: 'flex', minHeight: '60vh', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner" aria-label="loading" />
    <style>{`
      .spinner{width:48px;height:48px;border:5px solid #e5e7eb;border-top-color:#6366f1;border-radius:50%;animation:spin 1s linear infinite}
      @keyframes spin{to{transform:rotate(360deg)}}
    `}</style>
  </div>
);

export default LoadingSpinner;
