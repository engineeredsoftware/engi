/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock fetch for initial notifications and PATCH/DELETE calls
global.fetch = jest.fn();

// Mock Supabase client
jest.mock('@bitcode/supabase/ssr/client', () => ({
  createClient: jest.fn()
}));
import { createClient } from '@bitcode/supabase/ssr/client';

import { NotificationsWidget } from '@/components/base/engi/notifications/NotificationsWidget';

describe('NotificationsWidget', () => {
  const mockSupabase = {
    auth: { getUser: jest.fn() },
    channel: jest.fn().mockReturnValue({
      on: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
      subscribe: jest.fn()
    }),
    removeChannel: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
    // Default fetch to return empty list
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => [] });
    // Supabase auth returns a user
    (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null });
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  it('renders bell icon with no badge when no notifications', async () => {
    render(<NotificationsWidget />);
    // Wait for useEffect
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    // No badge
    expect(screen.queryByText(/\d+/)).toBeNull();
  });

  it('renders unread count and dropdown items', async () => {
    const notifications = [
      { id: 'n1', user_id: 'user-1', type: 'foo', message: 'Hello', data: {}, read: false, created_at: '2023-01-01T00:00:00Z' },
      { id: 'n2', user_id: 'user-1', type: 'bar', message: 'World', data: {}, read: true, created_at: '2023-01-02T00:00:00Z' }
    ];
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => notifications });
    render(<NotificationsWidget />);
    // badge shows unread count 1
    expect(await screen.findByText('1')).toBeInTheDocument();
    // Dropdown hidden initially
    expect(screen.queryByText('Hello')).toBeNull();
    // Click bell to open
    fireEvent.click(screen.getByRole('button'));
    // Items appear
    expect(await screen.findByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('sends PATCH request when toggling read status', async () => {
    const notifications = [
      { id: 'n1', user_id: 'user-1', type: 'foo', message: 'Test', data: {}, read: false, created_at: '2023-01-01T00:00:00Z' }
    ];
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => notifications });
    render(<NotificationsWidget />);
    await screen.findByText('Test');
    fireEvent.click(screen.getByRole('button'));
    const markBtn = await screen.findByText('Read');
    fireEvent.click(markBtn);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/orbitals/notifications/n1',
        expect.objectContaining({ method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ read: true })
        })
      );
    });
  });

  it('sends DELETE request when deleting a notification', async () => {
    const notifications = [
      { id: 'n1', user_id: 'user-1', type: 'foo', message: 'DeleteMe', data: {}, read: true, created_at: '2023-01-01T00:00:00Z' }
    ];
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => notifications });
    render(<NotificationsWidget />);
    await screen.findByText('DeleteMe');
    fireEvent.click(screen.getByRole('button'));
    const deleteBtn = await screen.findByText('×');
    fireEvent.click(deleteBtn);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/orbitals/notifications/n1',
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });

  it('shows operator-facing header copy and marks every unread notification as read', async () => {
    const notifications = [
      { id: 'n1', user_id: 'user-1', type: 'proof', message: 'Proof bundle ready', data: {}, read: false, created_at: '2023-01-01T00:00:00Z' },
      { id: 'n2', user_id: 'user-1', type: 'repo', message: 'Repository needs review', data: {}, read: false, created_at: '2023-01-02T00:00:00Z' }
    ];
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => notifications });
    render(<NotificationsWidget />);
    expect(await screen.findByText('2')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('Proofs, repository events, and review prompts')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/orbitals/notifications/n1',
        expect.objectContaining({
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ read: true })
        })
      );
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/orbitals/notifications/n2',
        expect.objectContaining({
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ read: true })
        })
      );
    });
  });
});
