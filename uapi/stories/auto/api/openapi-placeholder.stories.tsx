/**
 * Source: public-docs/api.md (OpenAPI-first section)
 * Screenshot: openapi-placeholder.png
 */
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import spec from '../../../public-docs/api/openapi.yaml';

export default {
  title: 'Docs/AutoScreenshots/Api/OpenAPI',
  parameters: { layout: 'fullscreen' },
};

export const OpenAPI = {
  render: () => (
    <div style={{
      background: '#0f0f0f',
      width: '100vw',
      height: '100vh',
      padding: 24,
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '80%',
        height: '80%',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: 4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
        overflow: 'auto',
      }}>
        <SwaggerUI spec={spec} />
      </div>
    </div>
  ),
};
