import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define Create Design Document agent system role with context awareness"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_context_awareness", "test": "Does role leverage execution context effectively?", "score": 0.43 },
 *   { "name": "role_precision", "test": "Is role precisely defined for production?", "score": 0.42 },
 *   { "name": "role_completeness", "test": "Does role utilize accumulated intelligence?", "score": 0.41 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEDESIGNDOCUMENT_SYSTEM_ROLE: PromptPart = 
  'Your role is to transform comprehended requirements and design analysis into well-structured issues, leverage discovery insights for comprehensive specifications, establish clear acceptance criteria from validation patterns, and create issues that guide successful implementation using accumulated intelligence' as PromptPart;