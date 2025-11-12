import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: capabilities
 * intent: "Performance capabilities for Get File Content Tool"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "caching_specificity", "test": "Does it specify caching technologies? Rate 0-1", "score": 0.94 },
 *   { "name": "search_integration", "test": "Are search engines clearly identified? Rate 0-1", "score": 0.92 },
 *   { "name": "parallel_processing", "test": "Are parallel processing methods defined? Rate 0-1", "score": 0.90 }
 * ]
 */
export const PROMPTPART_SPECIFIC_TOOL_GETFILECONTENT_PERFORMANCE_CAPABILITIES: PromptPart = 
  'Content caching with Redis for performance optimization, metadata extraction including file stats and version history, search and indexing with Elasticsearch or Solr, real-time file watching with filesystem events, batch processing capabilities with parallel file operations' as PromptPart;