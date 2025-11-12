/**
 * Aurora Postgres MCP tools – migrated from `uapi/lib/mcps/aurora-postgres.ts`.
 */

export async function auroraNaturalLanguageToSqlTool(params: { naturalLanguageQuery: string }): Promise<any> {
  return { sql: '' };
}

export async function auroraExecuteSqlTool(params: { sql: string }): Promise<any> {
  return { rows: [], sql: params.sql };
}
