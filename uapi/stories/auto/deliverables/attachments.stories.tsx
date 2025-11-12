/**
 * Source: public-docs/deliverables.md (Attachments & Context section)
 * Screenshot: attachments.png
 */
import React from 'react';
import AttachmentPicker from '@/app/conversations/components/ConversationsAttachmentPicker';

export default {
  title: 'Docs/AutoScreenshots/Deliverables/Attachments',
  parameters: { layout: 'fullscreen' },
};

export const Attachments = {
  render: () => (
    <div style={{
      background: '#0f0f0f',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ width: 800, height: 600 }}>
        <AttachmentPicker
          isOpen
          searchTerm=""
          onSelect={() => {}}
          onClose={() => {}}
          onUpload={() => {}}
        />
      </div>
    </div>
  ),
};
