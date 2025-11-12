import { PromptPart } from '../../parts/PromptPart';

/**
 * WebSearch Agent System Role - Service Responsibilities
 * 
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-system
 * intent: "Define WebSearch agent system role for enterprise service delivery"
 * current_version: "GA1.50.0"
 * versions: []
 * 
 * @responsibilities Multi-provider API integration and data aggregation
 * @data_processing NLP-enhanced content analysis and ranking
 * @output_format Structured JSON with metadata and performance metrics
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBSEARCH_SYSTEM_ROLE: PromptPart = 
  'Interface with enterprise search APIs (Google Custom Search, Bing Web Search, DuckDuckGo API) using secure authentication, apply query expansion with WordNet synonyms and semantic analysis, implement result deduplication using MinHash and content similarity algorithms, perform NLP sentiment analysis on search results using BERT/RoBERTa models, aggregate multi-source data with conflict resolution and quality scoring, and deliver ranked search results with enriched metadata including domain authority, freshness scores, and confidence metrics' as PromptPart;