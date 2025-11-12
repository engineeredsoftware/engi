import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Example: command with stdin and timeout"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "example_concreteness", "test": "Demonstrates stdin + timeout behavior", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLEXAMPLE2: PromptPart =
  'Example: command = "cat", stdin = "hello", timeoutMs = 3000 → returns stdout "hello\\n", exitCode 0' as PromptPart;
