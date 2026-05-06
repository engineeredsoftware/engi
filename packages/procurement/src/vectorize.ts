/**
 * CRITICAL: Global Solution Vectorization Infrastructure for Procurement
 * 
 * This module handles the vectorization of global marketplace solutions
 * to enable procurement pipeline search operations across the global Bitcode dataset.
 * 
 * Key differences from user-scoped Evidence Documents:
 * - Accesses global/community data instead of user-specific data
 * - Includes procurement-specific factors (cost, access, vendor reputation)
 * - Supports marketplace transactions and vendor ratings
 */

import 'openai/shims/node';
import OpenAI from 'openai';
import { supabaseAdmin } from '@bitcode/supabase';
import { log } from '@bitcode/logger';

// ---------------------------------------------------------------------------
// Environment Configuration
// ---------------------------------------------------------------------------

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const EMBEDDING_MODEL = 'text-embedding-ada-002';
const EMBEDDING_DIMENSIONS = 1536;

// ---------------------------------------------------------------------------
// Solution Classification Functions
// ---------------------------------------------------------------------------

/**
 * Categorize solution type for procurement optimization
 */
function categorizeSolutionType(solution: any): 'ai-tools' | 'data-processing' | 'security' | 'infrastructure' | 'integration' | 'framework' | 'other' {
  const solutionType = solution.solution_type?.toLowerCase() || '';
  const title = solution.title?.toLowerCase() || '';
  const content = solution.content || '';
  const category = solution.category?.toLowerCase() || '';
  
  // AI Tools and Machine Learning solutions
  if (category.includes('ai') || 
      title.includes('ai') || 
      title.includes('machine learning') ||
      title.includes('neural') ||
      content.includes('AI Tools') ||
      content.includes('Machine Learning') ||
      content.includes('LLM') ||
      content.includes('OpenAI')) {
    return 'ai-tools';
  }
  
  // Data Processing and Analytics
  if (category.includes('data') ||
      title.includes('data') ||
      title.includes('analytics') ||
      title.includes('processing') ||
      content.includes('Data Processing') ||
      content.includes('Analytics') ||
      content.includes('ETL') ||
      content.includes('Database')) {
    return 'data-processing';
  }
  
  // Security and Compliance
  if (category.includes('security') ||
      title.includes('security') ||
      title.includes('auth') ||
      title.includes('encryption') ||
      content.includes('Security') ||
      content.includes('Authentication') ||
      content.includes('Encryption') ||
      content.includes('SOC2')) {
    return 'security';
  }
  
  // Infrastructure and DevOps
  if (category.includes('infrastructure') ||
      category.includes('devops') ||
      title.includes('infrastructure') ||
      title.includes('deployment') ||
      title.includes('kubernetes') ||
      content.includes('Infrastructure') ||
      content.includes('Kubernetes') ||
      content.includes('Docker') ||
      content.includes('AWS')) {
    return 'infrastructure';
  }
  
  // Integration and APIs
  if (category.includes('integration') ||
      solutionType.includes('integration') ||
      title.includes('integration') ||
      title.includes('api') ||
      content.includes('API Integration') ||
      content.includes('Third-party') ||
      content.includes('Webhook')) {
    return 'integration';
  }
  
  // Frameworks and Libraries
  if (category.includes('framework') ||
      solutionType.includes('framework') ||
      title.includes('framework') ||
      title.includes('library') ||
      content.includes('Framework') ||
      content.includes('Library') ||
      content.includes('SDK')) {
    return 'framework';
  }
  
  return 'other';
}

/**
 * Determine access level based on solution characteristics
 */
function determineAccessLevel(solution: any): 'public' | 'premium' | 'private' {
  const accessLevel = solution.access_level?.toLowerCase();
  if (accessLevel) return accessLevel as 'public' | 'premium' | 'private';
  
  // Infer from pricing model
  const pricingModel = solution.pricing_model?.toLowerCase() || '';
  if (pricingModel === 'free') return 'public';
  if (pricingModel.includes('subscription') || pricingModel.includes('enterprise')) return 'premium';
  
  return 'public'; // Default to public
}

/**
 * Determine pricing model from solution data
 */
function determinePricingModel(solution: any): 'free' | 'one-time' | 'subscription' | 'usage-based' | 'enterprise' {
  const pricingModel = solution.pricing_model?.toLowerCase();
  if (pricingModel) return pricingModel as 'free' | 'one-time' | 'subscription' | 'usage-based' | 'enterprise';
  
  // Infer from other fields
  const content = solution.content || '';
  const title = solution.title?.toLowerCase() || '';
  
  if (content.includes('Free') || title.includes('free')) return 'free';
  if (content.includes('Subscription') || title.includes('subscription')) return 'subscription';
  if (content.includes('Enterprise') || title.includes('enterprise')) return 'enterprise';
  if (content.includes('Usage') || content.includes('Per-use')) return 'usage-based';
  
  return 'one-time'; // Default
}

// ---------------------------------------------------------------------------
// Core Vectorization Functions
// ---------------------------------------------------------------------------

/**
 * Generate embedding vector for solution content
 */
async function generateSolutionEmbedding(content: string): Promise<number[]> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required for vectorization');
  }

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  
  try {
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: content.slice(0, 8000), // Limit to avoid token limits
    });

    return response.data[0].embedding;
  } catch (error) {
    log('Failed to generate embedding for solution content', 'error', { 
      error: error instanceof Error ? error.message : String(error),
      contentLength: content.length 
    });
    throw error;
  }
}

/**
 * Calculate quality score based on solution characteristics
 */
function calculateQualityScore(solution: any, content: string): number {
  let score = 0.0;
  
  // Content quality factor (normalized)
  const contentQuality = Math.min(content.length / 3000, 1.0) * 0.2;
  score += contentQuality;
  
  // Provider reputation (if available)
  const providerRating = solution.provider_rating || 0;
  const providerFactor = (providerRating / 5.0) * 0.3;
  score += providerFactor;
  
  // Usage and adoption indicators
  const usageCount = solution.usage_count || 0;
  const usageFactor = Math.min(usageCount / 100, 1.0) * 0.2;
  score += usageFactor;
  
  // Documentation and example quality
  const hasExamples = content.includes('example') || content.includes('Example');
  const hasDocumentation = content.includes('documentation') || content.includes('docs');
  const docFactor = (hasExamples ? 0.15 : 0) + (hasDocumentation ? 0.15 : 0);
  score += docFactor;
  
  return Math.round(score * 100) / 100; // Round to 2 decimal places
}

/**
 * CRITICAL: Vectorize a single global solution and store in global_solution_vectors table
 */
export async function vectorizeSolution(solutionId: string): Promise<void> {
  try {
    log('Starting solution vectorization', 'info', { solutionId });

    // 1. Fetch the solution from the marketplace/solutions table
    const { data: solution, error: fetchError } = await supabaseAdmin
      .from('marketplace_solutions') // Assuming this table exists or will be created
      .select('*')
      .eq('id', solutionId)
      .single();

    if (fetchError || !solution) {
      throw new Error(`Failed to fetch solution: ${fetchError?.message || 'Not found'}`);
    }

    // 2. Extract content
    const content = solution.content || solution.description || '';
    if (!content || content.length < 10) {
      log('Skipping vectorization: insufficient content', 'warn', { 
        solutionId, 
        contentLength: content.length 
      });
      return;
    }

    // 3. Generate embedding
    const embedding = await generateSolutionEmbedding(content);

    // 4. Calculate quality score
    const qualityScore = calculateQualityScore(solution, content);

    // 5. Categorize solution type
    const solutionCategory = categorizeSolutionType(solution);

    // 6. Determine access level and pricing model
    const accessLevel = determineAccessLevel(solution);
    const pricingModel = determinePricingModel(solution);

    // 7. Prepare enhanced metadata
    const enhancedMetadata = {
      ...solution.metadata || {},
      category: solutionCategory,
      original_solution_type: solution.solution_type,
      vectorized_at: new Date().toISOString(),
      pricing_details: solution.pricing_details || {},
      compatibility: solution.compatibility || [],
      requirements: solution.requirements || []
    };

    const vectorData = {
      solution_id: solutionId,
      provider_id: solution.provider_id,
      title: solution.title || 'Untitled Solution',
      solution_type: solution.solution_type || 'unknown',
      category: solutionCategory,
      access_level: accessLevel,
      pricing_model: pricingModel,
      content: content,
      embedding: JSON.stringify(embedding), // PostgreSQL vector format
      metadata: enhancedMetadata,
      quality_score: qualityScore,
      usage_count: solution.usage_count || 0,
      rating_avg: solution.rating_avg || 0.0,
      updated_at: new Date().toISOString(),
    };

    const { error: upsertError } = await supabaseAdmin
      .from('global_solution_vectors')
      .upsert(vectorData, { 
        onConflict: 'solution_id',
        ignoreDuplicates: false 
      });

    if (upsertError) {
      throw new Error(`Failed to store vector: ${upsertError.message}`);
    }

    log('Solution vectorization completed successfully', 'info', {
      solutionId,
      category: solutionCategory,
      contentLength: content.length,
      qualityScore,
      accessLevel,
      pricingModel,
      embeddingDimensions: embedding.length
    });

  } catch (error) {
    log('Solution vectorization failed', 'error', {
      solutionId,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * CRITICAL: Batch vectorize multiple solutions
 */
export async function batchVectorizeSolutions(solutionIds: string[]): Promise<{
  successful: string[];
  failed: Array<{ solutionId: string; error: string }>;
}> {
  const successful: string[] = [];
  const failed: Array<{ solutionId: string; error: string }> = [];

  log('Starting batch solution vectorization', 'info', { 
    totalSolutions: solutionIds.length 
  });

  for (const solutionId of solutionIds) {
    try {
      await vectorizeSolution(solutionId);
      successful.push(solutionId);
    } catch (error) {
      failed.push({
        solutionId,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  log('Batch solution vectorization completed', 'info', {
    totalSolutions: solutionIds.length,
    successful: successful.length,
    failed: failed.length
  });

  return { successful, failed };
}

/**
 * CRITICAL: Search global solutions for procurement operations
 */
export async function searchGlobalSolutionsForProcurement(params: {
  organizationId: string;
  queryText: string;
  maxResults?: number;
  similarityThreshold?: number;
  accessLevels?: string[];
  categoryFilter?: string;
  maxBudget?: number;
  minRating?: number;
}): Promise<Array<{
  solutionId: string;
  title: string;
  solutionType: string;
  category: string;
  content: string;
  metadata: Record<string, any>;
  accessLevel: string;
  pricingModel: string;
  qualityScore: number;
  ratingAvg: number;
  usageCount: number;
  similarity: number;
  estimatedCost: number;
  providerId: string;
}>> {
  const { 
    organizationId, 
    queryText, 
    maxResults = 10, 
    similarityThreshold = 0.6, 
    accessLevels = ['public'], 
    categoryFilter,
    maxBudget,
    minRating = 0.0
  } = params;

  try {
    // Generate embedding for query
    const queryEmbedding = await generateSolutionEmbedding(queryText);

    // Search using RPC function for global solutions
    const { data, error } = await supabaseAdmin.rpc('search_global_solutions_for_procurement', {
      query_embedding: JSON.stringify(queryEmbedding),
      organization_id: organizationId,
      access_levels: accessLevels,
      match_count: maxResults,
      similarity_threshold: similarityThreshold,
      category_filter: categoryFilter,
      max_budget: maxBudget,
      min_rating: minRating
    });

    if (error) {
      throw new Error(`Procurement search failed: ${error.message}`);
    }

    return (data || []).map((row: any) => ({
      solutionId: row.solution_id,
      title: row.title,
      solutionType: row.solution_type,
      category: row.category,
      content: row.content,
      metadata: row.metadata,
      accessLevel: row.access_level,
      pricingModel: row.pricing_model,
      qualityScore: row.quality_score,
      ratingAvg: row.rating_avg,
      usageCount: row.usage_count,
      similarity: row.similarity,
      estimatedCost: row.estimated_cost || 0,
      providerId: row.provider_id
    }));

  } catch (error) {
    log('Procurement solution search failed', 'error', {
      organizationId,
      queryLength: queryText.length,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * CRITICAL: Search global solutions for integration operations
 */
export async function searchGlobalSolutionsForIntegration(params: {
  organizationId: string;
  queryText: string;
  techStack?: string[];
  maxResults?: number;
  similarityThreshold?: number;
  categoryFilter?: string;
}): Promise<Array<{
  solutionId: string;
  title: string;
  solutionType: string;
  category: string;
  content: string;
  compatibility: string[];
  requirements: string[];
  similarity: number;
  qualityScore: number;
}>> {
  const { 
    organizationId, 
    queryText, 
    techStack = [], 
    maxResults = 10, 
    similarityThreshold = 0.5, 
    categoryFilter = 'integration'
  } = params;

  try {
    // Enhance query with tech stack information
    const enhancedQuery = techStack.length > 0 
      ? `${queryText} Tech Stack: ${techStack.join(', ')}`
      : queryText;

    // Generate embedding for enhanced query
    const queryEmbedding = await generateSolutionEmbedding(enhancedQuery);

    // Search using RPC function focused on integration solutions
    const { data, error } = await supabaseAdmin.rpc('search_integration_solutions', {
      query_embedding: JSON.stringify(queryEmbedding),
      organization_id: organizationId,
      tech_stack: techStack,
      match_count: maxResults,
      similarity_threshold: similarityThreshold,
      category_filter: categoryFilter
    });

    if (error) {
      throw new Error(`Integration search failed: ${error.message}`);
    }

    return (data || []).map((row: any) => ({
      solutionId: row.solution_id,
      title: row.title,
      solutionType: row.solution_type,
      category: row.category,
      content: row.content,
      compatibility: row.compatibility || [],
      requirements: row.requirements || [],
      similarity: row.similarity,
      qualityScore: row.quality_score
    }));

  } catch (error) {
    log('Integration solution search failed', 'error', {
      organizationId,
      queryLength: queryText.length,
      techStackCount: techStack.length,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}
