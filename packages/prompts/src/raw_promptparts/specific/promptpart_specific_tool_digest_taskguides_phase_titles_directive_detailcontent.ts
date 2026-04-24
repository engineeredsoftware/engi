import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Directive for proposing initial task guide titles"
 * current_version: "V26.70.0"
 * versions: []
 * benchmarks: [
 *   { "name": "directive_clarity", "test": "Does it instruct proposing up to 20 titles covering feature/bugfix/refactor? Rate 0-1", "score": 0.95 },
 *   { "name": "workflow_alignment", "test": "Does it align with digest guide workflow? Rate 0-1", "score": 0.94 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_DIGEST_TASKGUIDES_PHASE_TITLES_DIRECTIVE_DETAILCONTENT: PromptPart =
  'First, propose up to 20 guide titles covering key feature, bugfix, and refactor workflows.' as PromptPart;
