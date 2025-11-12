/**
 * Source: public-docs/deliverables.md (Save as Template section)
 * Screenshot: save-template.png
 */
import React from 'react';
// Inline stub to avoid external dependency
const SaveTemplateModal = ({ isOpen, defaultName, onSave }: any) => (
  isOpen ? (
    <div style={{ padding: 24, border: '1px solid #444', borderRadius: 8, background: '#111', color: '#ddd' }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Save Template</div>
      <div style={{ marginBottom: 12 }}>Name: {defaultName}</div>
      <button onClick={onSave} style={{ background: '#4ade80', color: '#111', padding: '6px 12px', borderRadius: 6 }}>Save</button>
    </div>
  ) : null
);

export default {
  title: 'Docs/AutoScreenshots/Deliverables/SaveTemplate',
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
};

export const SaveTemplate = {
  render: () => (
    <div style={{
      background: '#0f0f0f',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <SaveTemplateModal
        isOpen
        defaultName="Feature PR • Backend"
        onSave={() => {}}
      />
    </div>
  ),
};
