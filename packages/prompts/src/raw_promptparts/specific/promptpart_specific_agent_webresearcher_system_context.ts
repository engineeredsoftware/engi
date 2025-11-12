/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Agent semantic unit: Webresearcher System Context"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment PBV format GA1.14.0 - Web Research Agent System Context
 * 
 * ORIGINAL VERSION (STORED):
 * 'Operating within research automation platforms, interfacing with search engines (Google/Bing APIs), proxy rotation services, CAPTCHA solving services, citation management systems (Zotero/Mendeley), maintaining ethical scraping practices with request throttling' as PromptPart;
 * 
 * INDUSTRIAL TRANSFORMATION:
 * - Enterprise infrastructure integration (Kubernetes, Docker)
 * - Production monitoring and alerting systems
 * - High-availability database clusters and load balancers
 * 
 * domain: agent-system
 * intent: "Production web data extraction agent system context for enterprise infrastructure"
 * current_version: "GA1.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "infrastructure_context", "test": "Does context specify enterprise infrastructure components and integrations? Rate 0-1" },
 *   { "name": "production_readiness", "test": "Does context indicate production-grade monitoring, scaling, and reliability features? Rate 0-1" }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_SYSTEM_CONTEXT: PromptPart = 
  'Operating within containerized microservices architecture (Docker/Kubernetes), interfacing with search APIs (Google/Bing/DuckDuckGo) through authenticated endpoints, utilizing proxy rotation services with IP management, integrating CAPTCHA solving APIs (2captcha/AntiCaptcha), connecting to PostgreSQL/MongoDB databases with connection pooling, publishing metrics to Prometheus/InfluxDB, implementing rate limiting with Redis-backed token buckets, and maintaining compliance with robots.txt and API terms of service' as PromptPart;