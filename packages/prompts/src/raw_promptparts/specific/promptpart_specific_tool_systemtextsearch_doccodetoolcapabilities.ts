/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Enumerates bounded repository-evidence search capabilities for Bitcode inference support"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' list all major text search capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Are the capabilities described with technical accuracy? Rate 0-1", "score": 0.50 },
 *   { "name": "performance_emphasis", "test": "Does it emphasize performance and efficiency features? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SYSTEMTEXTSEARCH_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Recursive grep-backed pattern search, multi-pattern evidence collection, case-insensitive matching, working-directory targeting, bounded result limits, and source-line output for read measurement, proof inspection, and AssetPack planning' as PromptPart;
