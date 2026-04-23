/**
 * Identify Constraints Doc-Code-Tool Prompt compatibility export
 *
 * Bitcode does not have task-first constraint ownership. Canonical Bitcode
 * prompt ownership now lives in `IdentifyNeedConstraintsDocCodeToolPrompt`.
 * This file keeps the compatibility-named exports stable for retained callers.
 */
export {
  IdentifyNeedConstraintsDocCodeToolPrompt as IdentifyConstraintsDocCodeToolPrompt,
  IDENTIFY_NEED_CONSTRAINTS_DOC_CODE_TOOL_PROMPT as IDENTIFY_CONSTRAINTS_DOC_CODE_TOOL_PROMPT
} from './IdentifyNeedConstraintsDocCodeToolPrompt';
