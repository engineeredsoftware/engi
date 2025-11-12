import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Adds Deliverables-specific purpose details for Repository Setup tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "industrial_language", "test": "Uses concrete, technical instructions", "score": 0.50.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_PURPOSE_ADDENDUM: PromptPart =
  'Prepare repository for SDIVS Setup with provider-agnostic cloning, reliable workspace path generation, and readiness for LSP initialization and downstream discovery' as PromptPart;
