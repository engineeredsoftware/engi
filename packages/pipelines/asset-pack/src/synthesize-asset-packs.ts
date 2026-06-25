/**
 * SynthesizeAssetPacks — the one-and-only Bitcode synthesis pipeline (V48 Gate 3).
 *
 * A single SDIVF pipeline (Setup → Discovery → Implementation → Validation →
 * Finish) run in one of two MODES:
 *   - deposit: a depositor supplies their repository's knowledge; synthesis
 *     produces reviewable AssetPack patches to upload to the Depository.
 *   - read:    a reader's reviewed Need is satisfied by finding + synthesizing
 *     Need-fitting AssetPacks from Depository source.
 *
 * The mode carries the variance. It is resolved once in preprocess, stored on
 * the execution, and read by every phase to drive CONDITIONAL RUNTIME
 * REGISTRIES — each phase registers/resolves the mode-appropriate agents,
 * tools, and prompts under the same phase keys (the pattern the phases already
 * use via registerValidationAgentsForType / registerFinishAgentsForType,
 * generalized from writtenAssetType/deliveryMechanism to mode).
 *
 * Named SynthesizeAssetPacks for parity with the future Gate-6 SettleAssetPacks
 * pipeline (confirm BTC payment, mint BTD, transfer rights). It subsumes the
 * legacy, poorly-named "Develop" gate.
 */

import type { Execution } from '@bitcode/execution-generics/Execution';

export type SynthesizeAssetPacksMode = 'deposit' | 'read';

export const SYNTHESIZE_ASSET_PACKS_MODE_NAMESPACE = 'synthesize-asset-packs';
export const SYNTHESIZE_ASSET_PACKS_MODE_KEY = 'mode';

const VALID_MODES: ReadonlySet<string> = new Set<SynthesizeAssetPacksMode>(['deposit', 'read']);

function coerceMode(value: unknown): SynthesizeAssetPacksMode | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  return VALID_MODES.has(normalized) ? (normalized as SynthesizeAssetPacksMode) : null;
}

/**
 * Resolve the synthesis mode from the pipeline input and/or execution. Checks
 * the explicit `mode`, then the legacy `synthesisMode` / `lens` aliases, then a
 * previously-stored execution mode. Defaults to `read` so the existing
 * read/fits behavior is preserved until a caller opts into deposit.
 */
export function resolveSynthesizeAssetPacksMode(
  input: unknown,
  execution?: Execution | null,
): SynthesizeAssetPacksMode {
  const source = (input && typeof input === 'object' ? (input as Record<string, unknown>) : {}) ?? {};
  const fromInput =
    coerceMode(source.mode) ??
    coerceMode(source.synthesisMode) ??
    coerceMode((source as { synthesizeMode?: unknown }).synthesizeMode) ??
    coerceMode(source.lens);
  if (fromInput) return fromInput;
  const fromExecution = synthesizeAssetPacksModeFromExecution(execution);
  return fromExecution ?? 'read';
}

/** Read the mode previously stored on an execution (or its parent), if any. */
export function synthesizeAssetPacksModeFromExecution(
  execution?: Execution | null,
): SynthesizeAssetPacksMode | null {
  if (!execution) return null;
  try {
    const own = coerceMode(
      execution.get(SYNTHESIZE_ASSET_PACKS_MODE_NAMESPACE, SYNTHESIZE_ASSET_PACKS_MODE_KEY),
    );
    if (own) return own;
  } catch {}
  try {
    const parent = (execution as { parent?: Execution }).parent;
    if (parent) return synthesizeAssetPacksModeFromExecution(parent);
  } catch {}
  return null;
}

/** Persist the resolved mode on the execution so every phase can read it. */
export function storeSynthesizeAssetPacksMode(
  execution: Execution | null | undefined,
  mode: SynthesizeAssetPacksMode,
): void {
  if (!execution) return;
  try {
    execution.store(SYNTHESIZE_ASSET_PACKS_MODE_NAMESPACE, SYNTHESIZE_ASSET_PACKS_MODE_KEY, mode);
  } catch {}
}

export function isDepositMode(mode: SynthesizeAssetPacksMode): boolean {
  return mode === 'deposit';
}

export function isReadMode(mode: SynthesizeAssetPacksMode): boolean {
  return mode === 'read';
}
