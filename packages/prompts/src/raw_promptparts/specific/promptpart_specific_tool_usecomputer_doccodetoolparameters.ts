import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameters description for use-computer tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_specificity", "test": "Enumerates supported inputs with types", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLPARAMETERS: PromptPart =
  'command (string | string[]), cwd (string, optional), env (record<string,string>, optional), stdin (string, optional), timeoutMs (number, optional)' as PromptPart;
