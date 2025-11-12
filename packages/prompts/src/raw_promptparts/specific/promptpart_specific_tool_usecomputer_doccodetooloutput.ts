import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Output schema description for use-computer tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "schema_clarity", "test": "Defines fields returned by tool clearly", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLOUTPUT: PromptPart =
  'Returns: { exitCode: number | null; stdout: string; stderr: string; durationMs: number }' as PromptPart;
