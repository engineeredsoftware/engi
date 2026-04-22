/**
 * Hierarchical Formatter - Transform prompt registry into hierarchical markdown
 *
 * Creates a beautifully structured prompt with:
 * - Nested markdown headers (up to 10 levels)
 * - Automatic hierarchy detection
 * - Empty content handling for required paths
 * - Clean, readable output
 */
import { PromptFormatter } from '../prompt';
/**
 * Format a prompt registry into hierarchical markdown
 *
 * Transforms paths like:
 * - generic_system:identity
 * - generic_system:methodology:ptrr
 * - specific_execution:pipeline:deliverable
 *
 * Into markdown like:
 * # GENERIC_SYSTEM
 * ## IDENTITY
 * [content]
 * ## METHODOLOGY
 * ### PTRR
 * [content]
 */
export declare const hierarchicalFormatter: PromptFormatter;
