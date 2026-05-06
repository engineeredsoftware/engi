/**
 * FIRECRAWL TOOLS - MODERN TOOL CLASS ARCHITECTURE
 * 
 * Production-grade web scraping and crawling tools using the new abstract Tool class
 * with DocCodeToolPrompt documentation. Zero old-world patterns, maximum elegance.
 * 
 * ARCHITECTURAL PRINCIPLES:
 * ✅ Abstract Tool class inheritance
 * ✅ DocCodeToolPrompt documentation system
 * ✅ Clean .use = primitiveFunction pattern
 * ✅ Type-safe exports with proper naming
 * ✅ Zero implementation logic in tools
 * ✅ Industry-standard ToolUse/UsedTool terminology
 */

// Import and export individual tools
export { ScrapeUrlTool, scrapeUrlTool } from './ScrapeUrlTool';
export { CrawlWebsiteTool, crawlWebsiteTool } from './CrawlWebsiteTool';
export { SearchWebTool, searchWebTool } from './SearchWebTool';

// TODO: Migrate remaining tools
// export { MapWebsiteTool, mapWebsiteTool } from './MapWebsiteTool';
// export { ExtractStructuredDataTool, extractStructuredDataTool } from './ExtractStructuredDataTool';
// export { BatchScrapeUrlsTool, batchScrapeUrlsTool } from './BatchScrapeUrlsTool';
// export { CrawlDocumentationSiteTool, crawlDocumentationSiteTool } from './CrawlDocumentationSiteTool';
// export { SearchAndAnalyzeTool, searchAndAnalyzeTool } from './SearchAndAnalyzeTool';
// export { CheckFirecrawlHealthTool, checkFirecrawlHealthTool } from './CheckFirecrawlHealthTool';

// Type exports for enhanced type safety
export type { ScrapeUrlTool as ScrapeUrlToolType } from './ScrapeUrlTool';
export type { CrawlWebsiteTool as CrawlWebsiteToolType } from './CrawlWebsiteTool';
export type { SearchWebTool as SearchWebToolType } from './SearchWebTool';

// Re-export types from firecrawl for convenience
export type {
  FirecrawlScrapeOptions,
  FirecrawlCrawlOptions,
  FirecrawlSearchOptions,
  FirecrawlMapOptions,
  FirecrawlExtractOptions,
  FirecrawlBatchOptions,
  FirecrawlPageData,
  FirecrawlResponse,
  FirecrawlCrawlResponse,
  FirecrawlSearchResponse,
  FirecrawlMapResponse,
  FirecrawlBatchResponse
} from '@bitcode/firecrawl';

/**
 * MIGRATION STATUS
 * 
 * ✅ COMPLETED:
 * - ScrapeUrlTool - Single page scraping
 * - CrawlWebsiteTool - Recursive website crawling  
 * - SearchWebTool - Web search with auto-scraping
 * 
 * 🚧 TODO:
 * - MapWebsiteTool - URL discovery without content
 * - ExtractStructuredDataTool - AI-powered data extraction
 * - BatchScrapeUrlsTool - Parallel multi-URL scraping
 * - CrawlDocumentationSiteTool - Documentation-optimized crawling
 * - SearchAndAnalyzeTool - Search with AI analysis
 * - CheckFirecrawlHealthTool - Service health monitoring
 * 
 * Each tool follows the pattern:
 * 1. DocCodeToolPrompt documentation comment
 * 2. Class extending Tool<typeof primitive>
 * 3. use = primitiveFunction (no implementation)
 * 4. Singleton instance export
 * 5. Type export for enhanced type safety
 */
