import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of create pull request agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "pr_quality", "test": "Creates quality PR descriptions?", "score": 0.95 },
 *   { "name": "completeness", "test": "Includes all PR elements?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_CREATEPULLREQUEST_PURPOSE_CORESTATEMENT: PromptPart = 
  'Create a pull request shipping wrapper for validated written assets with comprehensive description, change summary, test plan, and review checklist following repository conventions' as PromptPart;
