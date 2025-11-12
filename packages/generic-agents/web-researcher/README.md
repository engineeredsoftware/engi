# Web Researcher Agent

## Overview

Sophisticated web intelligence research agent that conducts comprehensive multi-provider search operations to gather technical insights and implementation guidance. Orchestrates complex research workflows through systematic query generation, content analysis, and insight synthesis.

## Core Capabilities

- **Multi-Provider Search**: Integrates Exa, web search, and content analysis tools  
- **Intelligent Query Generation**: Automatically derives targeted search strategies from task context
- **URL Intelligence**: Analyzes provided URL attachments for contextual search enhancement
- **Content Synthesis**: Aggregates findings from multiple sources into actionable insights
- **Quality Assessment**: Validates source reliability and content relevance
- **Research Validation**: Implements multi-wave quality verification with feedback loops

## Technical Implementation

### Architecture
- Built on GenericAgent base with comprehensive PTRR methodology
- Integrates web-search and firecrawl tool ecosystems
- Implements enhanced schema validation for structured outputs
- Provides advanced quality assessment and synthesis capabilities

### Processing Pipeline
1. **Plan**: Task analysis, domain identification, and query strategy development
2. **Try**: Multi-wave search execution with provider intelligence
3. **Refine**: Result filtering, deduplication, and quality assessment
4. **Retry**: Insight synthesis with validation and actionable output generation

### Search Strategy Framework
- **Context Analysis**: Task domain and complexity assessment
- **Query Generation**: Primary and alternative query formulation
- **Provider Selection**: Intelligent provider routing based on query type
- **Quality Filtering**: Relevance thresholds and source reliability scoring

## Output Structure

### Research Result Schema
```typescript
{
  queries: string[],
  researchResults: Array<{
    title: string,
    url: string,
    summary: string,
    relevance: number,
    query: string
  }>,
  keyInsights: string[],
  taskRelevance: number,
  feedback: string,
  synthesisMetrics: {
    totalSources: number,
    avgRelevance: number,
    insightCount: number,
    qualityScore: number
  }
}
```

### Quality Assessment Schema
```typescript
{
  relevance: number,    // Average content relevance to task
  coverage: number,     // Breadth of research coverage
  reliability: number,  // Source credibility assessment
  overallScore: number  // Composite quality metric
}
```

## Performance Characteristics

### Execution Performance
- **Search Time**: 30-120 seconds for comprehensive multi-wave research
- **Concurrent Processing**: Parallel query execution for efficiency
- **Timeout Handling**: Configurable timeouts per research phase
- **Rate Limiting**: Respects provider API limits and quotas

### Quality Targets
- **Relevance**: 0.8 target for task-specific content alignment
- **Coverage**: 0.7 target for comprehensive topic coverage  
- **Reliability**: 0.9 target for credible source identification

### Research Metrics
- **Query Efficiency**: Primary vs alternative query success rates
- **Source Diversity**: Distribution across different domains and perspectives
- **Insight Generation**: Actionable findings per source analyzed
- **Synthesis Quality**: Coherence and usefulness of consolidated insights

### Reliability Features
- **Source Validation**: Automatic reliability assessment for known domains
- **Duplicate Detection**: URL-based deduplication with content similarity
- **Quality Thresholds**: Configurable relevance filtering
- **Fallback Strategies**: Alternative search approaches on primary failure

### Integration Points
- **Web Search Tools**: Direct integration with search provider APIs
- **Content Analysis**: Firecrawl integration for deep content extraction
- **URL Processing**: Attachment analysis for contextual enhancement
- **Result Caching**: Efficient handling of repeated research patterns