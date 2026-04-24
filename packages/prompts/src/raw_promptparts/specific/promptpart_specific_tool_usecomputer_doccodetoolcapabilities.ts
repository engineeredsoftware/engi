import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capability limits for internal Bitcode Need-measurement computer-use evidence"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Lists key features (timeout, cwd, env, stdin, stdio capture)", "score": 0.50 },
 *   { "name": "technical_clarity", "test": "Uses concrete technical terms (argv, exitCode)", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLCAPABILITIES: PromptPart =
  'When the internal Need-measurement registry flag admits computer use, the tool supports timeout control, working directory selection, environment overrides, optional stdin input, argv or string command modes, and complete stdio capture with exit code and duration' as PromptPart;
