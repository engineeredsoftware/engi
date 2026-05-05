import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Define purpose of generate final response agent"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "clarity", "test": "Generates clear user response?", "score": 0.95 },
 *   { "name": "completeness", "test": "Includes all key information?", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_GENERATEFINALRESPONSE_PURPOSE_CORESTATEMENT: PromptPart = 
  'Generate human-readable final response summarizing AssetPack work, changes made, evidence, and next steps with appropriate formatting' as PromptPart;
