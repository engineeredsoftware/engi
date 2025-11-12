import React from 'react';

export default {
  title: 'Docs/AutoScreenshots/Accessibility/ScreenreaderPlaceholder',
  parameters: { layout: 'centered' },
};

export const ScreenreaderPlaceholder = {
  render: () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: '#0f0f0f',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: 'sans-serif',
      gap: '16px',
    }}>
      <button
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          background: '#67feb7',
          color: '#000000',
        }}
      >
        Run Deliverable
      </button>
      <div
        role="status"
        aria-live="polite"
        style={{
          border: '1px dashed #67feb7',
          padding: 12,
          borderRadius: 4,
          width: 300,
          textAlign: 'center',
          background: '#1a1a1a',
        }}
      >
        Deliverable complete
      </div>
    </div>
  ),
};
