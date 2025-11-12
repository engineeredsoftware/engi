export async function mysqlListTablesTool(params?: {}): Promise<any> {
  return { tables: [] };
}

export async function mysqlGetTableSchemaTool(params: { table: string }): Promise<any> {
  return { table: params.table, schema: {} };
}

export async function mysqlQueryTool(params: { sql: string }): Promise<any> {
  return { rows: [], sql: params.sql };
}
