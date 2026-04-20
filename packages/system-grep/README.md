# System Text Search Utility

## Overview

Server-side recursive text search utility providing production-grade grep functionality with pattern matching, result limiting, and intelligent filtering. Designed for repository analysis and codebase exploration with comprehensive error handling and performance optimization.

## Core Functionality

- **Recursive Search**: Deep directory traversal with automatic exclusions
- **Pattern Matching**: Extended regex support with case-insensitive options
- **Result Management**: Configurable result limits with performance optimization
- **Server-only Safety**: Explicit server-side enforcement preventing browser usage
- **Git Integration**: Automatic .git directory exclusion for repository scanning
- **Memory Efficiency**: Streaming results with configurable buffer limits

## API Reference

### `simpleSystemTextSearch(params)`

Execute recursive grep search with comprehensive configuration options.

**Parameters:**
```typescript
{
  pattern: string | string[];  // Search pattern(s) - regex supported
  cwd?: string;               // Working directory (default: process.cwd())
  maxResults?: number;        // Result limit (default: 100)
  ignoreCase?: boolean;       // Case-insensitive search (default: false)
}
```

**Returns:**
```typescript
Promise<GrepMatch[]>

interface GrepMatch {
  file: string;    // Relative file path from cwd
  line: number;    // Zero-based line number
  text: string;    // Matched line content (trimmed)
}
```

## Usage Examples

### Basic Text Search
```typescript
import { simpleSystemTextSearch } from '@bitcode/system-grep';

// Search for function definitions
const matches = await simpleSystemTextSearch({
  pattern: 'function\\s+\\w+\\(',
  cwd: '/project/src',
  maxResults: 50,
  ignoreCase: false
});

// Process results
matches.forEach(match => {
  console.log(`${match.file}:${match.line + 1}: ${match.text}`);
});
```

### Multi-pattern Search
```typescript
// Search for multiple patterns simultaneously
const apiMatches = await simpleSystemTextSearch({
  pattern: ['fetch\\(', 'axios\\.', 'XMLHttpRequest'],
  cwd: '/project',
  maxResults: 200,
  ignoreCase: true
});

// Group results by pattern type
const grouped = apiMatches.reduce((acc, match) => {
  const category = match.text.includes('fetch') ? 'fetch' :
                  match.text.includes('axios') ? 'axios' : 'xhr';
  acc[category] = acc[category] || [];
  acc[category].push(match);
  return acc;
}, {});
```

### Repository Analysis
```typescript
// Find all TODO comments across codebase
const todos = await simpleSystemTextSearch({
  pattern: 'TODO|FIXME|HACK|XXX',
  cwd: process.cwd(),
  maxResults: 1000,
  ignoreCase: true
});

// Generate TODO report
const todoReport = todos.map(match => ({
  file: match.file,
  line: match.line + 1, // Convert to 1-based for display
  priority: match.text.includes('FIXME') ? 'high' : 
           match.text.includes('TODO') ? 'medium' : 'low',
  content: match.text.trim()
}));

console.table(todoReport);
```

### Configuration Search
```typescript
// Search for environment variable usage
const envVars = await simpleSystemTextSearch({
  pattern: 'process\\.env\\.[A-Z_]+',
  cwd: '/project/src',
  maxResults: 500
});

// Extract unique environment variables
const uniqueEnvVars = [...new Set(
  envVars.map(match => {
    const envMatch = match.text.match(/process\.env\.([A-Z_]+)/);
    return envMatch ? envMatch[1] : null;
  }).filter(Boolean)
)];

console.log('Environment variables used:', uniqueEnvVars);
```

### Error Pattern Detection
```typescript
// Find error handling patterns
const errorHandling = await simpleSystemTextSearch({
  pattern: 'catch\\s*\\(|throw\\s+new|console\\.error',
  cwd: '/project/src',
  maxResults: 300,
  ignoreCase: false
});

// Analyze error handling coverage
const errorStats = {
  catchBlocks: errorHandling.filter(m => m.text.includes('catch')).length,
  thrownErrors: errorHandling.filter(m => m.text.includes('throw')).length,
  consoleErrors: errorHandling.filter(m => m.text.includes('console.error')).length
};

console.log('Error handling statistics:', errorStats);
```

### Pipeline Integration
```typescript
// Search for specific architectural patterns
async function analyzeArchitecture(projectPath: string) {
  const patterns = {
    components: 'export\\s+(default\\s+)?function\\s+[A-Z]',
    hooks: 'use[A-Z]\\w*\\s*\\(',
    apis: 'async\\s+function|await\\s+',
    tests: 'describe\\(|it\\(|test\\('
  };

  const results = {};
  
  for (const [category, pattern] of Object.entries(patterns)) {
    results[category] = await simpleSystemTextSearch({
      pattern,
      cwd: projectPath,
      maxResults: 1000,
      ignoreCase: false
    });
  }
  
  return {
    summary: Object.fromEntries(
      Object.entries(results).map(([key, matches]) => [key, matches.length])
    ),
    details: results
  };
}

const analysis = await analyzeArchitecture('/project');
console.log('Architecture analysis:', analysis.summary);
```

## Performance Characteristics

### Search Optimization
- **Recursive Traversal**: Efficient directory walking with automatic exclusions
- **Pattern Compilation**: Single regex compilation for multiple patterns
- **Early Termination**: Search stops at maxResults to prevent resource exhaustion
- **Memory Management**: 10MB buffer limit with streaming processing

### Exclusion Strategy
- **Git Directory**: Automatic exclusion of `.git` directories
- **Binary Files**: `-I` flag excludes binary files from search
- **Large Files**: Implicit exclusion via buffer limits
- **No Color Output**: `--no-color` flag for clean parsing

### Error Handling
- **Silent Failures**: grep exit code 1 (no matches) treated as success
- **Resource Protection**: Buffer limits prevent memory exhaustion  
- **Path Resolution**: Automatic path resolution and normalization
- **Graceful Degradation**: Empty results on command failures

### Result Processing
- **Zero-based Indexing**: Line numbers converted to zero-based for consistency
- **Relative Paths**: File paths normalized relative to working directory
- **Content Trimming**: Matched lines trimmed for clean output
- **Parsing Robustness**: Handles edge cases in grep output format

## Implementation Details

### Command Construction
```bash
grep -R -n -I --no-color --exclude-dir=.git [-i] -E 'pattern' .
```

**Flags:**
- `-R`: Recursive directory search
- `-n`: Include line numbers in output
- `-I`: Skip binary files
- `--no-color`: Disable color output for parsing
- `--exclude-dir=.git`: Skip version control directories
- `-i`: Case-insensitive (optional)
- `-E`: Extended regex support

### Output Parsing
- **Format**: `filename:line_number:matched_content`
- **Delimiter**: Colon separation with robust parsing
- **Path Handling**: Relative path calculation from working directory
- **Line Indexing**: Conversion from 1-based to 0-based numbering

### Server-only Enforcement
```typescript
import 'server-only';
```
Explicit server-only import prevents accidental browser usage, ensuring security and preventing client-side file system access.

## Security Considerations

- **Server-side Only**: Explicit server-only module prevents browser execution
- **Path Traversal**: Automatic path resolution prevents directory escape
- **Command Injection**: Pattern escaping prevents shell injection attacks
- **Resource Limits**: Buffer and result limits prevent DoS attacks
- **Working Directory**: Controlled execution context with explicit CWD

## Error Recovery

The utility handles various error conditions gracefully:

- **Command Not Found**: Returns empty results if grep unavailable
- **Permission Denied**: Skips inaccessible files/directories
- **Invalid Patterns**: Graceful handling of malformed regex patterns
- **Resource Exhaustion**: Buffer limits prevent memory issues
- **No Matches**: Distinguishes between errors and no results found

This utility provides reliable, efficient text search capabilities for server-side repository analysis and codebase exploration within the Bitcode platform.
