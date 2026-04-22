/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Core purpose statement for replace file tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain what the tool does? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Does '{{content}}' use precise technical language? Rate 0-1", "score": 0.50 },
 *   { "name": "atomic_operation_focus", "test": "Does '{{content}}' emphasize atomic operation guarantees? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_REPLACEFILE_DOCCODETOOLPURPOSE: PromptPart = 
  'Atomically replace entire file contents with validation, backup creation, and rollback capability for safe file content management' as PromptPart;