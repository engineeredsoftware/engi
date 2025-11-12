export async function postgresqlListTablesTool(params?: {}): Promise<any> {
  return { tables: [] };
}

export async function postgresqlDescribeTableTool(params: { table: string }): Promise<any> {
  return { table: params.table, schema: {} };
}

export async function postgresqlRunQueryTool(params: { sql: string }): Promise<any> {
  return { rows: [], sql: params.sql };
}
