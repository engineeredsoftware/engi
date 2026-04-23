/**
 * Generate Success Criteria Doc-Code-Tool Prompt compatibility export
 *
 * Bitcode does not have task-first success semantics. Canonical Bitcode prompt
 * ownership now lives in `GenerateNeedSatisfactionCriteriaDocCodeToolPrompt`.
 * This file keeps the compatibility-named exports stable for retained callers.
 */
export {
  GenerateNeedSatisfactionCriteriaDocCodeToolPrompt as GenerateSuccessCriteriaDocCodeToolPrompt,
  GENERATE_NEED_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT as GENERATE_SUCCESS_CRITERIA_DOC_CODE_TOOL_PROMPT
} from './GenerateNeedSatisfactionCriteriaDocCodeToolPrompt';
