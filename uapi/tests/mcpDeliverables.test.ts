// Mock internal deliverables route to avoid loading pipeline modules
jest.mock('@/app/api/executions/route', () => ({ GET: jest.fn(), POST: jest.fn() }));
import { GET, POST } from '@/app/api/mcp/deliverables/route';
import { authenticateRequest } from '@bitcode/auth';
const internal = jest.requireMock('@/app/api/executions/route') as { GET: jest.Mock; POST: jest.Mock };

jest.mock('@bitcode/auth');
// authenticateRequest mocked above
const mockAuth = authenticateRequest as jest.Mock;
const mockInternalGET = internal.GET;
const mockInternalPOST = internal.POST;

describe('MCP Deliverables API Proxy', () => {
  beforeEach(() => jest.resetAllMocks());

  it('GET returns 401 when auth fails', async () => {
    mockAuth.mockResolvedValueOnce(new Response(null, { status: 401 }));
    const res = await GET(new Request('http://localhost'));
    expect(res.status).toBe(401);
    expect(mockInternalGET).not.toHaveBeenCalled();
  });

  it('GET calls internal GET when auth succeeds', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'u1' });
    const fake = new Response('ok', { status: 200 });
    mockInternalGET.mockResolvedValueOnce(fake);
    const res = await GET(new Request('http://localhost'));
    expect(res).toBe(fake);
    expect(mockInternalGET).toHaveBeenCalled();
  });

  it('POST returns 401 when auth fails', async () => {
    mockAuth.mockResolvedValueOnce(new Response(null, { status: 401 }));
    const res = await POST(new Request('http://localhost', { method: 'POST' }));
    expect(res.status).toBe(401);
    expect(mockInternalPOST).not.toHaveBeenCalled();
  });

  it('POST calls internal POST when auth succeeds', async () => {
    mockAuth.mockResolvedValueOnce({ userId: 'u1' });
    const fake = new Response('created', { status: 201 });
    mockInternalPOST.mockResolvedValueOnce(fake);
    const res = await POST(new Request('http://localhost', { method: 'POST' }));
    expect(res).toBe(fake);
    expect(mockInternalPOST).toHaveBeenCalled();
  });
});