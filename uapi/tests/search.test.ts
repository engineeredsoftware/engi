import { searchRelevantAI Documents } from '../lib/search';
import OpenAI from 'openai';
import { supabaseAdmin } from '@bitcode/supabase';

// Mock OpenAI embeddings
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    embeddings: {
      create: jest.fn().mockResolvedValue({
        data: [{ embedding: Array(1536).fill(0.1) }]
      })
    }
  }));
});

// Mock Supabase RPC
jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    rpc: jest.fn().mockResolvedValue({
      data: [
        {
          template_id: 'template-1',
          title: 'AI Document One',
          description: 'First ai_document template',
          content: 'AI Document content here',
          similarity: 0.123
        }
      ],
      error: null
    })
  }
}));

describe('searchRelevantAI Documents', () => {
  it('embeds the query and calls the Supabase RPC to return ai_document suggestions', async () => {
    process.env.OPENAI_API_KEY = 'fake';
    const results = await searchRelevantAI Documents({
      repoOwner: 'owner',
      repoName: 'repo',
      repoBranch: 'branch',
      repoCommit: 'commit',
      stage: 'pre-context'
    });
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      id: 'template-1',
      title: 'AI Document One',
      description: 'First ai_document template',
      content: 'AI Document content here',
      similarity: 0.123
    });
    expect(OpenAI).toHaveBeenCalledWith({ apiKey: 'fake' });
    expect(supabaseAdmin.rpc).toHaveBeenCalledWith(
      'match_ai_document_templates',
      expect.objectContaining({ match_count: expect.any(Number) })
    );
  });
});
