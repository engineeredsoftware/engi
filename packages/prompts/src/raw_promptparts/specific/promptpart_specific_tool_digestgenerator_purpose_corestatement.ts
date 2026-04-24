import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Purpose statement for Digest Generator doc-code prompt"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_precision", "test": "Does it describe generating precise repository digests for downstream agents? Rate 0-1", "score": 0.95 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGESTGENERATOR_PURPOSE_CORESTATEMENT: PromptPart =
  'Generate precise repository digests for downstream agents.' as PromptPart;
