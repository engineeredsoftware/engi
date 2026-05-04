import { Tool } from '@bitcode/tools-generics';
import { ANALYZE_NEED_SEMANTICS_DOC_CODE_TOOL_PROMPT } from './prompts/AnalyzeNeedSemanticsDocCodeToolPrompt';
import { analyzeNeedSemantics } from './need-comprehension-primitives';

/**
 * Canonical Bitcode need-semantics tool owner.
 */

/**
 * @doc-code-tool
 * @prompt ANALYZE_NEED_SEMANTICS_DOC_CODE_TOOL_PROMPT
 */
export class AnalyzeNeedSemanticsTool extends Tool<typeof analyzeNeedSemantics> {
  use = analyzeNeedSemantics;
}

export const analyzeNeedSemanticsTool = new AnalyzeNeedSemanticsTool();
