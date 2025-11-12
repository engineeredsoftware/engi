/**
 * WEB SEARCH TOOLS - GENERIC TOOL IMPLEMENTATIONS
 * 
 * Modern tool implementations with doc-prompt integration for runtime documentation.
 * Provides comprehensive web search and content retrieval capabilities.
 * 
 * @category Generic Tools
 * @priority High - Core search capabilities
 * 
 * @doc-ptrr
 * version: 1.0.0
 * sentience: runtime
 * intelligence: ["web-search", "content-retrieval", "url-intelligence"]
 * philosophy: "Information wants to be found; tools make discovery possible."
 * 
 * CAPABILITIES:
 * - Multi-provider search orchestration
 * - Intelligent content retrieval
 * - URL intelligence analysis
 * - Similarity detection
 * - Domain and technology analysis
 * - Production-grade resilience
 */

import { Tool } from '@engi/tools-generics';
import { factoryTool } from '@engi/tools-generics';

import {
  search as _search,
  getContents as _getContents,
  findSimilar as _findSimilar,
  extractDomain as _extractDomain,
  extractUrlsFromText as _extractUrlsFromText,
  classifyUrl as _classifyUrl,
  discoverRelatedDomains as _discoverRelatedDomains,
  extractTechnologyContext as _extractTechnologyContext,
  analyzeUrlAttachments as _analyzeUrlAttachments,
  searchWithUrlIntelligence as _searchWithUrlIntelligence,
  multiProviderSearch as _multiProviderSearch,
  getProviderHealth as _getProviderHealth,
  getProviderStatistics as _getProviderStatistics,
  productionMultiProviderSearch as _productionMultiProviderSearch,
  getProductionMetrics as _getProductionMetrics,
  getProductionHealth as _getProductionHealth,
} from '@engi/web-search';

import { WEB_SEARCH_DOC_CODE_TOOL_PROMPT } from './prompts/WebSearchDocCodeToolPrompt';
import { GET_CONTENTS_DOC_CODE_TOOL_PROMPT } from './prompts/GetContentsDocCodeToolPrompt';
import { MULTI_PROVIDER_SEARCH_DOC_CODE_TOOL_PROMPT } from './prompts/MultiProviderSearchDocCodeToolPrompt';

/**
 * @doc-code-tool
 * @prompt WEB_SEARCH_DOC_CODE_TOOL_PROMPT
 */
class SearchTool extends Tool<typeof _search> {
  use = _search;
}

export const search = new SearchTool();

/**
 * @doc-code-tool
 * @prompt GET_CONTENTS_DOC_CODE_TOOL_PROMPT
 */
class GetContentsTool extends Tool<typeof _getContents> {
  use = _getContents;
}

export const getContents = new GetContentsTool();

export const findSimilar = factoryTool(
  'findSimilar',
  async (params: { url: string; options?: any }) => {
    return await _findSimilar(params.url, params.options);
  },
  {
    description: `Find documents and content similar to a given URL or webpage.
    This tool helps AI agents discover related content, similar solutions, or
    comparable implementations by analyzing similarity to a reference URL.`
  }
);

// ---------------------------------------------------------------------------
// Enhanced search with URL intelligence
// ---------------------------------------------------------------------------

export const searchWithUrlIntelligence = factoryTool(
  'searchWithUrlIntelligence',
  async (params: { query: string; urlAttachments?: string[]; options?: any }) => {
    return await _searchWithUrlIntelligence(params.query, params.urlAttachments, params.options);
  },
  {
    description: `Perform enhanced web search that analyzes provided URL attachments to improve search strategy.
    This tool helps AI agents leverage URL context to create more targeted and relevant searches
    by understanding the technology stack, domain focus, and content patterns from URLs.`
  }
);

// ---------------------------------------------------------------------------
// Multi-provider search orchestration
// ---------------------------------------------------------------------------

/**
 * @doc-code-tool
 * @prompt MULTI_PROVIDER_SEARCH_DOC_CODE_TOOL_PROMPT
 */
class MultiProviderSearchTool extends Tool<typeof _multiProviderSearch> {
  use = _multiProviderSearch;
}

export const multiProviderSearch = new MultiProviderSearchTool();

export const productionMultiProviderSearch = factoryTool(
  'productionMultiProviderSearch',
  async (params: { query: string; urlAttachments?: string[]; options?: any }) => {
    return await _productionMultiProviderSearch(params.query, params.urlAttachments, params.options);
  },
  {
    description: `Production-grade multi-provider search with advanced resilience features.
    This tool provides enterprise-level search capabilities with circuit breakers,
    rate limiting, comprehensive monitoring, and automatic recovery mechanisms.`
  }
);

// ---------------------------------------------------------------------------
// URL intelligence and analysis utilities
// ---------------------------------------------------------------------------

export const extractDomain = factoryTool(
  'extractDomain',
  async (params: { url: string }) => {
    return await _extractDomain(params.url);
  },
  {
    description: `Extract the domain name from a given URL.
    This utility helps AI agents parse and extract domain information for analysis,
    categorization, or filtering purposes.`
  }
);

export const extractUrlsFromText = factoryTool(
  'extractUrlsFromText',
  async (params: { text: string }) => {
    return await _extractUrlsFromText(params.text);
  },
  {
    description: `Extract all URLs found within a text string.
    This tool helps AI agents identify and extract URL references from content,
    documentation, or any text input for further analysis or processing.`
  }
);

export const classifyUrl = factoryTool(
  'classifyUrl',
  async (params: { url: string }) => {
    return await _classifyUrl(params.url);
  },
  {
    description: `Classify a URL's type and extract metadata information.
    This tool helps AI agents understand URL characteristics, content type,
    and structural information for improved processing and categorization.`
  }
);

export const discoverRelatedDomains = factoryTool(
  'discoverRelatedDomains',
  async (params: { domain: string }) => {
    return await _discoverRelatedDomains(params.domain);
  },
  {
    description: `Discover domains related to a given input domain.
    This tool helps AI agents find associated websites, services, or resources
    related to a specific domain for comprehensive research or analysis.`
  }
);

export const extractTechnologyContext = factoryTool(
  'extractTechnologyContext',
  async (params: { urls: string[] }) => {
    return await _extractTechnologyContext(params.urls);
  },
  {
    description: `Extract technology keywords and context from a list of URLs.
    This tool helps AI agents identify technology stacks, frameworks, and
    technical context from URL patterns for enhanced search targeting.`
  }
);

export const analyzeUrlAttachments = factoryTool(
  'analyzeUrlAttachments',
  async (params: { urlAttachments: string[] }) => {
    return await _analyzeUrlAttachments(params.urlAttachments);
  },
  {
    description: `Perform comprehensive analysis of URL attachments for search enhancement.
    This tool helps AI agents understand the collective context of multiple URLs
    to improve search strategies, identify patterns, and extract relevant metadata.`
  }
);

// ---------------------------------------------------------------------------
// Health and monitoring tools
// ---------------------------------------------------------------------------

export const getProviderHealth = factoryTool(
  'getProviderHealth',
  async () => {
    return await _getProviderHealth();
  },
  {
    description: `Get health status of all search providers.
    This tool helps AI agents check which search providers are operational
    and available for use in multi-provider search scenarios.`
  }
);

export const getProviderStatistics = factoryTool(
  'getProviderStatistics',
  async () => {
    return await _getProviderStatistics();
  },
  {
    description: `Get performance statistics for all search providers.
    This tool helps AI agents understand provider performance metrics,
    response times, and success rates for optimal provider selection.`
  }
);

export const getProductionHealth = factoryTool(
  'getProductionHealth',
  async () => {
    return await _getProductionHealth();
  },
  {
    description: `Get production-grade health status and monitoring information.
    This tool provides comprehensive health metrics for production search
    infrastructure including detailed provider status and system health.`
  }
);

export const getProductionMetrics = factoryTool(
  'getProductionMetrics',
  async () => {
    return await _getProductionMetrics();
  },
  {
    description: `Get detailed production metrics for search operations.
    This tool provides comprehensive performance analytics, usage statistics,
    and operational metrics for production search infrastructure.`
  }
);

// ---------------------------------------------------------------------------
// Re-export Tool function types for strong typing at call-sites
// ---------------------------------------------------------------------------

export type SearchToolFn = Tool<typeof search>;
export type GetContentsToolFn = Tool<typeof getContents>;
export type FindSimilarToolFn = Tool<typeof findSimilar>;
export type ExtractDomainToolFn = Tool<typeof extractDomain>;
export type ExtractUrlsFromTextToolFn = Tool<typeof extractUrlsFromText>;
export type ClassifyUrlToolFn = Tool<typeof classifyUrl>;
export type DiscoverRelatedDomainsToolFn = Tool<typeof discoverRelatedDomains>;
export type ExtractTechnologyContextToolFn = Tool<typeof extractTechnologyContext>;
export type AnalyzeUrlAttachmentsToolFn = Tool<typeof analyzeUrlAttachments>;
export type SearchWithUrlIntelligenceToolFn = Tool<typeof searchWithUrlIntelligence>;
export type MultiProviderSearchToolFn = Tool<typeof multiProviderSearch>;
export type GetProviderHealthToolFn = Tool<typeof getProviderHealth>;
export type GetProviderStatisticsToolFn = Tool<typeof getProviderStatistics>;
export type ProductionMultiProviderSearchToolFn = Tool<typeof productionMultiProviderSearch>;
export type GetProductionMetricsToolFn = Tool<typeof getProductionMetrics>;
export type GetProductionHealthToolFn = Tool<typeof getProductionHealth>;

// Re-export types for convenience
export type {
  UrlType,
  UrlClassification,
  UrlAttachmentAnalysis,
  ExaResult,
  ExaSearchResponse,
  SearchOptions,
  SearchCategory,
  SearchType,
  SearchProvider,
  MultiProviderSearchResult,
  MultiProviderSearchQuery,
  SearchOrchestrationResult,
  ProviderConfig,
  SearchMetrics,
  ResilienceConfig,
  CircuitBreakerConfig,
  RetryConfig,
  RateLimiterConfig,
  FallbackConfig,
  ProviderHealthMetrics
} from '@engi/web-search';