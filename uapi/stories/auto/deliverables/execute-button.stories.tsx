/**
 * Source: public-docs/deliverables.md (Execute section)
 * Screenshot: execute-button.png
 */
import React from 'react';

export default {
  title: 'Docs/AutoScreenshots/AssetPackPipeline/ExecuteButton',
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
};

export const ExecuteButton = {
  render: () => (
    <div style={{
      background: '#0f0f0f',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <button style={{
        background: '#10b981',
        color: '#ffffff',
        padding: '12px 24px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
      }}>
        Execute
      </button>
    </div>
  ),
};
