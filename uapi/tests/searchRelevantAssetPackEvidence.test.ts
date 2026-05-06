import { searchRelevantAssetPackEvidence } from '@bitcode/pipeline-asset-pack/src/tools/search';
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

const mockEmbeddingsCreate = jest.fn();
const mockEmbeddingClient = {
  embeddings: {
    create: mockEmbeddingsCreate,
  },
};

jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    rpc: jest.fn(),
  }
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockEmbeddingsCreate.mockReset();
  (supabaseAdmin.rpc as jest.Mock).mockReset();
  delete process.env.BITCODE_ASSET_PACK_EVIDENCE_EMBEDDING_MODEL;
  delete process.env.BITCODE_DEFAULT_EMBEDDING_MODEL;
  process.env.OPENAI_API_KEY = 'fake';
});

describe('searchRelevantAssetPackEvidence', () => {
  it('embeds context and calls RPC with default pre-context count', async () => {
    mockEmbeddingsCreate.mockResolvedValue({ data: [{ embedding: [1, 2] }] });
    (supabaseAdmin.rpc as jest.Mock).mockResolvedValue({
      data: [{ asset_pack_evidence_id: 'ape1', user_id: 'u1', output: 'out1', similarity: 0.2 }],
      error: null,
    });

    const results = await searchRelevantAssetPackEvidence({
      repoOwner: 'o', repoName: 'r', repoBranch: 'b', repoCommit: 'c', stage: 'pre-context', embeddingClient: mockEmbeddingClient
    });

    expect(mockEmbeddingsCreate).toHaveBeenCalledWith({ model: 'text-embedding-ada-002', input: expect.stringContaining('Repository: o/r') });
    expect(supabaseAdmin.rpc).toHaveBeenCalledWith('match_deliverable_vectors', { query_embedding: [1, 2], match_count: 5 });
    expect(results).toEqual([{
      assetPackEvidenceId: 'ape1',
      user_id: 'u1',
      output: 'out1',
      similarity: 0.2,
    }]);
  });

  it('uses count override for post-context', async () => {
    mockEmbeddingsCreate.mockResolvedValue({ data: [{ embedding: [3] }] });
    (supabaseAdmin.rpc as jest.Mock).mockResolvedValue({ data: [], error: null });

    await searchRelevantAssetPackEvidence({ repoOwner: 'o', repoName: 'r', repoBranch: 'b', repoCommit: 'c', stage: 'post-context', count: 2, embeddingClient: mockEmbeddingClient });
    expect(supabaseAdmin.rpc).toHaveBeenCalledWith('match_deliverable_vectors', { query_embedding: [3], match_count: 2 });
  });

  it('allows an injected embedding client without a live provider key', async () => {
    delete process.env.OPENAI_API_KEY;
    process.env.BITCODE_ASSET_PACK_EVIDENCE_EMBEDDING_MODEL = 'bitcode-test-embedding-model';
    mockEmbeddingsCreate.mockResolvedValue({ data: [{ embedding: [9] }] });
    (supabaseAdmin.rpc as jest.Mock).mockResolvedValue({ data: [], error: null });

    await searchRelevantAssetPackEvidence({
      repoOwner: 'o',
      repoName: 'r',
      repoBranch: 'b',
      repoCommit: 'c',
      stage: 'pre-context',
      embeddingClient: mockEmbeddingClient,
    });

    expect(mockEmbeddingsCreate).toHaveBeenCalledWith({
      model: 'bitcode-test-embedding-model',
      input: expect.stringContaining('Repository: o/r'),
    });
    expect(supabaseAdmin.rpc).toHaveBeenCalledWith('match_deliverable_vectors', { query_embedding: [9], match_count: 5 });
  });

  it('returns empty on RPC error', async () => {
    mockEmbeddingsCreate.mockResolvedValue({ data: [{ embedding: [4] }] });
    (supabaseAdmin.rpc as jest.Mock).mockResolvedValue({ data: null, error: new Error('rpc error') });

    const res = await searchRelevantAssetPackEvidence({ repoOwner: 'x', repoName: 'y', repoBranch: 'z', repoCommit: 'w', stage: 'pre-context', embeddingClient: mockEmbeddingClient });
    expect(res).toEqual([]);
  });
});
