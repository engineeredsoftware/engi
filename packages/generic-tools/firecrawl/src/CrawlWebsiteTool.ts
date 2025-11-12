/**
 * Website crawling tool for recursive content extraction
 * 
 * @doc-code-tool
 * @prompt CRAWL_WEBSITE_DOC_CODE_TOOL_PROMPT
 */

import { Tool } from '@engi/tools-generics';
import { crawlUrl } from '@engi/firecrawl';
import { CRAWL_WEBSITE_DOC_CODE_TOOL_PROMPT } from './prompts/CrawlWebsiteDocCodeToolPrompt';

export class CrawlWebsiteTool extends Tool<typeof crawlUrl> {
  use = crawlUrl;
}

// Export singleton instance
export const crawlWebsiteTool = new CrawlWebsiteTool();