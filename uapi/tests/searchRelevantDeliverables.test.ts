import { jest } from '@jest/globals';
import { searchRelevantDeliverables } from '@bitcode/pipeline-asset-pack/src/tools/search';
import 'openai/shims/node';
import OpenAI from 'openai';
import { supabaseAdmin } from '@bitcode/supabase';

jest.mock('exa-js', () => {
  return {
    __esModule: true,
    default: class {
      constructor() {}
      async search() { return { results: [] }; }
      async contents() { return { results: [] }; }
    },
  };
});

// Declare mocks with `let` so they are available in the jest.mock factory
// which is hoisted above the variable initialisation.  They are assigned
// concrete `jest.fn()` instances immediately after the mock factory is
// evaluated at runtime.
let mockEmbeddingsCreate: jest.Mock;
let mockRpc: jest.Mock;

jest.mock('openai', () => {
  return class {
    embeddings = { create: mockEmbeddingsCreate };
    constructor() {}
  };
});
// Mock Exa client used inside lib/search to avoid constructor errors in test
jest.mock('exa-js', () => {
  return class {
    constructor(_apiKey: string) {}
    query() { return Promise.resolve({ results: [] }); }
  };
});
jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    // Use a forwarding function so we don't access the `mockRpc` binding until
    // after it has been initialised in the `beforeEach` hook.
    rpc: (...args: any[]) => mockRpc(...args)
  }
}));

beforeEach(() => {
  // Recreate fresh mock functions for every test case
  mockEmbeddingsCreate = jest.fn();
  mockRpc = jest.fn();

  // @ts-ignore – the mocked classes/functions below reference the mutable
  // bindings so we need to reassign them here.
  OpenAI.prototype.embeddings = { create: mockEmbeddingsCreate } as any;
  // @ts-ignore – supabaseAdmin is the mocked object defined above
  supabaseAdmin.rpc = mockRpc;

  jest.clearAllMocks();
  process.env.OPENAI_API_KEY = 'fake';
});

describe('searchRelevantDeliverables', () => {
  it('embeds context and calls RPC with default pre-context count', async () => {
    mockEmbeddingsCreate.mockResolvedValue({ data: [{ embedding: [1, 2] }] });
    mockRpc.mockResolvedValue({ data: [{ deliverable_id: 'd1', user_id: 'u1', output: 'out1', similarity: 0.2 }], error: null });

    const results = await searchRelevantDeliverables({
      repoOwner: 'o', repoName: 'r', repoBranch: 'b', repoCommit: 'c', stage: 'pre-context'
    });

    expect(mockEmbeddingsCreate).toHaveBeenCalledWith({ model: 'text-embedding-ada-002', input: expect.stringContaining('Repository: o/r') });
    expect(mockRpc).toHaveBeenCalledWith('match_deliverable_vectors', { query_embedding: [1, 2], match_count: 5 });
    expect(results).toEqual([{ deliverable_id: 'd1', user_id: 'u1', output: 'out1', similarity: 0.2 }]);
  });

  it('uses count override for post-context', async () => {
    mockEmbeddingsCreate.mockResolvedValue({ data: [{ embedding: [3] }] });
    mockRpc.mockResolvedValue({ data: [], error: null });

    await searchRelevantDeliverables({ repoOwner: 'o', repoName: 'r', repoBranch: 'b', repoCommit: 'c', stage: 'post-context', count: 2 });
    expect(mockRpc).toHaveBeenCalledWith('match_deliverable_vectors', { query_embedding: [3], match_count: 2 });
  });

  it('returns empty on RPC error', async () => {
    mockEmbeddingsCreate.mockResolvedValue({ data: [{ embedding: [4] }] });
    mockRpc.mockResolvedValue({ data: null, error: new Error('rpc error') });

    const res = await searchRelevantDeliverables({ repoOwner: 'x', repoName: 'y', repoBranch: 'z', repoCommit: 'w', stage: 'pre-context' });
    expect(res).toEqual([]);
  });
});
