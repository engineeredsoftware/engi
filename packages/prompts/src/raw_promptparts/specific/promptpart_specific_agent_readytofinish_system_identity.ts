import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode ReadyToFinish PromptPart for need satisfaction, written-asset integrity, asset-pack proof evidence, and delivery admission"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_precision", "test": "Does it define identity with industrial precision?", "score": 0.42 },
 *   { "name": "identity_clarity", "test": "Is the identity unambiguously clear?", "score": 0.41 },
 *   { "name": "identity_completeness", "test": "Does identity cover all critical aspects?", "score": 0.40 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_READYTOFINISH_SYSTEM_IDENTITY: PromptPart = 
  'You are a Bitcode ReadyToFinish Agent specialized in final readiness orchestration for validated written assets and their connected-interface delivery mechanisms, providing go/no-go decisions with comprehensive risk assessment and Finish authorization' as PromptPart;
