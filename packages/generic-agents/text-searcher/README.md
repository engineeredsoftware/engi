# Text Searcher Agent

## Overview

Repository text search specialist that performs exact-match text searches across codebases using system grep commands. Provides deterministic search results for keyword discovery and content location within project files.

## Core Capabilities

- **Exact Text Matching**: Uses system grep for precise string matching without fuzzy logic
- **Keyword Extraction**: Automatically derives search terms from task descriptions
- **Result Deduplication**: Consolidates multiple matches from same locations
- **Context Generation**: Provides file type and location context for each match
- **Relevance Scoring**: Ranks results based on keyword frequency and file types

## Technical Implementation

### Architecture
- Built on GenericAgent base with PTRR execution methodology
- Integrates with simple-system-text-search tool for grep operations
- Implements 4-step processing pipeline with result refinement
- Provides structured output with confidence metrics

### Processing Pipeline
1. **Plan**: Extract significant keywords from task description using stop-word filtering
2. **Try**: Execute parallel grep searches for each extracted keyword
3. **Refine**: Consolidate results, remove duplicates, apply relevance scoring
4. **Intensify**: Synthesize findings with file type analysis and insights generation

### Search Strategy
- Automatic keyword extraction with length filtering (>3 characters)
- Stop-word removal for improved relevance
- Configurable result limits per keyword
- File type classification for context awareness

## Output Structure

### Search Result Schema
```typescript
{
  finalMatches: Array<{
    file: string,
    line: number,
    text: string,
    keywords: string[],
    relevance: number,
    context: string
  }>,
  searchSummary: {
    totalMatches: number,
    keywordsUsed: string[],
    topFiles: string[],
    searchCoverage: number
  },
  insights: string[]
}
```

### Quality Metrics
- Unique matches after deduplication
- File coverage statistics
- Keyword effectiveness ratios
- Search completion rates

## Performance Characteristics

- **Execution Time**: 5-30 seconds depending on repository size
- **Memory Usage**: Minimal - processes results incrementally
- **Accuracy**: 100% for exact string matches
- **Coverage**: Limited to textual file content (no binary analysis)
- **Scalability**: Performance scales with repository size and keyword count

### Search Optimization
- Maximum 5 keywords per search to prevent over-expansion
- Configurable result limits (default 100 per keyword)
- Parallel keyword processing for improved speed
- Intelligent fallback to basic terms on extraction failure