import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Adds Deliverables-specific purpose details for Repository Setup tool"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "industrial_language", "test": "Uses concrete, technical instructions", "score": 0.5 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_REPOSITORYSETUP_DELIVERABLES_PURPOSE_ADDENDUM: PromptPart =
  'Prepare the repository for the retained deliverable-compatibility asset-pack run: provider-agnostic cloning, reliable workspace path generation, readiness for LSP initialization, and downstream discovery/implementation work that synthesizes written assets for shipping delivery mechanisms' as PromptPart;
