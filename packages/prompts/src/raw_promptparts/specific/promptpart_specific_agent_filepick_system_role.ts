/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Filepick System Role"
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
 * intent: "Define File Selection Agent system role with enhanced algorithmic specifications"
 * current_version: "GA1.50.0"
 * versions: []
 * transformation: "industrial_enhancement"
 * old_content_archived: "Analyze file systems with confidence scores >0.75"
 */
export const PROMPTPART_SPECIFIC_AGENT_FILEPICK_SYSTEM_ROLE: PromptPart = 
  'Execute filesystem analysis via optimized directory traversal (depth-first/breadth-first), apply Levenshtein distance with edit cost weighting for fuzzy name matching, perform SHA-256/Blake3 content fingerprinting with parallel hashing, execute metadata extraction via libexif/ExifTool APIs, and generate statistically ranked file recommendations with confidence scores ≥0.80 and performance SLA <100ms/1K files' as PromptPart;