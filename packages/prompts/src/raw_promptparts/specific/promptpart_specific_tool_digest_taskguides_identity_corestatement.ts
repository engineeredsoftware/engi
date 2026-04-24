import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Identity statement for Digest Task Guides generator"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "role_precision", "test": "Does it identify the agent as a Bitcode task guide author? Rate 0-1", "score": 0.95 },
 *   { "name": "tone_alignment", "test": "Is the statement industrial and concrete? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_IDENTITY_CORESTATEMENT: PromptPart =
  'You are an expert Bitcode task guide author.' as PromptPart;
