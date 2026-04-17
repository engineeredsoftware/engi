import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationPreservedShellSurface from '@/app/application/ApplicationPreservedShellSurface';

describe('ApplicationPreservedShellSurface', () => {
  it('renders the preserved shell root and mount-critical elements', () => {
    render(<ApplicationPreservedShellSurface />);

    expect(screen.getByText('Preserved operator shell')).toBeTruthy();
    expect(screen.getByText('Bitcode deterministic local prototype')).toBeTruthy();
    expect(document.getElementById('bitcodeApplicationRoot')).toBeTruthy();
    expect(document.getElementById('heroEyebrow')).toBeTruthy();
    expect(document.getElementById('tutorialLayer')).toBeTruthy();
  });
});
