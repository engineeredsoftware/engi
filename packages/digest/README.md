# Digest Generation Engine

## Overview

Production-grade repository analysis and digest generation system. Provides automated codebase summarization, file-level analysis, and intelligent caching for large-scale repository processing with LLM integration and artifact storage. The default markdown output now follows the `.ai/PRODUCT.md` template (purpose, features, source files) so downstream tools can adopt it directly.

## Core Functionality

- **Repository Analysis**: Comprehensive codebase scanning and file categorization
- **LLM Integration**: Automated content summarization using configurable language models
- **Multi-layer Caching**: File-level, digest-level, and artifact-level caching strategies
- **Persistence Layer**: Supabase-backed storage with S3 artifact hosting
- **Incremental Processing**: Smart regeneration based on file changes and commit history
- **Concurrent Processing**: Parallel file analysis with configurable concurrency limits

## API Reference

### High-Level Service API

#### `getDigest(snapshot, options?)`

Primary entry point for digest generation with persistence and caching.

**Parameters:**
- `snapshot: RepoSnapshot` - Repository identification
  ```typescript
  {
    org: string;    // Organization/owner name
    repo: string;   // Repository name  
    commit: string; // Git commit SHA
  }
  ```
- `options?: { forceRegenerate?: boolean }` - Generation options

**Returns:**
```typescript
Promise<GetDigestResult> {
  url: string;           // Public digest URL
  stats?: any;           // Generation statistics
  createdAt?: string;    // Creation timestamp
  cacheHit: boolean;     // Cache utilization indicator
}
```

### Low-Level Generation API

#### `generateDigest(params)`

Direct digest generation without persistence layer.

**Parameters:**
```typescript
{
  owner: string;           // Repository owner
  repo: string;           // Repository name
  commit: string;         // Target commit SHA
  correlationId: string;  // Tracing identifier
  usePreClonedRepo: boolean; // Use existing clone
  forceRegenerate?: boolean; // Bypass all caches
}
```

## Usage Examples

### Basic Digest Generation
```typescript
import { getDigest } from '@bitcode/digest/service';

// Generate cached digest for repository
const result = await getDigest({
  org: 'engi-corp',
  repo: 'platform',
  commit: 'abc123def456'
});

console.log(`Digest available at: ${result.url}`);
console.log(`Cache hit: ${result.cacheHit}`);
```

### Force Regeneration
```typescript
// Bypass all caches for fresh analysis
const freshDigest = await getDigest(
  { org: 'engi-corp', repo: 'platform', commit: 'abc123def456' },
  { forceRegenerate: true }
);

// Statistics include processing metrics
console.log('Generation stats:', freshDigest.stats);
```

### Direct Generation API
```typescript
import { generateDigest } from '@bitcode/digest/run';

// Low-level generation without persistence
const result = await generateDigest({
  owner: 'engi-corp',
  repo: 'platform', 
  commit: 'abc123def456',
  correlationId: crypto.randomUUID(),
  usePreClonedRepo: false,
  forceRegenerate: false
});

// Access local digest file
const digestContent = fs.readFileSync(result.digestPath, 'utf8');
```

### LLM API Integration
```typescript
import { callLLMAPI } from '@bitcode/digest/run';

// Direct LLM calls with digest prompts
const analysis = await callLLMAPI({
  model: 'gpt-4',
  prompt: 'Analyze this codebase structure...',
  context: fileContents,
  maxTokens: 4000
});
```

## Performance Characteristics

### Caching Strategy
- **Digest Level**: Database-backed complete digest caching by commit SHA
- **File Level**: Individual file analysis caching with content hashing
- **Artifact Level**: S3/Supabase storage with CDN-ready URLs
- **Cache Invalidation**: Automatic on commit changes, manual via `forceRegenerate`

### Processing Pipeline
- **File Discovery**: Intelligent filtering excluding build artifacts, dependencies
- **Parallel Analysis**: Configurable concurrency for LLM API calls
- **Memory Management**: Streaming processing for large repositories
- **Error Recovery**: Individual file failures don't abort entire digest

### LLM Integration
- **Model Selection**: Configurable model per analysis type (GPT-4, Claude, etc.)
- **Token Management**: Automatic chunking for large files
- **Rate Limiting**: Built-in API quota management
- **Cost Optimization**: Smart prompt construction and response caching

### Storage Performance
- **Local Generation**: Fast filesystem-based intermediate storage
- **Artifact Upload**: Automatic S3/Supabase artifact storage
- **CDN Integration**: Public URLs with global edge caching
- **Bandwidth Optimization**: Compressed markdown with lazy loading

## Architecture Components

### Core Modules
- `/run/digest.ts` - Low-level generation engine
- `/service/index.ts` - High-level persistence facade  
- `/caching/` - Multi-layer caching implementations
- `/llm/` - Language model integration utilities
- `/parsing/` - Content analysis and extraction
- `/files/` - Repository scanning and filtering

### Specialization Areas
- **Code Analysis**: Syntax-aware parsing for multiple languages
- **Documentation Generation**: Automated README and API doc creation
- **Quality Metrics**: Code complexity, test coverage, technical debt analysis
- **Dependency Mapping**: Package and import relationship analysis
- **Change Detection**: Incremental processing based on git diffs

## Configuration

### Environment Variables
```bash
# LLM Configuration
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# Storage Configuration  
ARTIFACT_S3_BUCKET=digests-bucket
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-service-key

# Processing Configuration
DIGEST_CONCURRENCY=5
DIGEST_CACHE_TTL=3600
DIGEST_MAX_FILE_SIZE=1048576
```

### Database Schema
Requires `digests` table in Supabase with columns:
- `org`, `repo`, `commit` (composite key)
- `url` (artifact storage URL)
- `stats` (JSONB processing metadata)
- `created_at` (timestamp)
