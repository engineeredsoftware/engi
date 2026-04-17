# Artifacts Storage Utility

## Overview

Production-grade artifact storage abstraction for pipeline execution outputs. Provides unified interface for storing binary and text artifacts with automatic S3/Supabase Storage failover, content-type detection, and unique key generation.

## Core Functionality

- **Multi-backend Storage**: S3 primary, Supabase Storage fallback
- **Automatic Key Generation**: Timestamp-UUID-based naming with collision avoidance
- **Content Type Detection**: MIME type inference and manual override support
- **Environment-driven Configuration**: Zero-config deployment via environment variables
- **Binary/Text Support**: Handle both Buffer and string inputs uniformly

## API Reference

### `saveArtifact(buffer, name, contentType?)`

Stores artifact data with automatic backend selection and returns access metadata.

**Parameters:**
- `buffer: Uint8Array | string` - Artifact data
- `name: string` - Base filename for storage key generation
- `contentType?: string` - MIME type (default: 'application/octet-stream')

**Returns:**
```typescript
Promise<ArtifactInfo> {
  url: string;      // Public access URL
  size: number;     // Byte size of stored data
  name: string;     // Original filename
  etag?: string;    // Storage-specific etag if available
}
```

**Throws:**
- Storage backend misconfiguration
- Network connectivity failures
- Permission/quota exceeded errors

## Usage Examples

### Basic Artifact Storage
```typescript
import { saveArtifact } from '@bitcode/artifacts';

// Store text content
const textArtifact = await saveArtifact(
  'Pipeline execution log content',
  'pipeline-log.txt',
  'text/plain'
);

// Store binary data
const buffer = fs.readFileSync('output.pdf');
const pdfArtifact = await saveArtifact(
  buffer,
  'analysis-report.pdf',
  'application/pdf'
);

console.log(`Artifact available at: ${textArtifact.url}`);
```

### Pipeline Integration
```typescript
// Generate unique artifacts per pipeline execution
const results = await pipelineExecution();
const artifact = await saveArtifact(
  JSON.stringify(results, null, 2),
  `pipeline-results-${runId}.json`,
  'application/json'
);

// Store in pipeline metadata
await updatePipelineRun(runId, { 
  artifactUrl: artifact.url,
  artifactSize: artifact.size 
});
```

## Performance Characteristics

### Storage Backend Selection
- **S3 Priority**: Automatic selection when `ARTIFACT_S3_BUCKET` and `AWS_REGION` configured
- **Supabase Fallback**: Used when S3 unavailable, requires `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- **Configuration Validation**: Runtime backend availability checking

### Key Generation Strategy
- **Format**: `{timestamp}-{uuid}-{original-name}`
- **Collision Probability**: ~0% with timestamp + UUID combination
- **Sorting**: Chronological ordering by creation time

### Upload Performance
- **S3**: Direct AWS SDK calls with minimal overhead
- **Supabase**: REST API with automatic retry on network errors
- **Memory Usage**: Streaming upload for large artifacts (>10MB)

### Error Handling
- **Backend Validation**: Early failure on misconfigured storage
- **Network Resilience**: Built-in retry for transient failures
- **Graceful Degradation**: Clear error messages for troubleshooting

## Environment Configuration

```bash
# S3 Backend (Primary)
ARTIFACT_S3_BUCKET=your-artifacts-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

# Supabase Backend (Fallback)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
# or
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

No configuration required for local development - storage backends auto-detect based on available environment variables.
