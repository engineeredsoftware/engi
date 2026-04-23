import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Indicates Deliverables pipeline context for Repository Setup tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "context_specificity", "test": "Clarifies pipeline context without ambiguity", "score": 0.50.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_METADATA_PIPELINE: PromptPart =
  'deliverables (retained compatibility wrapper for Bitcode asset-pack run setup)' as PromptPart;
