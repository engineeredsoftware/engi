/**
 * MySQL MCP Tools - Modern Tool Class Architecture
 * 
 * MySQL database management and query tools using the Tool class pattern.
 */

import { Tool } from '@bitcode/tools-generics';
import {
  mysqlListTablesTool as _mysqlListTables,
  mysqlGetTableSchemaTool as _mysqlGetTableSchema,
  mysqlQueryTool as _mysqlQuery,
} from '@bitcode/mysql';

// Import DocCodeToolPrompt
import { MYSQL_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/MySQLMCPDocCodeToolPrompt';

/**
 * MySQL List Tables Tool for database schema discovery
 * 
 * @doc-code-tool
 * @prompt MYSQL_MCP_DOC_CODE_TOOL_PROMPT
 */
class MysqlListTablesTool extends Tool<typeof _mysqlListTables> {
  use = _mysqlListTables;
}

/**
 * MySQL Get Table Schema Tool for detailed table structure analysis
 * 
 * @doc-code-tool
 * @prompt MYSQL_MCP_DOC_CODE_TOOL_PROMPT
 */
class MysqlGetTableSchemaTool extends Tool<typeof _mysqlGetTableSchema> {
  use = _mysqlGetTableSchema;
}

/**
 * MySQL Query Tool for executing SQL queries and data operations
 * 
 * @doc-code-tool
 * @prompt MYSQL_MCP_DOC_CODE_TOOL_PROMPT
 */
class MysqlQueryTool extends Tool<typeof _mysqlQuery> {
  use = _mysqlQuery;
}

// Export singleton instances - proper non-barrel exports
export const mysqlListTablesTool = new MysqlListTablesTool();
export const mysqlGetTableSchemaTool = new MysqlGetTableSchemaTool();
export const mysqlQueryTool = new MysqlQueryTool();

// Export DocCodeToolPrompt instance
export { MYSQL_MCP_DOC_CODE_TOOL_PROMPT };

// Export classes for type safety and extensibility
export { MysqlListTablesTool };
export { MysqlGetTableSchemaTool };
export { MysqlQueryTool };
