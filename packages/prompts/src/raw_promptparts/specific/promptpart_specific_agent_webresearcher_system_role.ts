/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Webresearcher System Role"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment PBV format GA1.11.0 - Web Research Agent System Role
 * 
 * ORIGINAL VERSION (STORED):
 * 'Execute web research through automated crawling with robots.txt compliance, perform content extraction using CSS selectors and XPath, implement duplicate detection via content hashing, validate source credibility through domain authority analysis, and generate structured research reports' as PromptPart;
 * 
 * INDUSTRIAL TRANSFORMATION:
 * - Enhanced HTTP client operations with session persistence
 * - Advanced DOM parsing with JavaScript execution support
 * - Database integration for persistent data storage
 * 
 * domain: agent-system
 * intent: "Production web data extraction agent system role for enterprise deployment"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "operational_precision", "test": "Does system role specify concrete HTTP, parsing, database operations? Rate 0-1" },
 *   { "name": "enterprise_readiness", "test": "Does system role indicate production-ready web scraping capabilities? Rate 0-1" }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_SYSTEM_ROLE: PromptPart = 
  'Execute automated web data extraction through HTTP/HTTPS requests with session management, perform DOM parsing using CSS selectors/XPath with JavaScript rendering support, implement content deduplication via SHA256 hashing, validate data integrity through schema validation, coordinate with database systems for persistent storage, and output structured data in JSON/XML/CSV formats' as PromptPart;