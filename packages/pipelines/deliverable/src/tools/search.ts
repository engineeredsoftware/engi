/**
 * Deliverable Search Tools (moved from deliverables-generics)
 */
import 'openai/shims/node';
import OpenAI from 'openai';
import { supabaseAdmin } from '@bitcode/supabase';
import { log } from '@bitcode/logger';

const PRE_CONTEXT_DELIVERABLE_COUNT = parseInt(process.env.PRE_CONTEXT_DELIVERABLE_COUNT ?? '5', 10);
const POST_CONTEXT_DELIVERABLE_COUNT = parseInt(process.env.POST_CONTEXT_DELIVERABLE_COUNT ?? '10', 10);

export async function searchRelevantDeliverables(params: {
  repoOwner: string;
  repoName: string;
  repoBranch: string;
  repoCommit: string;
  stage: 'pre-context' | 'post-context';
  count?: number;
}): Promise<Array<{ deliverable_id: string; user_id: string; output: string; similarity: number }>> {
  const { repoOwner, repoName, repoBranch, repoCommit, stage, count } = params;

  log(`searchRelevantDeliverables for ${repoOwner}/${repoName}@${repoBranch} (${stage})`, 'info');

  if (!process.env.OPENAI_API_KEY) {
    log('OPENAI_API_KEY not set, cannot perform deliverable RAG', 'warn');
    return [];
  }

  const contextLines: string[] = [
    `Repository: ${repoOwner}/${repoName}`,
    `Branch: ${repoBranch}`,
    `Commit: ${repoCommit}`,
    `Stage: ${stage}`,
  ];
  const contextText = contextLines.join('\n');

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  const embedRes = await openai.embeddings.create({ model: 'text-embedding-ada-002', input: contextText });
  const queryEmbedding = embedRes.data[0].embedding as any;

  const matchCount = count ?? (stage === 'pre-context' ? PRE_CONTEXT_DELIVERABLE_COUNT : POST_CONTEXT_DELIVERABLE_COUNT);
  const { data, error } = await supabaseAdmin.rpc('match_deliverable_vectors', { query_embedding: queryEmbedding, match_count: matchCount });
  if (error) { log('searchRelevantDeliverables RPC error', 'error', { error }); return [];
  }

  return (data || []).map((row: any) => ({
    deliverable_id: row.deliverable_id,
    user_id: row.user_id,
    output: row.output,
    similarity: row.similarity,
  }));
}

