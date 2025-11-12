import { z } from 'zod';

/**
 * Create a Zod schema placeholder for a plain TypeScript interface.
 *
 * Zod cannot derive runtime shape from a TS interface, but in many places we
 * want to specify “this step returns *some* object that conforms to interface
 * T”.
 *
 * Historically we used `z.custom<T>()` for that purpose, however tools such as
 * `zod-to-json-schema` cannot serialise `z.custom`.  The helper below returns
 * an empty `.object({}).passthrough()` instead, keeping the contract loose
 * while remaining serialisation-friendly.
 */
export function createInterfaceSchema<T>(description?: string): z.ZodType<T> {
  return z
    .object({})
    .passthrough()
    .describe(description || 'Interface Schema') as z.ZodType<T>;
}
