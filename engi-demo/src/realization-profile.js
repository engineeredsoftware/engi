export const PROFILE_A = 'Profile A — targeted deposit / bounded need';
export const PROFILE_B = 'Profile B — normalization deposit / composite need';

export const REALIZATION_PROFILE_KIND = 'demo-realization-profile';
export const REALIZATION_PROFILE_IDS = Object.freeze({
  TARGETED: 'A',
  NORMALIZATION: 'B'
});
export const REALIZATION_PROFILE_NAMES = Object.freeze({
  preferred: 'realizationProfile',
  legacy: 'demonstrationProfile'
});

const PROFILE_B_SCENARIO_FAMILIES = new Set([
  'polyglot-repo-benchmark-remediation',
  'many-asset-settlement-normalization'
]);

const PROFILE_DEFINITIONS = Object.freeze({
  [REALIZATION_PROFILE_IDS.TARGETED]: Object.freeze({
    profileId: REALIZATION_PROFILE_IDS.TARGETED,
    label: PROFILE_A,
    shortLabel: 'Targeted deposit',
    identity: Object.freeze({
      whoItIs: 'Deposit a small, decisive set of repo-authenticated artifacts against a sharply bounded benchmark need.',
      operatorRole: 'Use this when ENGI should close one tight remediation need with minimal normalization overhead.',
      audienceMeaning: 'The demo is proving decisive selection, narrow proof closure, and fast settlement explanation.'
    }),
    depositMode: 'Deposit one or a few decisive repo-authenticated artifacts so the asset pack can stay tight.',
    needMode: 'Need is sharply bounded by a narrow benchmark slice with a short list of failure modes and clear closure criteria.',
    assetPackShape: 'Tight pack with minimal normalization and quick branch closure.',
    settlementShape: 'Credits concentrate on the decisive assets; zero-credit passengers should be rare and explicit.',
    scenarioFamilies: Object.freeze([
      'monorepo-auth-rollback',
      'proof-heavy-rust-validator',
      'config-policy-incident',
      'unsafe-patch-review',
      'infra-deployment-mismatch',
      'privacy-boundary-stress'
    ]),
    composition: Object.freeze([
      'repo-authenticated targeted deposit',
      'bounded benchmark need measurement',
      'tight asset-pack selection',
      'short proof closure',
      'direct settlement explanation'
    ]),
    boundaryRealityNote: 'Live GitHub, signer verification, and networked settlement still remain explicit external hand-offs elsewhere.'
  }),
  [REALIZATION_PROFILE_IDS.NORMALIZATION]: Object.freeze({
    profileId: REALIZATION_PROFILE_IDS.NORMALIZATION,
    label: PROFILE_B,
    shortLabel: 'Normalization deposit',
    identity: Object.freeze({
      whoItIs: 'Deposit several overlapping artifacts so ENGI can normalize coverage, provenance, and contribution across a composite need.',
      operatorRole: 'Use this when ENGI must reconcile multiple slices, artifact kinds, or runtime surfaces before settlement is intelligible.',
      audienceMeaning: 'The demo is proving normalization, overlap handling, and source-to-shares closure rather than a single decisive pick.'
    }),
    depositMode: 'Deposit multiple overlapping artifacts across kinds so ENGI can normalize contribution and provenance.',
    needMode: 'Need stays composite across several failing slices, weak dimensions, or cross-language/runtime boundaries.',
    assetPackShape: 'Broader pack where normalization, tie-break rules, and overlap accounting matter.',
    settlementShape: 'Settlement makes source-to-shares normalization visible and may keep zero-credit participants explicit.',
    scenarioFamilies: Object.freeze([
      'polyglot-repo-benchmark-remediation',
      'many-asset-settlement-normalization'
    ]),
    composition: Object.freeze([
      'repo-authenticated normalization deposit',
      'composite benchmark need measurement',
      'broader asset-pack normalization',
      'heavier proof burden',
      'source-to-shares settlement explanation'
    ]),
    boundaryRealityNote: 'Live GitHub and network hand-offs are still explicit boundary contracts, but they are not the reason this profile exists.'
  })
});

function cloneRealizationProfile(profile) {
  return {
    profileKind: REALIZATION_PROFILE_KIND,
    profileDiscriminant: `${REALIZATION_PROFILE_KIND}:${profile.profileId}`,
    canonicalNames: { ...REALIZATION_PROFILE_NAMES },
    ...profile,
    identity: { ...profile.identity },
    scenarioFamilies: [...profile.scenarioFamilies],
    composition: [...profile.composition]
  };
}

export function resolveRealizationProfileId(subject = {}) {
  if (typeof subject === 'string' && subject.trim()) return subject.trim().toUpperCase();
  return subject.realizationProfileId
    || subject.demonstrationProfileId
    || (PROFILE_B_SCENARIO_FAMILIES.has(subject.scenarioFamily)
      ? REALIZATION_PROFILE_IDS.NORMALIZATION
      : REALIZATION_PROFILE_IDS.TARGETED);
}

export function buildRealizationProfile(subject = REALIZATION_PROFILE_IDS.TARGETED) {
  const profileId = resolveRealizationProfileId(subject);
  const profile = PROFILE_DEFINITIONS[profileId] || PROFILE_DEFINITIONS[REALIZATION_PROFILE_IDS.TARGETED];
  return cloneRealizationProfile(profile);
}

export function buildDemonstrationProfile(subject = REALIZATION_PROFILE_IDS.TARGETED) {
  return buildRealizationProfile(subject);
}
