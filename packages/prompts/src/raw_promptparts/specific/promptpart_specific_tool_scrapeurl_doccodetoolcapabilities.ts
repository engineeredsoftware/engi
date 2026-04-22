/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Capabilities description for scrape URL tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "format_support", "test": "Does '{{content}}' mention multiple content formats (markdown, HTML, screenshot)? Rate 0-1" },
 *   { "name": "extraction_features", "test": "Does '{{content}}' cover metadata and content filtering capabilities? Rate 0-1" },
 *   { "name": "technical_features", "test": "Does '{{content}}' mention authentication and configuration options? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_SCRAPEURL_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Advanced content extraction with markdown/HTML/screenshot formats, OpenGraph and metadata extraction, tag-based filtering for targeted content, main content isolation removing boilerplate, custom headers for authentication, configurable timeouts and wait times, link extraction, and intelligent content cleaning' as PromptPart;