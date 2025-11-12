/**
 * ThricifiedGeneration - A single Generation composed of three child LLM calls
 * in strict order: Reason → Judge → StructuredOutput.
 *
 * This is the atomic typed "Generation" used by steps. Failsafe wrappers
 * (PTRR-specific) can execute this generation under different parents.
 */

import { sequential, type Executor } from '@engi/execution-generics';
import { z } from 'zod';
import { factoryReason, factoryJudge, factoryStructuredOutput } from '../substeps/factories';

export type ThricifiedGeneration<TIn = any, TOut = any> = Executor<TIn, TOut>;

export function createThricifiedGeneration<TIn, TOut>(outputSchema: z.ZodType<TOut>): ThricifiedGeneration<TIn, TOut> {
  // The three neutral generation calls; tooling selection is deferred to caller
  const genReason = factoryReason();
  const genJudge = factoryJudge();
  const genStructured = factoryStructuredOutput(outputSchema);

  // Honor granular debug filter for inner generations
  const only = String(process?.env?.ENGI_DEBUG_ONLY_GENERATIONS || '')
    .toLowerCase()
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const include = (name: string) => !only.length || only.includes(name);
  const parts: any[] = [];
  if (include('reason')) parts.push(genReason);
  if (include('judge')) parts.push(genJudge);
  if (include('structured_output')) parts.push(genStructured);
  // Fallback: if filter produced none, run all to avoid silent no-ops
  const seq = parts.length ? parts : [genReason, genJudge, genStructured];

  const fn = sequential(...seq) as ThricifiedGeneration<TIn, TOut>;
  // Mark for introspection
  (fn as any).__gen = 'thricified';
  return fn;
}
