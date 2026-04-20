/**
 * FailsafeGenerationSequence - Canonical 3×3 sequence builder
 *
 * Formalizes the default step implementation: three failsafe parents, each
 * running the exact same three-generation children (Reason → Judge → Output).
 * Tools execution is a Step-level postprocess and is composed by step
 * factories after this core.
 */

import { conditional, sequential, type Executor } from '@bitcode/execution-generics';
import { z } from 'zod';
import {
  factoryPrepareConciseContext,
  factoryChunkThenSum,
  factoryStitchUntilComplete
} from '../substeps/factories';
import { createThricifiedGeneration } from './thricified-generation';

export type FailsafeGenerationSequence<TIn = any, TOut = any> = Executor<TIn, TOut>;

export interface FailsafeGenerationOptions<TOut> {
  outputSchema: z.ZodType<TOut>;
  enableParallelChunks?: boolean;  // chunking strategy
  // Debug env slicing (honors BITCODE_DEBUG_* environment variables)
  onlyGenerations?: string[];      // ['reason','judge','structured_output']
  onlyFailsafes?: string[];        // ['prepare','chunk','stitch']
}

/**
 * createFailsafeGenerationSequence - Build the default 3×3 + tools step
 */
export function createFailsafeGenerationSequence<TIn, TOut>(
  options: FailsafeGenerationOptions<TOut>
): FailsafeGenerationSequence<TIn, TOut> {
  // Single neutral typed generation (Reason→Judge→StructuredOutput)
  const thricified = createThricifiedGeneration<TIn, TOut>(options.outputSchema) as any;
  const children = [thricified];

  // Optional debug filtering via env or passed arrays
  // Thricified generation handles internal filtering of reason/judge/structured
  // via BITCODE_DEBUG_ONLY_GENERATIONS. Always include it here.
  const gens = children as any[];

  const onlyFails = (options.onlyFailsafes && options.onlyFailsafes.length)
    ? options.onlyFailsafes
    : String(process?.env?.BITCODE_DEBUG_ONLY_FAILSAFES || '')
        .toLowerCase()
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

  // Compose the 3 failsafes with optional filtering
  const core = sequential(
    ...(!onlyFails.length || onlyFails.includes('prepare') ? [factoryPrepareConciseContext(gens)] : []),
    ...(!onlyFails.length || onlyFails.includes('chunk') ? [factoryChunkThenSum(gens, { parallel: options.enableParallelChunks ?? true })] : []),
    ...(!onlyFails.length || onlyFails.includes('stitch') ? [factoryStitchUntilComplete(gens, options.outputSchema)] : [])
  );

  return core as FailsafeGenerationSequence<TIn, TOut>;
}

// Alias with a name that fully conveys the sequence purpose
export function createContextfulFailsafedThricifiedGeneration<TIn, TOut>(
  options: FailsafeGenerationOptions<TOut>
): FailsafeGenerationSequence<TIn, TOut> {
  return createFailsafeGenerationSequence<TIn, TOut>(options);
}

// Short alias emphasizing agentic nature
export const createFailsafedGeneration = createContextfulFailsafedThricifiedGeneration;
