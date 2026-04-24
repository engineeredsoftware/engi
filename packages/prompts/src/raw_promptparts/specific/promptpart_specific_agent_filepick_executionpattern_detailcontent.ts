/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Filepick Executionpattern Detailcontent"
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
 * intent: "Define File Selection Agent execution pattern with concrete algorithmic operations"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * transformation: "metaphysical_to_industrial"
 * old_content_archived: "CONTEXTUAL_SELECTION with intelligent analysis"
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_EXECUTIONPATTERN_DETAILCONTENT: PromptPart = 
  `FILE_SELECTION_ALGORITHM - Executes deterministic file selection through concrete operations:
1. Parse glob patterns and compile regex filters from user input
2. Execute depth-first directory traversal with configurable recursion limits
3. Apply MIME type detection and file extension matching algorithms
4. Calculate TF-IDF relevance scores with cosine similarity ranking
5. Perform SHA-256 content hashing for duplicate detection and deduplication
6. Generate ordered file manifests with confidence scores ≥0.80 and metadata output` as PromptPart;