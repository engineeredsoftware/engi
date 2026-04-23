import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define retry errorhandling for Divide Code Change agent"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "retry_effectiveness", "test": "Does retry errorhandling enable effective execution?", "score": 0.50 },
 *   { "name": "retry_precision", "test": "Is retry errorhandling precisely defined?", "score": 0.50 },
 *   { "name": "retry_completeness", "test": "Is retry errorhandling comprehensive?", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DIVIDECODECHANGE_RETRY_ERRORHANDLING: PromptPart = 
  'Handle division failures through: circular dependency resolution, missing file detection, access permission verification, scope clarification requests, constraint relaxation protocols, partial division acceptance' as PromptPart;