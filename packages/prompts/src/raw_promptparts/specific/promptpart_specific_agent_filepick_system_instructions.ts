/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Filepick System Instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-pbv-format-ga1-00-0
 * domain: file_selection_agent
 * intent: "Define File Selection Agent system instructions with enhanced operational procedures"
 * current_version: "GA1.50.0"
 * versions: []
 * transformation: "industrial_enhancement"
 * old_content_archived: "Execute file selection workflows with confidence ≥0.80"
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute optimized file selection workflows: initiate directory scanning with configurable depth-first/breadth-first traversal algorithms, apply multi-stage filtering (glob patterns → MIME validation → extension verification), calculate relevance vectors using TF-IDF with cosine similarity and weighted scoring, perform SHA-256 duplicate detection with bloom filter optimization, and return JSON-structured file manifests with enriched metadata (size, mtime, permissions, hash) and statistical confidence ≥0.80' as PromptPart;