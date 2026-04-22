/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Name for single-URL scraping tool"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "name_clarity", "test": "Does '{{content}}' clearly indicate URL scraping? Rate 0-1", "score": 0.5 },
 *   { "name": "granularity", "test": "Does '{{content}}' imply single-URL focus (not site-wide)? Rate 0-1", "score": 0.5 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';
export const PROMPTPART_SPECIFIC_TOOL_SCRAPEURL_DOCCODETOOLNAME: PromptPart =
  'Scrape URL Tool' as PromptPart;
