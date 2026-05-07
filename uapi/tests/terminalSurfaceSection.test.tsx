import React from 'react';
import { render, screen } from '@testing-library/react';

import TerminalSurfaceSection from '@/app/terminal/TerminalSurfaceSection';

describe('TerminalSurfaceSection', () => {
  it('renders a shared Terminal section frame', () => {
    render(
      <TerminalSurfaceSection
        kicker="Frame and orchestration"
        title="Terminal-owned operator frame"
        summary="Shared section wrapper."
      >
        <div>Section content</div>
      </TerminalSurfaceSection>,
    );

    expect(screen.getByText('Frame and orchestration')).toBeTruthy();
    expect(screen.getByText('Terminal-owned operator frame')).toBeTruthy();
    expect(screen.getByText('Shared section wrapper.')).toBeTruthy();
    expect(screen.getByText('Section content')).toBeTruthy();
  });
});
