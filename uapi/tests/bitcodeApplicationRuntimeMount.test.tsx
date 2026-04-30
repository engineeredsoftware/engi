import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor } from '@testing-library/react';

import BitcodeApplicationRuntimeMount from '@/app/application/BitcodeApplicationRuntimeMount';

jest.mock('@bitcode/protocol-demonstration/src/client-entry.js', () => ({
  mountBitcodeApplicationShell: jest.fn(async () => jest.fn()),
}));

const { mountBitcodeApplicationShell } = jest.requireMock(
  '@bitcode/protocol-demonstration/src/client-entry.js',
) as {
  mountBitcodeApplicationShell: jest.Mock;
};

describe('BitcodeApplicationRuntimeMount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.head.innerHTML = '';
  });

  it('defaults to the scoped runtime stylesheet so demo CSS cannot leak into the app page', async () => {
    const { unmount } = render(<BitcodeApplicationRuntimeMount />);

    await waitFor(() => expect(mountBitcodeApplicationShell).toHaveBeenCalledTimes(1));

    const stylesheet = document.getElementById('bitcode-first-gate-stylesheet') as HTMLLinkElement | null;
    expect(stylesheet?.getAttribute('href')).toBe('/application/first-gate-scoped-styles');

    unmount();
  });

  it('injects the requested stylesheet and mounts the built shell bundle', async () => {
    const cleanup = jest.fn();
    mountBitcodeApplicationShell.mockResolvedValueOnce(cleanup);

    const { unmount } = render(
      <BitcodeApplicationRuntimeMount
        className="test-runtime-host"
        stylesheetId="test-first-gate-stylesheet"
        stylesheetHref="/application/first-gate-scoped-styles"
      />,
    );

    await waitFor(() => expect(mountBitcodeApplicationShell).toHaveBeenCalledTimes(1));

    const stylesheet = document.getElementById('test-first-gate-stylesheet') as HTMLLinkElement | null;
    expect(stylesheet).toBeTruthy();
    expect(stylesheet?.rel).toBe('stylesheet');
    expect(stylesheet?.getAttribute('href')).toBe('/application/first-gate-scoped-styles');
    expect(document.getElementById('bitcodeApplicationRoot')).toHaveClass('test-runtime-host');
    expect(document.getElementById('bitcodeApplicationRoot')).toHaveAttribute(
      'data-bitcode-runtime-host',
      'built-embedded',
    );

    unmount();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(document.getElementById('test-first-gate-stylesheet')).toBeNull();
  });
});
