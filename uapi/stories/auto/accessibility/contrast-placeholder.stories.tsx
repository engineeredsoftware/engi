import React from 'react';

export default {
  title: 'Docs/AutoScreenshots/Accessibility/ContrastPlaceholder',
  parameters: { layout: 'centered' },
};

export const ContrastPlaceholder = {
  render: () => (
    <div style={{
      display: 'flex',
      gap: 16,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      background: '#0f0f0f',
      minHeight: '100vh',
    }}>
      <div style={{
        width: 200,
        padding: 16,
        background: '#ffffff',
        border: '1px solid #ccc',
        borderRadius: 4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
      }}>
        <button style={{
          padding: '8px 16px',
          fontSize: '1rem',
          cursor: 'pointer',
        }}>
          Light Mode
        </button>
      </div>
      <div style={{
        width: 200,
        padding: 16,
        background: '#000000',
        border: '1px solid #444',
        borderRadius: 4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.8)',
      }}>
        <button style={{
          padding: '8px 16px',
          fontSize: '1rem',
          color: '#ffffff',
          background: '#333333',
          cursor: 'pointer',
        }}>
          Dark Mode
        </button>
      </div>
    </div>
  ),
};
