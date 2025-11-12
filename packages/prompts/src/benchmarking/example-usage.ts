/**
 * EXAMPLE: How to use integrated benchmarking in doc-comments
 * 
 * This file demonstrates how to write PromptParts and Prompts
 * with integrated Performance-Based Versioning and benchmarking.
 */

import { PromptPart } from '../parts/PromptPart';
import { Prompt } from '../prompt';

// ==================== EXAMPLE 1: New PromptPart ====================

/**
 * @doc-comment-developing-promptpartdevelopment
 * versions: []
 * domain: formatting
 * intent: "Standard AI greeting prefix"
 * 
 * This is a new PromptPart, so no benchmarks yet.
 * After initial benchmarking, it would look like Example 2.
 */
export const PROMPTPART_GENERIC_FORMATTING_YOUARE_V1: PromptPart = 
  'You are' as PromptPart;

// ==================== EXAMPLE 2: Benchmarked PromptPart ====================

/**
 * @doc-comment-developing-promptpartdevelopment
 * versions: []
 * domain: formatting
 * intent: "Standard AI greeting prefix"
 * generation: 1
 * quality_score: 95
 * variant: 0
 * benchmarks: {
 *   semantic_clarity: 0.98,
 *   token_efficiency: 1.0,
 *   model_stability: 0.96
 * }
 * improvements: {
 *   1.95.0: "Initial benchmarked version",
 *   1.95.1: "Tested 'I am' variant - reduced clarity by 12%"
 * }
 */
export const PROMPTPART_GENERIC_FORMATTING_YOUARE: PromptPart = 
  'You are' as PromptPart;

// ==================== EXAMPLE 3: Full Prompt with Dependencies ====================

/**
 * @doc-comment-developing-promptdevelopment
 * versions: []
 * domain: tool
 * intent: "Enable code search functionality"
 * generation: 1
 * quality_score: 88
 * variant: 0
 * benchmarks: {
 *   semantic_clarity: 0.90,
 *   token_efficiency: 0.85,
 *   model_stability: 0.92,
 *   task_success: 0.89,
 *   response_quality: 0.87
 * }
 * dependencies: [
 *   "PROMPTPART_GENERIC_FORMATTING_YOUARE@1.95.0",
 *   "PROMPTPART_SPECIFIC_TOOL_CODESEARCH_PURPOSE@1.86.0"
 * ]
 */
export class CodeSearchToolPrompt extends Prompt {
  constructor() {
    super();
    
    // Build the prompt using benchmarked parts
    this.set('tool:identity', PROMPTPART_GENERIC_FORMATTING_YOUARE);
    this.set('tool:identity:role', 'an expert code search tool' as PromptPart);
    this.set('tool:purpose', 'Search codebase using semantic pattern matching' as PromptPart);
    
    // Set requirements
    this.require('tool:identity');
    this.require('tool:purpose');
  }
}

// ==================== EXAMPLE 4: Evolution Candidate ====================

/**
 * Evolution candidate - testing improved clarity
 * 
 * @doc-comment-developing-promptpartdevelopment
 * versions: []
 * domain: formatting
 * intent: "Improved AI greeting with role clarity"
 * generation: 2  // New generation!
 * quality_score: 0  // Not benchmarked yet
 * variant: 0
 * benchmarks: {
 *   semantic_clarity: 0,
 *   token_efficiency: 0,
 *   model_stability: 0
 * }
 * improvements: {
 *   2.0.0: "Testing 'You are acting as' for improved role clarity"
 * }
 */
export const PROMPTPART_GENERIC_FORMATTING_YOUAREACTINGAS: PromptPart = 
  'You are acting as' as PromptPart;

// ==================== USAGE NOTES ====================

/**
 * WORKFLOW:
 * 
 * 1. Create new PromptPart/Prompt with basic metadata (versions, domain, intent)
 * 2. Run benchmarks to measure quality
 * 3. Update doc-comment with PBV fields (generation, quality_score, variant, benchmarks)
 * 4. When quality drops below 80%, create evolution candidates
 * 5. Benchmark candidates and promote winners
 * 6. Track improvements in the improvements field
 * 
 * QUALITY GATES:
 * - Minimum overall score: 80%
 * - Minimum semantic_clarity: 0.85
 * - Minimum token_efficiency: 0.80
 * - Minimum model_stability: 0.85
 * 
 * EVOLUTION TRIGGERS:
 * - Quality score < 80%
 * - Any metric < 0.85
 * - 30 days since last review
 * - New LLM model available
 */