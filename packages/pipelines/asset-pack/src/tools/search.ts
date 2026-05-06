/**
 * AssetPack evidence search for discovery-phase source-to-shares context.
 */
import { supabaseAdmin } from '@bitcode/supabase';
import { log } from '@bitcode/logger';
import 'openai/shims/node';
import OpenAI from 'openai';

const PRE_CONTEXT_ASSET_PACK_EVIDENCE_COUNT = parseInt(
  process.env.BITCODE_PRE_CONTEXT_ASSET_PACK_EVIDENCE_COUNT ?? '5',
  10
);
const POST_CONTEXT_ASSET_PACK_EVIDENCE_COUNT = parseInt(
  process.env.BITCODE_POST_CONTEXT_ASSET_PACK_EVIDENCE_COUNT ?? '10',
  10
);

export interface AssetPackEvidenceEmbeddingClient {
  embeddings: {
    create(params: { model: string; input: string }): Promise<{ data: Array<{ embedding: unknown }> }>;
  };
}

export async function searchRelevantAssetPackEvidence(params: {
  repoOwner: string;
  repoName: string;
  repoBranch: string;
  repoCommit: string;
  stage: 'pre-context' | 'post-context';
  count?: number;
  embeddingClient?: AssetPackEvidenceEmbeddingClient;
}): Promise<Array<{
  assetPackEvidenceId: string;
  user_id: string;
  output: string;
  similarity: number;
}>> {
  const { repoOwner, repoName, repoBranch, repoCommit, stage, count, embeddingClient } = params;

  log(`searchRelevantAssetPackEvidence for ${repoOwner}/${repoName}@${repoBranch} (${stage})`, 'info');

  if (!process.env.OPENAI_API_KEY) {
    log('OPENAI_API_KEY not set, cannot perform AssetPack evidence search', 'warn');
    return [];
  }

  const contextLines: string[] = [
    `Repository: ${repoOwner}/${repoName}`,
    `Branch: ${repoBranch}`,
    `Commit: ${repoCommit}`,
    `Stage: ${stage}`,
  ];
  const contextText = contextLines.join('\n');

  const embeddings = embeddingClient ?? new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const embedRes = await embeddings.embeddings.create({ model: 'text-embedding-ada-002', input: contextText });
  const queryEmbedding = embedRes.data[0].embedding as any;

  const matchCount =
    count ??
    (stage === 'pre-context'
      ? PRE_CONTEXT_ASSET_PACK_EVIDENCE_COUNT
      : POST_CONTEXT_ASSET_PACK_EVIDENCE_COUNT);
  // Physical RPC name is retained Exchange storage detail; public code returns AssetPack evidence.
  const { data, error } = await supabaseAdmin.rpc('match_deliverable_vectors', { query_embedding: queryEmbedding, match_count: matchCount });
  if (error) { log('searchRelevantAssetPackEvidence RPC error', 'error', { error }); return [];
  }

  return (data || []).map((row: any) => ({
    assetPackEvidenceId: row.asset_pack_evidence_id || row.deliverable_id,
    user_id: row.user_id,
    output: row.output,
    similarity: row.similarity,
  }));
}
