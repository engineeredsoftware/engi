/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Enumerates comprehensive text search capabilities for codebase analysis"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' list all major text search capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Are the capabilities described with technical accuracy? Rate 0-1", "score": 0.50 },
 *   { "name": "performance_emphasis", "test": "Does it emphasize performance and efficiency features? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Recursive text search with regex patterns, case-insensitive matching, result limiting, directory targeting, multi-pattern support, and high-performance content discovery' as PromptPart;