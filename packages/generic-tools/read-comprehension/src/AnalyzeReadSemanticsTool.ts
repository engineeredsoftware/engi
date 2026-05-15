import { Tool } from '@bitcode/tools-generics';
import { ANALYZE_READ_SEMANTICS_DOC_CODE_TOOL_PROMPT } from './prompts/AnalyzeReadSemanticsDocCodeToolPrompt';
import { analyzeReadSemantics } from './read-comprehension-primitives';

/**
 * Canonical Bitcode read-semantics tool owner.
 */

/**
 * @doc-code-tool
 * @prompt ANALYZE_READ_SEMANTICS_DOC_CODE_TOOL_PROMPT
 */
export class AnalyzeReadSemanticsTool extends Tool<typeof analyzeReadSemantics> {
  use = analyzeReadSemantics;
}

export const analyzeReadSemanticsTool = new AnalyzeReadSemanticsTool();
