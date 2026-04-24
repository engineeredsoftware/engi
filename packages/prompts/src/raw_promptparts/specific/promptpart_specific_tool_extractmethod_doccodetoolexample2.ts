/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: example
 * intent: "Complex extraction example for extract method tool"
 * current_version: "V26.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "complexity_demonstration", "test": "Does '{{content}}' show a more complex extraction scenario? Rate 0-1" },
 *   { "name": "variable_handling", "test": "Does '{{content}}' demonstrate proper variable scope handling? Rate 0-1" },
 *   { "name": "advanced_features", "test": "Does '{{content}}' showcase advanced tool capabilities? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_EXTRACTMETHOD_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Example 2: Extract complex calculation with multiple variables\nInput: { filePath: "/src/finance/calculations.ts", startLine: 45, endLine: 67, targetLocation: "before", preserveComments: true }\nOutput: Generated calculateMonthlyPayment method with parameters (principal: number, rate: number, term: number, fees: number[]) returning PaymentResult. Preserved 3 inline comments. Method placed before line 45.' as PromptPart;