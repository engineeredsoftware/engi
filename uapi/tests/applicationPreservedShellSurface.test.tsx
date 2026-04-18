import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationPreservedShellSurface from '@/app/application/ApplicationPreservedShellSurface';

describe('ApplicationPreservedShellSurface', () => {
  it('renders the lower-runtime drawer and mount-critical shell elements', () => {
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
  });
});
