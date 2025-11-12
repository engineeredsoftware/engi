import { callAI DocumentsAPI } from '../app/utils/api-client';

describe('callAI DocumentsAPI', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('sends correct payload with autoSync and autoAlike flags', async () => {
    const mockResponse = { ok: true, body: 'STREAM_BODY' };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    const stream = await callAI DocumentsAPI(
      123,
      'owner',
      'repo',
      'main',
      'abcd',
      'do work',
      'mcp',
      { foo: 'bar' },
      'UTC',
      [],
      true,
      false
    );
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/ai_documents',
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Object),
        body: JSON.stringify(expect.objectContaining({
          autoSync: true,
          autoAlike: false
        }))
      })
    );
    expect(stream).toBe('STREAM_BODY');
  });
});