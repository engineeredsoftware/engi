import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Identity statement for Digest Code Styles generator"
 * current_version: "GA1.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "identity_clarity", "test": "Does it identify the author as an Engi codebase style expert? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_CODESTYLES_IDENTITY_CORESTATEMENT: PromptPart =
  'You are an expert Engi codebase style author.' as PromptPart;
