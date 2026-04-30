import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import ApplicationPreservedShellSurface from '@/app/application/ApplicationPreservedShellSurface';

jest.mock('@bitcode/protocol-demonstration/src/client-entry.js', () => ({
  mountBitcodeApplicationShell: jest.fn(async () => jest.fn()),
  readBitcodeApplicationShellSnapshot: jest.fn(),
  readBitcodeApplicationShellControls: jest.fn(),
}));

const { mountBitcodeApplicationShell } = jest.requireMock(
  '@bitcode/protocol-demonstration/src/client-entry.js',
) as {
  mountBitcodeApplicationShell: jest.Mock;
};

describe('ApplicationPreservedShellSurface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.head.innerHTML = '';
  });

  it('renders the lower-runtime drawer and mount-critical shell elements', async () => {
    render(<ApplicationPreservedShellSurface />);

    expect(
      screen.getByRole('heading', {
        name: 'Open the proof and settlement runtime only when deeper closure detail is required',
      }),
    ).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Open proof and settlement runtime' })).toBeTruthy();
    expect(document.getElementById('bitcodeApplicationRoot')).toBeTruthy();
    expect(document.getElementById('heroEyebrow')).toBeTruthy();
    expect(document.getElementById('flowGuideLayer')).toBeTruthy();
    await waitFor(() => expect(mountBitcodeApplicationShell).toHaveBeenCalledTimes(1));

    const stylesheet = document.getElementById('bitcode-first-gate-stylesheet') as HTMLLinkElement | null;
    expect(stylesheet?.getAttribute('href')).toBe('/application/first-gate-scoped-styles');
  });
});
