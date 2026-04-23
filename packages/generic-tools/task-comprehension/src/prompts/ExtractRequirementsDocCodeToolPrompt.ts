/**
 * Extract Requirements Doc-Code-Tool Prompt compatibility export
 *
 * Bitcode does not have task-first requirement ownership. Canonical Bitcode
 * prompt ownership now lives in `ExtractNeedRequirementsDocCodeToolPrompt`.
 * This file keeps the compatibility-named exports stable for retained callers.
 */
export {
  ExtractNeedRequirementsDocCodeToolPrompt as ExtractRequirementsDocCodeToolPrompt,
  EXTRACT_NEED_REQUIREMENTS_DOC_CODE_TOOL_PROMPT as EXTRACT_REQUIREMENTS_DOC_CODE_TOOL_PROMPT
} from './ExtractNeedRequirementsDocCodeToolPrompt';
