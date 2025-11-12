import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Doc-code-tool parameters description for BeginTransaction helper"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "parameter_completeness", "test": "Does it enumerate every required argument? Rate 0-1", "score": 0.93 },
 *   { "name": "validation_specificity", "test": "Does it tie inputs to transactional behavior? Rate 0-1", "score": 0.92 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLPARAMETERS: PromptPart =
  'Inputs: change list, validation rules, target files, and rollback policy' as PromptPart;
