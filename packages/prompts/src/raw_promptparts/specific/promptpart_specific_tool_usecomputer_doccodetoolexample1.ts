import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example: list directory contents"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_concreteness", "test": "Concrete CLI example with expected behavior", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLEXAMPLE1: PromptPart =
  'Example: command = ["/bin/ls", "-la"], cwd = "." → returns stdout directory listing and exitCode 0' as PromptPart;
