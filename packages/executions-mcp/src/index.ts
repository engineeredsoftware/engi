// MCP base types and utiles
// - full MCP tools definitions are built in generic-tools/mcps/ from core functionality and base types imported

export function validateMcpConfig(_config: any) {
  return { success: true, reasons: [] };
}

import { z } from 'zod';

export const McpConfigSchema = z.object({
  id: z.string(),
  type: z.string(),
  config: z.record(z.any()).optional(),
});

export default McpConfigSchema;
