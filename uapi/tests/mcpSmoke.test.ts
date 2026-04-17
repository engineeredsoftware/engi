// End-to-end smoke test: generate an API key and call MCP deliverables endpoint with mocks enabled
/**
 * @jest-environment node
 */
// Reset modules and set feature flags before imports
process.env.NEXT_PUBLIC_ENABLE_MOCKS = 'true';
process.env.NEXT_PUBLIC_MOCK_DELIVERABLES = 'true';
jest.resetModules();
// Mock authentication to always succeed
jest.mock('@bitcode/auth', () => ({ authenticateRequest: jest.fn() }));

import deliverablesMock from '@/mocks/deliverables.json';
// Minimal Response polyfill for Node test environment
(global as any).Response = class {
  status: number;
  headers: any;
  private body: string;
  constructor(body: string, init: { status: number; headers: any }) {
    this.body = body;
    this.status = init.status;
    this.headers = init.headers;
  }
  async json() { return JSON.parse(this.body); }
};
// Mock Supabase admin client
jest.mock('@bitcode/supabase', () => ({ supabaseAdmin: { from: jest.fn() } }));
import { supabaseAdmin } from '@bitcode/supabase';
import { authenticateRequest } from '@bitcode/auth';
import { POST as createKey } from '@/app/api/orbitals/api-keys/route';
// Stub internal deliverables handler to avoid TS errors in pipeline modules
jest.mock('@/app/api/executions/route', () => ({
  GET: jest.fn((req: Request) =>
    Promise.resolve(new Response(JSON.stringify(require('@/mocks/deliverables.json')), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }))
  ),
}));
import { GET as mcpGET } from '@/app/api/mcp/deliverables/route';

describe('MCP API E2E Smoke', () => {
  it('should create an API key then fetch deliverables with that key', async () => {
    // Stub authentication for both key creation and MCP call
    const mockAuth = (authenticateRequest as jest.Mock);
    mockAuth.mockResolvedValue({ userId: 'user-1' });
    // Mock supabaseAdmin.from to handle key creation and authentication
    const builderInsert = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { id: 'key-1', key: 'deadbeef' }, error: null }),
    };
    const builderAuth = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { user_id: 'user-1', expire_at: null }, error: null }),
    };
    const fromMock = (supabaseAdmin.from as jest.Mock);
    // First call: create key, second call: auth lookup
    fromMock
      .mockReturnValueOnce(builderInsert)
      .mockReturnValueOnce(builderAuth);

    try {
      // 1) Create API key
      const reqCreate = new Request('http://localhost/api/orbitals/api-keys', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'smoke-test', expireAt: null }),
    });
      const resCreate = await createKey(reqCreate);
      expect(resCreate.status).toBe(201);
      const bodyCreate = await resCreate.json();
      expect(bodyCreate).toHaveProperty('id', 'key-1');
      expect(bodyCreate).toHaveProperty('apiKey', 'deadbeef');

      // 2) Fetch deliverables via MCP with the new key
      const reqGET = new Request('http://localhost/api/mcp/deliverables?owner=x&repo=y', {
        method: 'GET', headers: { Authorization: 'Bearer deadbeef' }
      });
      const resGET = await mcpGET(reqGET);
      expect(resGET.status).toBe(200);
      const bodyGET = await resGET.json();
      // Should match the default mock
      expect(bodyGET).toEqual(deliverablesMock);
      // Ensure auth path was used exactly once
      const fromMock = supabaseAdmin.from as jest.Mock;
      // Only creation path uses supabaseAdmin.from in this test
      expect(fromMock).toHaveBeenCalledTimes(1);
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
});
