/**
 * System text search and pattern matching with Engi's grep-based recursive analysis engine, regex pattern processing, and high-performance content discovery for comprehensive codebase intelligence gathering
 * 
 * @purpose System text search and pattern matching with Engi's grep-based recursive analysis engine, regex pattern processing, and high-performance content discovery for comprehensive codebase intelligence gathering
 * @capabilities Advanced grep-based recursive text search with regex pattern support, case-insensitive matching, result limiting, directory targeting, and comprehensive file content analysis for intelligent codebase discovery and pattern recognition
 * @specificity Generic
 */

import { Tool } from '@bitcode/tools-generics';
import { simpleSystemTextSearch as _simpleSystemTextSearch } from '@bitcode/system-grep';
import { SIMPLE_SYSTEM_TEXT_SEARCH_DOC_CODE_TOOL_PROMPT } from './prompts/SimpleSystemTextSearchDocCodeToolPrompt';

/**
 * @doc-code-tool
 * @prompt SIMPLE_SYSTEM_TEXT_SEARCH_DOC_CODE_TOOL_PROMPT
 */
class SimpleSystemTextSearchTool extends Tool<typeof _simpleSystemTextSearch> {
  use = _simpleSystemTextSearch;
}

export const simpleSystemTextSearch = new SimpleSystemTextSearchTool();

export type SimpleSystemTextSearchToolFn = typeof simpleSystemTextSearch;
