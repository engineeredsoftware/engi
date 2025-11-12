import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities description for use-computer tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "completeness", "test": "Lists key features (timeout, cwd, env, stdin, stdio capture)", "score": 0.50 },
 *   { "name": "technical_clarity", "test": "Uses concrete technical terms (argv, exitCode)", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_USECOMPUTER_DOCCODETOOLCAPABILITIES: PromptPart =
  'Timeout control, working directory selection, environment overrides, optional stdin input, argv or string command modes, and complete stdio capture with exit code and duration' as PromptPart;
