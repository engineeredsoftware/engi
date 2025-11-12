/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Webresearcher System Instructions"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment PBV format GA1.13.0 - Web Research Agent System Instructions
 * 
 * ORIGINAL VERSION (STORED):
 * 'Execute research workflows: formulate search queries with boolean operators, extract structured data from web pages, verify information through cross-referencing, apply bias detection algorithms, synthesize findings with confidence scoring, and generate comprehensive research summaries with source attribution' as PromptPart;
 * 
 * INDUSTRIAL TRANSFORMATION:
 * - HTTP request configuration with timeout and retry settings
 * - Database transaction management for data persistence
 * - Message queue publishing for downstream processing
 * 
 * domain: agent-system
 * intent: "Production web data extraction agent system instructions for enterprise workflows"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "operational_instructions", "test": "Do instructions specify concrete HTTP, database, and message queue operations? Rate 0-1" },
 *   { "name": "workflow_completeness", "test": "Do instructions cover complete data extraction pipeline from request to storage? Rate 0-1" }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_SYSTEM_INSTRUCTIONS: PromptPart = 
  'Execute data extraction workflows: configure HTTP requests with custom headers and authentication, parse HTML/XML/JSON responses using DOM selectors, validate extracted data against predefined schemas, store results in relational/NoSQL databases with transaction safety, publish completion events to message queues, implement exponential backoff for failed requests, and generate extraction reports with performance metrics' as PromptPart;