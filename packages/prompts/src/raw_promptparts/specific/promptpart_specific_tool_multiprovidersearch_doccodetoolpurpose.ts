/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose statement for multi-provider search tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_clarity", "test": "Does '{{content}}' clearly explain the tool's purpose? Rate 0-1", "score": 0.50 },
 *   { "name": "failover_mention", "test": "Does '{{content}}' indicate automatic failover capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "aggregation_clarity", "test": "Does '{{content}}' explain result aggregation across providers? Rate 0-1", "score": 0.50 }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_MULTIPROVIDERSEARCH_DOCCODETOOLPURPOSE: PromptPart = 
  'Multi-provider search orchestration with automatic failover, result aggregation, and provider selection optimization for enterprise-grade information discovery' as PromptPart;