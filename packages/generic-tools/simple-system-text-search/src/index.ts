/**
 * Bitcode repository-evidence search support backed by the retained grep primitive.
 *
 * @purpose Need-directed repository evidence search for measurement, source-grounding, and asset-pack synthesis context inside Bitcode agentic runs.
 * @capabilities Recursive grep-backed pattern search with bounded results, repository-root targeting, case-insensitive matching, and line-level evidence for written-asset planning.
 * @specificity Admitted Bitcode support
 */

import { Tool } from '@bitcode/tools-generics';
import { simpleSystemTextSearch as _simpleSystemTextSearch } from '@bitcode/system-grep';
import {
  BITCODE_REPOSITORY_EVIDENCE_SEARCH_DOC_CODE_TOOL_PROMPT
} from './prompts/BitcodeRepositoryEvidenceSearchDocCodeToolPrompt';

/**
 * @doc-code-tool
 * @prompt BITCODE_REPOSITORY_EVIDENCE_SEARCH_DOC_CODE_TOOL_PROMPT
 * @compatibility simpleSystemTextSearch remains the stable callable wrapper for the retained grep-backed primitive.
 */
class BitcodeRepositoryEvidenceSearchTool extends Tool<typeof _simpleSystemTextSearch> {
  use = _simpleSystemTextSearch;
}

export const simpleSystemTextSearch = new BitcodeRepositoryEvidenceSearchTool();

export type SimpleSystemTextSearchToolFn = typeof simpleSystemTextSearch;
