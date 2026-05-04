/**
 * Source: public-docs/api.md (Per-Run Webhooks section)
 * Screenshot: webhook-placeholder.png
 */
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/prism';

const webhookJson = `{
  "event": "asset_pack.completed",
  "url": "https://yourapp.com/api/webhook",
  "payload": { "run_id": "abcd1234", "status": "completed" }
}`;

export default {
  title: 'Docs/AutoScreenshots/Api/Webhooks',
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
};

export const Webhooks = {
  render: () => (
    <div style={{
      background: '#0f0f0f',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ width: 600, padding: 20, borderRadius: 4, background: '#1a1a1a', overflow: 'auto' }}>
        <SyntaxHighlighter language="json" style={vs2015}>
          {webhookJson}
        </SyntaxHighlighter>
      </div>
    </div>
  ),
};
