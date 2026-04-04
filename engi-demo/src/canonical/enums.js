/**
 * Canonical V15 enum-like constants for closed-case subsystem values.
 *
 * These are kept runtime-safe in JavaScript today while shaping the codebase
 * toward the richer TypeScript/discriminated-union target described in V15.
 */

export const DemonstrationProfile = Object.freeze({
  TARGETED_BOUNDED: 'Profile A — targeted deposit / bounded need',
  NORMALIZATION_COMPOSITE: 'Profile B — normalization deposit / composite need'
});

export const DemonstrationProfileKey = Object.freeze({
  TARGETED_BOUNDED: 'targeted-bounded',
  NORMALIZATION_COMPOSITE: 'normalization-composite'
});

export const ExecutionReality = Object.freeze({
  MODELED_LOCAL: 'modeled-local',
  EXECUTED_LOCAL: 'executed-local',
  EXTERNAL_REQUIRED: 'external-required'
});

export const NormalizationPressure = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
});

export const DemonstrationStage = Object.freeze({
  DEPOSITING: 'depositing',
  NEEDING: 'needing',
  DEPOSIT_TO_NEED_FIT: 'deposit-to-need-fit',
  ASSET_PACK: 'asset-pack',
  BRANCH: 'branch-materialization',
  PROOF: 'proof-closure',
  SETTLEMENT: 'settlement'
});

export const SurfaceLayer = Object.freeze({
  SYSTEM: 'system-layer',
  PROJECTION: 'projection-layer',
  DEMO: 'demo-layer'
});

export const ProofFamily = Object.freeze({
  PROMPT: 'prompt',
  STATIC_MEASUREMENT: 'static-measurement',
  VERIFICATION: 'verification',
  MATERIALIZATION: 'materialization',
  DISCLOSURE: 'disclosure',
  SETTLEMENT: 'settlement',
  SYSTEM: 'system'
});

export const SettlementParticipationKind = Object.freeze({
  SELECTED_ONLY: 'selected-only',
  PARTICIPATING_ZERO: 'participating-zero',
  PARTICIPATING_CREDITED: 'participating-credited',
  EXCLUDED: 'excluded'
});
