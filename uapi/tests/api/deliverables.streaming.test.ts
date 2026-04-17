/**
 * @jest-environment node
 *
 * Integration test for POST /api/executions route: reads the server-sent event stream
 * and asserts that the final completion event includes an "ai_documents" array.
 */

// Mocks for dependency modules
import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';
import { deductCredits } from '@bitcode/credits';
import { runSDIVSPipeline } from '@bitcode/engine/pipeline';
import { getGlobalContext, initializeContext } from '@bitcode/context';

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(),
}));

jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: { from: jest.fn() },
}));

jest.mock('@bitcode/credits', () => ({
  deductCredits: jest.fn(),
}));

jest.mock('@bitcode/engine/pipeline', () => ({
  runSDIVSPipeline: jest.fn(),
}));

jest.mock('@bitcode/context', () => ({
  initializeContext: jest.fn(),
  getGlobalContext: jest.fn(),
}));
// Mock Git integration modules to avoid loading ESM dependencies
jest.mock('@bitcode/git/git', () => ({
  getInstallationAccounts: jest.fn().mockResolvedValue({ login: 'owner', type: 'User' }),
  getAllRepositories: jest.fn().mockResolvedValue([]),
  getAllBranches: jest.fn().mockResolvedValue([]),
  getAllCommits: jest.fn().mockResolvedValue([]),
  getRepository: jest.fn().mockResolvedValue({}),
  createGitHubJWT: jest.fn(),
  getAllInstallations: jest.fn().mockResolvedValue([]),
  getRepositoryIssues: jest.fn().mockResolvedValue([]),
}));
// Mock Octokit to prevent importing ESM module
jest.mock('@/octokit', () => ({ app: {} }));

// Helper to read full text from a ReadableStream in a Response
async function readStream(res: Response): Promise<string> {
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let out = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value);
  }
  return out;
}

describe('/api/executions POST (streaming)', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Base cost for deliverables model
    process.env.DELIVERABLE_BASE_COST = '100';
  });

  it('returns a stream where the completion event includes ai_documents', async () => {
    // Stub authenticated user
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user123' } }, error: null })
      }
    });
    // Stub credit deduction
    (deductCredits as jest.Mock).mockResolvedValue(50);

    // Stub Supabase admin calls for run creation and other tables
    const runId = 'run-abc';
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'executions') {
        // Builder for chaining insert().select().single(), and update().eq()
        return {
          insert: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: { id: runId }, error: null }),
          update: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
        };
      }
      // Default stub for other tables: insert/update return a resolved promise
      return {
        insert: jest.fn().mockResolvedValue({ data: [], error: null }),
        update: jest.fn().mockResolvedValue({ data: [], error: null }),
      };
    });

    // Stub pipeline result and discovery context
    const dummyResult = { summary: 'ok' };
    (runSDIVSPipeline as jest.Mock).mockResolvedValue(dummyResult);
    const expectedAI Documents = ['ai_document1', 'ai_document2'];
    (getGlobalContext as jest.Mock).mockReturnValue({
      getLatestDiscovery: () => ({ data: { ai_documentIds: expectedAI Documents } })
    });

    // Import the POST handler after setting up mocks
    const { POST } = await import('@/app/api/executions/route');

    // Build request matching the route schema
    const payload = {
      task: 'generate deliverable',
      repoOwner: 'owner',
      repoName: 'repo',
      repoBranch: 'main',
      repoCommit: 'abcdef',
      issueNumber: null,
      attachments: [],
      modelProvider: 'test',
      modelId: 'model'
    };
    const req = new Request('http://localhost/api/executions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    // Read the entire SSE stream
    const text = await readStream(res);
    // Extract and parse SSE messages
    const messages = text
      .split('\n')
      .filter(line => line.startsWith('data: '))
      .map(line => JSON.parse(line.replace(/^data: /, '')));

    // Find and assert the completion event
    const completion = messages.find(msg => msg.type === 'completion');
    expect(completion).toBeDefined();
    expect(completion!.result.ai_documents).toEqual(expectedAI Documents);
  });
});
