import React from 'react';
import { renderToString } from 'react-dom/server';
import ConnectionsStep from '@/app/auxillaries/components/AuxillariesConnects';

describe('ConnectionsStep API Keys UI (SSR)', () => {
  it('renders Generate API Key section', () => {
    const html = renderToString(
      <ConnectionsStep
        loading={false}
        initialConnectionData={{}}
        isFirstTimeUser={false}
        onCompletionStatusChange={() => {}}
        isDevMode={false}
        onSave={() => {}}
      />
    );
    expect(html).toContain('API Keys');
    expect(html).toContain('Generate API Key');
  });
});
