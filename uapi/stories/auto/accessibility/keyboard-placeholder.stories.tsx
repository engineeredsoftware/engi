import React from 'react';

export default {
  title: 'Docs/AutoScreenshots/Accessibility/KeyboardPlaceholder',
  parameters: { layout: 'centered' },
};

export const KeyboardPlaceholder = {
  render: () => (
    <div style={{
      display: 'flex',
      gap: 32,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: '#0f0f0f',
      minHeight: '100vh',
    }}>
      <button
        autoFocus
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          outline: '2px solid #67feb7',
          outlineOffset: '2px',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          background: '#333333',
          color: '#ffffff',
        }}
      >
        Primary Action
      </button>
      <input
        autoFocus
        placeholder="Type here…"
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          outline: '2px solid #67feb7',
          outlineOffset: '2px',
          border: 'none',
          borderRadius: 4,
          color: '#ffffff',
          background: '#222222',
          width: 200,
        }}
      />
    </div>
  ),
};
