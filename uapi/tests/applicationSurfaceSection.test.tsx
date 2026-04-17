import React from 'react';
import { render, screen } from '@testing-library/react';

import ApplicationSurfaceSection from '@/app/application/ApplicationSurfaceSection';

describe('ApplicationSurfaceSection', () => {
  it('renders a shared second-gate section frame', () => {
    render(
      <ApplicationSurfaceSection
        kicker="Frame and orchestration"
        title="Application-owned operator frame"
        summary="Shared section wrapper."
      >
        <div>Section content</div>
      </ApplicationSurfaceSection>,
    );

    expect(screen.getByText('Frame and orchestration')).toBeTruthy();
    expect(screen.getByText('Application-owned operator frame')).toBeTruthy();
    expect(screen.getByText('Shared section wrapper.')).toBeTruthy();
    expect(screen.getByText('Section content')).toBeTruthy();
  });
});
