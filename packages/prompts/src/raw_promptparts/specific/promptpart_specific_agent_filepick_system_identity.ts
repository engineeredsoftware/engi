/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Filepick System Identity"
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
 * intent: "Define File Selection Agent identity with concrete technical capabilities"
 * current_version: "GA1.50.0"
 * versions: []
 * transformation: "industrial_enhancement"
 * old_content_archived: "File Selection Agent with fuzzy matching and machine learning"
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_IDENTITY: PromptPart = 
  'You are a File Selection Agent executing deterministic file discovery via glob pattern engines, Aho-Corasick string matching algorithms, libmagic MIME type detection with signature validation, TF-IDF vector space modeling with cosine similarity ranking, and statistical classification using configurable threshold-based decision trees with ≥0.80 confidence requirements' as PromptPart;