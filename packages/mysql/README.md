# @bitcode/mysql

MySQL database management tools for the Bitcode platform. Provides schema introspection and query execution capabilities for MySQL databases.

## Available Tools

- **mysqlListTablesTool**: List all tables in database
- **mysqlGetTableSchemaTool**: Get detailed table schema information
- **mysqlQueryTool**: Execute SQL queries safely

## Usage

```typescript
import { 
  mysqlListTablesTool,
  mysqlGetTableSchemaTool,
  mysqlQueryTool 
} from '@bitcode/mysql';

// List database tables
const tables = await mysqlListTablesTool();

// Get table schema
const schema = await mysqlGetTableSchemaTool({ 
  table: 'users' 
});

// Execute query
const results = await mysqlQueryTool({ 
  sql: 'SELECT * FROM users WHERE active = 1 LIMIT 10' 
});
```

## Return Types

- **Tables**: Array of table names with metadata
- **Schema**: Column definitions, indexes, constraints, foreign keys
- **Query Results**: Rows with column data and query metadata

## Security

Query tool implements parameterized queries and SQL injection protection. Schema introspection uses read-only database connections where possible.

## Architecture

Tools provide safe abstraction over MySQL database operations. Designed for integration with Bitcode data pipeline and analytics workflows.
