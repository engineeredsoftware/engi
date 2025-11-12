/**
 * Source: public-docs/ui-deliverables.md (Composer Tabs)
 * Screenshot: composer-tabs.png
 */
import React from 'react';
import { Tab } from '@headlessui/react';

export default {
  title: 'Docs/AutoScreenshots/Ui/Deliverables/Composer',
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
};

export const Composer = {
  render: () => (
    <div style={{
      background: '#0f0f0f',
      width: '100vw',
      height: '100vh',
      padding: 40,
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: 600,
        margin: '0 auto',
        background: '#1a1a1a',
        borderRadius: 4,
        padding: 16,
      }}>
        <Tab.Group>
          <Tab.List style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['Info','DoD','Sources','Gaps','Preview'].map(label => (
              <Tab key={label} style={{
                padding: '8px 16px',
                background: '#333333',
                color: '#ffffff',
                borderRadius: 4,
                cursor: 'pointer',
              }}>
                {label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel style={{ color: '#ffffff' }}>Info content</Tab.Panel>
            <Tab.Panel style={{ color: '#ffffff' }}>DoD editor</Tab.Panel>
            <Tab.Panel style={{ color: '#ffffff' }}>Sources UI</Tab.Panel>
            <Tab.Panel style={{ color: '#ffffff' }}>Gaps list</Tab.Panel>
            <Tab.Panel style={{ color: '#ffffff' }}>Preview diff</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  ),
};
