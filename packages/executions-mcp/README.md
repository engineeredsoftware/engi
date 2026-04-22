# MCP Configuration Utilities

## Overview

Model Context Protocol (MCP) base types and configuration validation utilities.
This package is the primitive `@bitcode/mcp` layer, not the full Bitcode Exchange-facing MCP server.
It provides foundational validation and type utilities used by higher MCP interfaces, including Bitcode's own MCP server and admitted third-party MCP ingress.

## Core Functionality

- **Configuration Validation**: Primitive runtime validation for MCP configurations
- **Type Safety**: TypeScript-first design with runtime validation
- **Extensible Schema**: Generic configuration structure supporting arbitrary MCP types
- **Validation Pipeline**: Production-ready validation with detailed error reporting
- **Zero Dependencies**: Minimal footprint with no runtime schema dependency

## Interface boundary

- `@bitcode/mcp`: primitive MCP configuration and validation utilities
- `@bitcode/mcp-server`: the Bitcode Exchange-facing MCP interface surface
- Third-party MCPs: admitted external interface inputs that can provide attachments, repository connections, or config context into Bitcode execution

This distinction matters in V26:
- attachments and connections are input context
- asset packs are output meaning
- the base MCP package should stay reusable and product-neutral

## API Reference

### Configuration Validation

#### `validateMcpConfig(config)`

Validates MCP configuration objects with comprehensive error checking.

**Parameters:**
- `config: any` - Configuration object to validate

**Returns:**
```typescript
{
  success: boolean;    // Validation result
  reasons: string[];   // Error details if validation fails
}
```

**Current Implementation:**
- Validates that config is a plain object
- Requires string `id` and `type`
- Accepts optional object `config`
- Returns explicit failure reasons for malformed input

### Schema Definitions

#### `McpConfigSchema`

Primitive schema-like contract defining the structure of MCP configurations.

**Schema Structure:**
```typescript
{
  id: string;              // Unique MCP identifier
  type: string;           // MCP type classification
  config?: Record<string, any>; // Optional type-specific configuration
}
```

**Usage:**
```typescript
import { McpConfigSchema } from '@bitcode/mcp';

// Validate configuration
const parsed = McpConfigSchema.parse(userConfig);

// Safe parsing with error handling
const result = McpConfigSchema.safeParse(userConfig);
if (!result.success) {
  console.error('Validation errors:', result.error.issues);
}
```

## Usage Examples

### Basic Configuration Validation
```typescript
import { validateMcpConfig, McpConfigSchema } from '@bitcode/mcp';

// Validate MCP configuration
const config = {
  id: 'filesystem-mcp',
  type: 'filesystem',
  config: {
    rootPath: '/project/data',
    permissions: ['read', 'write']
  }
};

// Runtime validation
const validation = validateMcpConfig(config);
if (!validation.success) {
  throw new Error(`Invalid MCP config: ${validation.reasons.join(', ')}`);
}

// Schema-based validation
const parsed = McpConfigSchema.parse(config);
console.log('Validated config:', parsed);
```

### Type-Safe Configuration
```typescript
import type { McpConfig } from '@bitcode/mcp';

// Use in application
function initializeMcp(config: McpConfig): void {
  console.log(`Initializing MCP: ${config.id} (${config.type})`);
  
  if (config.config) {
    console.log('Configuration options:', config.config);
  }
}

// Type-safe usage
const mcpConfig: McpConfig = {
  id: 'database-mcp',
  type: 'postgresql',
  config: {
    connectionString: process.env.DATABASE_URL,
    maxConnections: 10
  }
};

initializeMcp(mcpConfig);
```

### Configuration Arrays
```typescript
// Multiple MCP configurations
const mcpConfigs = [
  {
    id: 'fs-mcp',
    type: 'filesystem',
    config: { rootPath: '/data' }
  },
  {
    id: 'api-mcp', 
    type: 'rest-api',
    config: { baseUrl: 'https://api.example.com' }
  },
  {
    id: 'simple-mcp',
    type: 'memory'
    // No config required
  }
];

// Validate all configurations
const results = mcpConfigs.map(config => ({
  config,
  validation: validateMcpConfig(config),
  parsed: McpConfigSchema.safeParse(config)
}));

// Filter valid configurations
const validConfigs = results
  .filter(r => r.validation.success && r.parsed.success)
  .map(r => r.parsed.data);
```

### Pipeline Integration
```typescript
import { McpConfigSchema } from '@bitcode/mcp';

// Load MCP configurations from environment
function loadMcpConfigs(): McpConfig[] {
  const configJson = process.env.MCP_CONFIGURATIONS;
  if (!configJson) return [];
  
  try {
    const configs = JSON.parse(configJson);
    return configs.map((config: unknown) => McpConfigSchema.parse(config));
  } catch (error) {
    console.error('Failed to parse MCP configurations:', error);
    return [];
  }
}

// Initialize MCPs for pipeline
const mcpConfigs = loadMcpConfigs();
for (const config of mcpConfigs) {
  await initializeMcpServer(config);
}
```

## Performance Characteristics

### Validation Performance
- **Schema Parsing**: O(1) validation over the primitive MCP config contract
- **Memory Usage**: Minimal overhead with schema caching
- **Error Reporting**: Detailed validation errors with path information
- **Type Inference**: Zero-runtime cost TypeScript type generation

### Configuration Loading
- **JSON Parsing**: Safe parsing with error boundaries
- **Environment Integration**: Support for environment-based configuration
- **Hot Reloading**: Schema supports runtime configuration updates
- **Batch Validation**: Efficient processing of configuration arrays

### Integration Patterns
- **Plugin Architecture**: Generic schema supports diverse MCP types
- **Extension Points**: Optional config field for type-specific parameters
- **Composition**: Schema composition for complex MCP hierarchies
- **Interoperability**: Standard structure for cross-system compatibility

## Architecture Design

### Schema Philosophy
- **Minimal Required Fields**: Only `id` and `type` are mandatory
- **Flexible Configuration**: Optional `config` object for extensibility
- **Type Discrimination**: `type` field enables polymorphic MCP handling
- **Version Compatibility**: Schema designed for forward compatibility

### Validation Strategy
- **Runtime Safety**: primitive validation prevents runtime type errors
- **Developer Experience**: Clear error messages with field-level details
- **Performance**: Optimized validation with minimal overhead
- **Extensibility**: Easy addition of new MCP types and validations

### Future Extensions
- Add optional version metadata when MCP compatibility needs to be modeled explicitly.
- Add capability arrays when the primitive config contract needs to express advertised tool/resource surfaces.
- Add enable/disable flags only when runtime orchestration requires them, not preemptively.

## Configuration Examples

### Filesystem MCP
```typescript
{
  id: 'project-filesystem',
  type: 'filesystem',
  config: {
    rootPath: '/project/workspace',
    permissions: ['read', 'write', 'execute'],
    excludePatterns: ['node_modules', '.git', '*.log']
  }
}
```

### Database MCP
```typescript
{
  id: 'analytics-db',
  type: 'postgresql',
  config: {
    host: 'localhost',
    port: 5432,
    database: 'analytics',
    ssl: true,
    maxConnections: 20
  }
}
```

### API MCP
```typescript
{
  id: 'external-service',
  type: 'rest-api',
  config: {
    baseUrl: 'https://api.external.com',
    authentication: {
      type: 'bearer',
      token: process.env.API_TOKEN
    },
    timeout: 30000,
    retries: 3
  }
}
```

This utility package provides the foundation for type-safe MCP integration across the Bitcode platform, ensuring consistent configuration patterns and reliable validation.
