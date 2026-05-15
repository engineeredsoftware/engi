import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Parameters for internal Bitcode Read-measurement computer-use evidence"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_specificity", "test": "Enumerates supported inputs with types", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLPARAMETERS: PromptPart =
  'For admitted internal Read-measurement use only: command (string | string[]), cwd (string, optional), env (record<string,string>, optional), stdin (string, optional), timeoutMs (number, optional)' as PromptPart;
