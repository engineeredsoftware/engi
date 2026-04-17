/**
 * PostgreSQL MCP Tools - Modern Tool Class Architecture
 * 
 * PostgreSQL database management and query tools using the Tool class pattern.
 */

import { Tool } from '@bitcode/tools-generics';
import {
  postgresqlListTablesTool as _postgresqlListTables,
  postgresqlDescribeTableTool as _postgresqlDescribeTable,
  postgresqlRunQueryTool as _postgresqlRunQuery,
} from '@bitcode/postgresql';

// Import DocCodeToolPrompt
import { POSTGRESQL_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/PostgreSQLMCPDocCodeToolPrompt';

/**
 * PostgreSQL List Tables Tool for database schema discovery
 * 
 * @doc-code-tool
 * @prompt POSTGRESQL_MCP_DOC_CODE_TOOL_PROMPT
 */
class PostgresqlListTablesTool extends Tool<typeof _postgresqlListTables> {
  use = _postgresqlListTables;
}

/**
 * PostgreSQL Describe Table Tool for detailed table structure analysis
 * 
 * @doc-code-tool
 * @prompt POSTGRESQL_MCP_DOC_CODE_TOOL_PROMPT
 */
class PostgresqlDescribeTableTool extends Tool<typeof _postgresqlDescribeTable> {
  use = _postgresqlDescribeTable;
}

/**
 * PostgreSQL Run Query Tool for executing SQL queries and data operations
 * 
 * @doc-code-tool
 * @prompt POSTGRESQL_MCP_DOC_CODE_TOOL_PROMPT
 */
class PostgresqlRunQueryTool extends Tool<typeof _postgresqlRunQuery> {
  use = _postgresqlRunQuery;
}

// Export singleton instances - proper non-barrel exports
export const postgresqlListTablesTool = new PostgresqlListTablesTool();
export const postgresqlDescribeTableTool = new PostgresqlDescribeTableTool();
export const postgresqlRunQueryTool = new PostgresqlRunQueryTool();

// Export DocCodeToolPrompt instance
export { POSTGRESQL_MCP_DOC_CODE_TOOL_PROMPT };

// Export classes for type safety and extensibility
export { PostgresqlListTablesTool };
export { PostgresqlDescribeTableTool };
export { PostgresqlRunQueryTool };
