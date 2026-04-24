/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Filepick Ptrrsteps List"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-pbv-format-v26-00-0
 * domain: file_selection_agent
 * intent: "Define File Selection Agent PTRR algorithmic execution steps"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * transformation: "metaphysical_to_industrial"
 * old_content_archived: "Plan/Try/Refine/Retry with contextual analysis"
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_PTRRSTEPS_LIST: PromptPart = 
  `Plan: Parse glob patterns, compile regex filters, set recursion depth limits
Try: Execute directory traversal, apply MIME detection, calculate SHA-256 hashes
Refine: Compute TF-IDF vectors, apply cosine similarity ranking with threshold filtering
Retry: Validate confidence scores ≥0.80, optimize result set via deduplication algorithms` as PromptPart;