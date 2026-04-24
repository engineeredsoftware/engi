const delegatedGet = jest.fn(async () =>
  new Response(JSON.stringify({ accounts: [{ id: 42, login: 'acme', type: 'User' }] }), { status: 200 }),
);

jest.mock('@bitcode/api/src/routes/shippables', () => ({
  GET: delegatedGet,
  POST: jest.fn(),
  DELETE: jest.fn(),
}));

import { GET } from '@/app/api/executions/route';

describe('GET /api/executions?action=installations', () => {
  beforeEach(() => {
    delegatedGet.mockClear();
  });

  it('delegates the installations request to the canonical executions owner', async () => {
    const req = new Request('http://localhost/api/executions?action=installations');
    const res = await GET(req);

    expect(delegatedGet).toHaveBeenCalledTimes(1);
    expect(delegatedGet).toHaveBeenCalledWith(req);
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      accounts: [{ id: 42, login: 'acme', type: 'User' }],
    });
  });
});
