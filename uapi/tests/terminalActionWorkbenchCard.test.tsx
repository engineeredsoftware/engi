import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import TerminalActionWorkbenchCard from '@/app/terminal/TerminalActionWorkbenchCard';

describe('TerminalActionWorkbenchCard', () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView;

  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  afterEach(() => {
    Element.prototype.scrollIntoView = originalScrollIntoView;
    document.body.innerHTML = '';
  });

  it('renders shared metrics, rows, chips, and scroll follow-through', () => {
    const target = document.createElement('div');
    target.id = 'panelDepositing';
    document.body.appendChild(target);

    render(
      <TerminalActionWorkbenchCard
        badge="give"
        title="Repository supply and deposit posture"
        summary="Selected supply is bound to the current give-side path."
        metrics={[
          { label: 'Selected supply', value: '3' },
          { label: 'Auth session', value: 'connected' },
        ]}
        rows={[
          { label: 'Repository', value: 'bitcode/bitcode' },
          { label: 'Issuer', value: 'producer' },
        ]}
        chips={['runbook', 'patch']}
        actionLabel="Open give path"
        actionTarget="panelDepositing"
      />,
    );

    expect(screen.getByText('Repository supply and deposit posture')).toBeTruthy();
    expect(screen.getByText('Selected supply')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByText('Repository')).toBeTruthy();
    expect(screen.getByText('bitcode/bitcode')).toBeTruthy();
    expect(screen.getByText('runbook')).toBeTruthy();
    expect(screen.getByText('patch')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Open give path' }));

    expect(target.scrollIntoView).toHaveBeenCalled();
  });
});
