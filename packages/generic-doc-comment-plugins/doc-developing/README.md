# @bitcode/doc-comment-developing

Development-time doc-comment plugins for testing and profiling. This package contains utility plugins for development workflows.

## Plugins

### @doc-comment-dryrun
Mocked responses for testing without LLM calls:
```typescript
/**
 * @doc-comment-dryrun
 * scenario: "basic_test"
 * response: { "result": "mocked" }
 */
```

### @doc-comment-benchmark
Performance benchmarking for code execution:
```typescript
/**
 * @doc-comment-benchmark
 * name: "critical_path"
 * iterations: 1000
 */
```

### @doc-comment-profile
Profiling markers for performance analysis:
```typescript
/**
 * @doc-comment-profile
 * section: "initialization"
 * measure: true
 */
```

## Important Note

The prompt-specific developing plugins (@doc-comment-developing-promptpartdevelopment and @doc-comment-developing-promptdevelopment) are located in:
`@bitcode/prompts/src/developing/doc-comment-developing.ts`

## Usage

```typescript
import { 
  docDryRunPlugin,
  docBenchmarkPlugin,
  docProfilePlugin 
} from '@bitcode/doc-comment-developing';
```

## When to Use

Use these plugins for:
- Testing without external dependencies
- Performance measurement
- Development profiling

NOT for production builds.