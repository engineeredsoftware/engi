import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Bitcode Read-measurement purpose statement for internal use-computer tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_actionability", "test": "Can an LLM understand exactly when and why to use this tool?", "score": 0.50 },
 *   { "name": "integration_context", "test": "Explains shell execution with timeout and stdio capture", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLPURPOSE: PromptPart =
  'Provide internal, feature-flagged computer-use evidence for Bitcode Read measurement by executing bounded shell commands and returning stdout, stderr, exit code, and duration; broad computer-using agents are deferred beyond V26' as PromptPart;
