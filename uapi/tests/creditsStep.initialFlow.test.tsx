import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import CreditsStep from '@/app/orbitals/components/OrbitalCredits';

describe('CreditsStep Returning User Flow', () => {
  let fetchMock: jest.Mock;
  beforeEach(() => {
    // Stub API call for usage data and user data
    fetchMock = jest.fn((input: RequestInfo) => {
      if (typeof input === 'string' && input.endsWith('/api/orbitals/data')) {
        return Promise.resolve({ ok: true, json: async () => ({ credits: 200 }) });
      }
      if (typeof input === 'string' && input.startsWith('/api/orbitals/usage')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      return Promise.reject(new Error('Unexpected fetch'));
    });
    (global as any).fetch = fetchMock;
  });
  afterEach(() => {
    jest.restoreAllMocks();
    delete (global as any).fetch;
  });

  it('calls onCompletionStatusChange(true) when user has credits', async () => {
    const onCompletionStatusChange = jest.fn();
    render(
      <CreditsStep
        onSave={() => {}}
        loading={false}
        isFirstTimeUser={false}
        onCompletionStatusChange={onCompletionStatusChange}
        initialCredits={0}
      />
    );
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(onCompletionStatusChange).toHaveBeenCalledWith(true);
  });

  it('calls onCompletionStatusChange(false) when user has zero credits', async () => {
    fetchMock = jest.fn((input: RequestInfo) => {
      if (typeof input === 'string' && input.endsWith('/api/orbitals/data')) {
        return Promise.resolve({ ok: true, json: async () => ({ credits: 0 }) });
      }
      if (typeof input === 'string' && input.startsWith('/api/orbitals/usage')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      return Promise.reject(new Error('Unexpected fetch'));
    });
    (global as any).fetch = fetchMock;
    const onCompletionStatusChange = jest.fn();
    render(
      <CreditsStep
        onSave={() => {}}
        loading={false}
        isFirstTimeUser={false}
        onCompletionStatusChange={onCompletionStatusChange}
        initialCredits={0}
      />
    );
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(onCompletionStatusChange).toHaveBeenCalledWith(false);
  });
});
