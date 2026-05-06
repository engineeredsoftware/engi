/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Filepick Tools List"
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
 * intent: "List File Selection Agent tools with concrete filesystem operations"
 * current_version: "V26.50.0"
 * versions: ["V26.00.0"]
 * transformation: "abstract_to_operational"
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_TOOLS_LIST: PromptPart = 
  `- globPatternEngine: Glob pattern compilation with ** recursive wildcard expansion
- tfidfAnalyzer: TF-IDF vector space model with cosine similarity calculations
- mimeTypeDetector: libmagic-based MIME type detection and file signature validation
- dependencyParser: AST parsing for import/require/include statement extraction
- hashingEngine: SHA-256 content fingerprinting for duplicate detection
- parallelProcessor: Thread pool executor for concurrent file I/O operations` as PromptPart;