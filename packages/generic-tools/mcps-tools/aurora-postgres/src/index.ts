/**
 * Aurora Postgres MCP Tools - Modern Tool Class Architecture
 * 
 * Aurora Postgres database integration tools using the Tool class pattern.
 */

import { Tool } from '@engi/tools-generics';
import {
  auroraNaturalLanguageToSqlTool as _auroraNaturalLanguageToSql,
  auroraExecuteSqlTool as _auroraExecuteSql,
} from '@engi/aurora-postgres';

// Import DocCodeToolPrompt
import { AURORA_POSTGRES_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/AuroraPostgresMCPDocCodeToolPrompt';

/**
 * Aurora Postgres Natural Language to SQL Tool for intelligent query generation
 * 
 * @doc-code-tool
 * @prompt AURORA_POSTGRES_MCP_DOC_CODE_TOOL_PROMPT
 */
class AuroraNaturalLanguageToSqlTool extends Tool<typeof _auroraNaturalLanguageToSql> {
  use = _auroraNaturalLanguageToSql;
}

/**
 * Aurora Postgres Execute SQL Tool for database operations
 * 
 * @doc-code-tool
 * @prompt AURORA_POSTGRES_MCP_DOC_CODE_TOOL_PROMPT
 */
class AuroraExecuteSqlTool extends Tool<typeof _auroraExecuteSql> {
  use = _auroraExecuteSql;
}

// Export singleton instances - proper non-barrel exports
export const auroraNaturalLanguageToSqlTool = new AuroraNaturalLanguageToSqlTool();
export const auroraExecuteSqlTool = new AuroraExecuteSqlTool();

// Export DocCodeToolPrompt instance
export { AURORA_POSTGRES_MCP_DOC_CODE_TOOL_PROMPT };

// Export classes for type safety and extensibility
export { AuroraNaturalLanguageToSqlTool };
export { AuroraExecuteSqlTool };

// Legacy type exports for backwards compatibility
export type AuroraNaturalLanguageToSqlToolFn = AuroraNaturalLanguageToSqlTool;
export type AuroraExecuteSqlToolFn = AuroraExecuteSqlTool;
