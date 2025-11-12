/**
 * Source: public-docs/api.md (Built-in Rate Limiting section)
 * Screenshot: ratelimit-placeholder.png
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';

const rateLimitMd = `
| Plan      | Requests / min | Burst |
|-----------|----------------|-------|
| Free      | 30             | 60    |
| Starter   | 60             | 120   |
| Growth    | 120            | 240   |
| Enterprise | Custom        | Custom|
`;

export default {
  title: 'Docs/AutoScreenshots/Api/RateLimiting',
  parameters: { layout: 'centered', backgrounds: { default: 'dark' } },
};

export const RateLimit = {
  render: () => (
    <div style={{
      background: '#0f0f0f',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ width: 600, padding: 20, borderRadius: 4, background: '#1a1a1a' }}>
        <ReactMarkdown>{rateLimitMd}</ReactMarkdown>
      </div>
    </div>
  ),
};
