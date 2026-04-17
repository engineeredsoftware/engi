# Aurora Postgres MCP Tools

## Overview

AWS Aurora PostgreSQL Model Context Protocol (MCP) integration utilities providing natural language SQL generation and database query execution capabilities.

## Core Functionality

- **Natural Language SQL Translation**: Convert English queries to SQL statements
- **SQL Execution Interface**: Execute SQL commands against Aurora PostgreSQL databases
- **MCP Protocol Compliance**: Standard MCP tool interface for AI model integration

## API Reference

### `auroraNaturalLanguageToSqlTool(params)`

Convert natural language queries into SQL statements.

**Parameters:**
- `params.naturalLanguageQuery: string` - Human-readable database query

**Returns:**
```typescript
Promise<{
  sql: string; // Generated SQL statement
}>
```

**Usage:**
```typescript
import { auroraNaturalLanguageToSqlTool } from '@bitcode/aurora-postgres';

const result = await auroraNaturalLanguageToSqlTool({
  naturalLanguageQuery: "Find all users created in the last 30 days"
});

console.log(result.sql); // SELECT * FROM users WHERE created_at > NOW() - INTERVAL '30 days'
```

### `auroraExecuteSqlTool(params)`

Execute SQL commands against Aurora PostgreSQL database.

**Parameters:**
- `params.sql: string` - SQL statement to execute

**Returns:**
```typescript
Promise<{
  rows: any[];      // Query result rows
  sql: string;      // Executed SQL statement
}>
```

**Usage:**
```typescript
import { auroraExecuteSqlTool } from '@bitcode/aurora-postgres';

const result = await auroraExecuteSqlTool({
  sql: "SELECT id, name, email FROM users LIMIT 10"
});

console.log(`Executed: ${result.sql}`);
console.log(`Found ${result.rows.length} users`);
```

## MCP Integration

These tools are designed for use with Model Context Protocol servers, enabling AI models to interact with Aurora PostgreSQL databases through structured interfaces.

### Tool Registration
```typescript
// MCP server integration
const tools = [
  {
    name: 'aurora_nl_to_sql',
    description: 'Convert natural language to SQL',
    handler: auroraNaturalLanguageToSqlTool
  },
  {
    name: 'aurora_execute_sql',
    description: 'Execute SQL against Aurora PostgreSQL',
    handler: auroraExecuteSqlTool
  }
];
```

## Implementation Status

**Current State**: Basic interface implementation with placeholder functionality
- SQL generation returns empty string
- Execution returns empty result set
- Ready for backend database connection integration

**Production Requirements**:
- Database connection configuration
- Query validation and sanitization
- Error handling and connection pooling
- Security controls and access permissions