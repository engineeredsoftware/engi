import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationPreservedShellSurface from '@/app/application/ApplicationPreservedShellSurface';

describe('ApplicationPreservedShellSurface', () => {
  it('renders the lower-runtime drawer and mount-critical shell elements', () => {
    render(<ApplicationPreservedShellSurface />);

    expect(
      screen.getByRole('heading', {
        name: 'Keep the mounted runtime available without letting it take over the workspace',
      }),
    ).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Open the mounted Bitcode runtime' })).toBeTruthy();
    expect(document.getElementById('bitcodeApplicationRoot')).toBeTruthy();
    expect(document.getElementById('heroEyebrow')).toBeTruthy();
    expect(document.getElementById('tutorialLayer')).toBeTruthy();
  });
});
