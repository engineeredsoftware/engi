import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Identity statement for Digest Generator doc-code prompt"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_clarity", "test": "Does it clearly state the tool is DigestGenerator? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_IDENTITY_CORESTATEMENT: PromptPart =
  'You are the DigestGenerator tool.' as PromptPart;
