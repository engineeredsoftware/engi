import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

const mockPush = jest.fn();
const mockOverlayClose = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@/app/conversations/components/ConversationsOverlay', () => ({
  __esModule: true,
  default: ({
    forceOpen,
    forceFullscreen,
    onCloseRequest,
    showFloatingOrb,
  }: {
    forceOpen?: boolean;
    forceFullscreen?: boolean;
    onCloseRequest?: () => void;
    showFloatingOrb?: boolean;
  }) => {
    mockOverlayClose.mockImplementation(() => onCloseRequest?.());
    return (
      <div>
        <div>
          Overlay forceOpen={String(forceOpen)} forceFullscreen={String(forceFullscreen)} floatingOrb=
          {String(showFloatingOrb)}
        </div>
        <button onClick={() => onCloseRequest?.()}>Close overlay</button>
      </div>
    );
  },
}));

import ConversationsRouteClient from '@/app/conversations/ConversationsRouteClient';

describe('ConversationsRouteClient', () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockOverlayClose.mockReset();
  });

  it('renders first-class application-mode copy and returns closed flow to transactions', () => {
    render(<ConversationsRouteClient />);

    expect(screen.getByText('Conversations fullscreen')).toBeTruthy();
    expect(
      screen.getByRole('heading', {
        name: /Keep the chat-based Bitcode read as a first-class application mode\./i,
      }),
    ).toBeTruthy();
    expect(screen.getByRole('link', { name: /Open transactions/i })).toHaveAttribute(
      'href',
      '/application',
    );
    expect(
      screen.getByText(/Overlay forceOpen=true forceFullscreen=true floatingOrb=false/i),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Close overlay' }));

    expect(mockPush).toHaveBeenCalledWith('/application');
  });
});
