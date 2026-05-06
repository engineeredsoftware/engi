import 'openai/shims/node';

import OpenAI from 'openai';

import { supabaseAdmin } from '@bitcode/supabase';
import { log } from '@bitcode/logger';

// ---------------------------------------------------------------------------
// Environment-tunable constants
// ---------------------------------------------------------------------------

const PRE_CONTEXT_MATCH_COUNT = parseInt(process.env.PRE_CONTEXT_PROCUREMENT_COUNT ?? '5', 10);
const POST_CONTEXT_MATCH_COUNT = parseInt(process.env.POST_CONTEXT_PROCUREMENT_COUNT ?? '10', 10);

// ---------------------------------------------------------------------------
// Public API - procurement search over global evidence sources.
// ---------------------------------------------------------------------------

// Export core procurement engine
export { ProcurementEngine } from './core';

// Export advanced matching and analytics
export { AdvancedMatchingEngine } from './matching';
export { ProcurementAnalyticsEngine } from './analytics';
export { AutomatedQualityAssessment } from './quality-assessment';
export { ProcurementNotificationSystem } from './notifications';
export { FraudDetectionEngine } from './fraud-detection';

// Export procurement-specific vectorization functions
export {
  vectorizeSolution,
  batchVectorizeSolutions,
  searchGlobalSolutionsForProcurement,
  searchGlobalSolutionsForIntegration
} from './vectorize';

// Export opt-in and dataset management
export { RepositoryOptInManager, GlobalDatasetManager } from './dataset';

// Export procurement request utilities for pipelines
export { createProcurementRequest, processProcurementInPipeline } from './pipeline-integration';

export type ProcurementTaskContext = {
  description?: string;
  attachments?: Array<{ content?: string } | string>;
};

export async function searchRelevantSolutions(params: {
  organizationId: string;
  repoOwner: string;
  repoName: string;
  repoBranch: string;
  repoCommit: string;
  stage: 'pre-context' | 'post-context';
  count?: number;
  accessLevel?: 'public' | 'premium' | 'private';
  maxBudget?: number;
  categoryFilter?: string;
  taskContext?: ProcurementTaskContext;
}): Promise<Array<{
  id: string;
  title: string;
  description: string;
  content: string;
  provider: string;
  category: string;
  accessLevel: string;
  pricingModel: string;
  estimatedCost: number;
  qualityScore: number;
  rating: number;
  similarity: number;
}>> {
  const {
    organizationId, 
    repoOwner, 
    repoName, 
    repoBranch, 
    repoCommit, 
    stage, 
    count,
    accessLevel = 'public',
    maxBudget,
    categoryFilter,
    taskContext
  } = params;

  log(`searchRelevantSolutions for ${repoOwner}/${repoName}@${repoBranch} (${stage}) - org: ${organizationId}`, 'info');

  // ---------------------------------------------------------------------
  // Build the textual context that will be embedded for similarity search.
  // ---------------------------------------------------------------------

  const contextLines: string[] = [
    `Organization: ${organizationId}`,
    `Repository: ${repoOwner}/${repoName}`,
    `Branch: ${repoBranch}`,
    `Commit: ${repoCommit}`,
    `Stage: ${stage}`,
    `Access Level: ${accessLevel}`
  ];

  if (maxBudget) {
    contextLines.push(`Budget: ${maxBudget}`);
  }

  if (categoryFilter) {
    contextLines.push(`Category: ${categoryFilter}`);
  }

  // Enrich with task and attachments when available.
  if (taskContext?.description) {
    contextLines.push(`Task: ${taskContext.description}`);
  }

  const attachmentContents =
    taskContext?.attachments
      ?.map((attachment) => (typeof attachment === 'string' ? attachment : attachment.content))
      .filter((content): content is string => Boolean(content)) ?? [];

  if (attachmentContents.length > 0) {
    contextLines.push(`Attachments:\n${attachmentContents.join('\n')}`);
  }

  const contextText = contextLines.join('\n');

  try {
    // ---------------------------------------------------------------
    // 1) Embed the textual context
    // ---------------------------------------------------------------
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    const embedRes = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: contextText
    });
    const queryEmbedding = embedRes.data[0].embedding;

    // ---------------------------------------------------------------
    // 2) Decide how many matches to fetch
    // ---------------------------------------------------------------
    const matchCount =
      count ?? (stage === 'pre-context' ? PRE_CONTEXT_MATCH_COUNT : POST_CONTEXT_MATCH_COUNT);

    // ---------------------------------------------------------------
    // 3) Search global solution database via RPC for vector similarity.
    // ---------------------------------------------------------------

    const { data, error } = await supabaseAdmin.rpc('search_global_solutions_for_procurement', {
      query_embedding: queryEmbedding,
      organization_id: organizationId,
      access_levels: [accessLevel],
      match_count: matchCount,
      category_filter: categoryFilter,
      max_budget: maxBudget,
      min_rating: 0.0
    });

    if (error) {
      log('searchRelevantSolutions RPC error', 'error', { error });
      return [];
    }

    return (data || []).map((row: any) => ({
      id: row.solution_id,
      title: row.title,
      description: row.description || '',
      content: row.content,
      provider: row.provider_name,
      category: row.category,
      accessLevel: row.access_level,
      pricingModel: row.pricing_model,
      estimatedCost: row.estimated_cost || 0,
      qualityScore: row.quality_score || 0,
      rating: row.rating_avg || 0,
      similarity: row.similarity
    }));
  } catch (err) {
    log('searchRelevantSolutions failed', 'error', { error: err });
    return [];
  }
}
