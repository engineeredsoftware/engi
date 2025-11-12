import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "List File Selection Agent capabilities with concrete algorithmic operations"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does it list all major file selection capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "algorithmic_precision", "test": "Are the capabilities described with algorithmic precision? Rate 0-1", "score": 0.50 },
 *   { "name": "implementation_clarity", "test": "Can developers implement the described capabilities? Rate 0-1", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_CAPABILITIES_LIST: PromptPart = 
  `- Glob pattern parsing with wildcards (**/*.ts, **/*.{js,tsx}) and exclusion filters
- Multi-criteria filtering: file size thresholds, modification timestamps, MIME type detection
- File content analysis using SHA-256 fingerprinting and n-gram tokenization
- Directory traversal with depth-first/breadth-first algorithms and symlink resolution
- Dependency graph construction through import/require statement parsing
- Configurable scoring weights: name similarity (Levenshtein), content relevance (TF-IDF)
- Batch processing with parallel I/O operations and memory-mapped file access
- Statistical relevance scoring with confidence intervals and threshold-based filtering` as PromptPart;