/**
 * Web search with automatic content extraction
 * 
 * @doc-code-tool
 * @prompt SEARCH_WEB_DOC_CODE_TOOL_PROMPT
 */

import { Tool } from '@engi/tools-generics';
import { searchWeb } from '@engi/firecrawl';
import { SEARCH_WEB_DOC_CODE_TOOL_PROMPT } from './prompts/SearchWebDocCodeToolPrompt';

export class SearchWebTool extends Tool<typeof searchWeb> {
  use = searchWeb;
}

// Export singleton instance
export const searchWebTool = new SearchWebTool();