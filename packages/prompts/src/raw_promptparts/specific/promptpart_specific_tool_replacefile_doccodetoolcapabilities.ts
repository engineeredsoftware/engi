/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Comprehensive capabilities list for replace file tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' cover all key capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_accuracy", "test": "Are all capabilities technically accurate and implementable? Rate 0-1", "score": 0.50 },
 *   { "name": "safety_emphasis", "test": "Does '{{content}}' emphasize safety features appropriately? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Complete file replacement with atomic operations, automatic backup creation before replacement, content validation against file type expectations, rollback capability on failure, transaction ID tracking for multi-file operations, and comprehensive error handling with detailed failure reasons' as PromptPart;