// @ts-check

export const ACTIVE_CANON_VERSION = 'V21';
export const DRAFT_TARGET_VERSION = 'V22';
export const ACTIVE_PROVEN_APPENDIX_PATH = `ENGI_SPEC_${ACTIVE_CANON_VERSION}_PROVEN.md`;
export const DRAFT_SPEC_PATH = `ENGI_SPEC_${DRAFT_TARGET_VERSION}.md`;
export const DRAFT_DELTA_PATH = `ENGI_SPEC_${DRAFT_TARGET_VERSION}_DELTA.md`;
export const DRAFT_PARITY_PATH = `ENGI_SPEC_${DRAFT_TARGET_VERSION}_PARITY_MATRIX.md`;
export const CURRENT_CANON_OPERATOR_LABEL = `${ACTIVE_CANON_VERSION} active canon / ${DRAFT_TARGET_VERSION} system draft`;
export const CURRENT_SPEC_VERSION_LABEL = `ENGI Spec ${CURRENT_CANON_OPERATOR_LABEL}`;
export const CURRENT_POLICY_REF = 'policy://engi/spec-v21-active-v22-system-draft/2026-04-12';

/**
 * @returns {{
 *   activeCanonVersion: string,
 *   draftTargetVersion: string,
 *   operatorLabel: string,
 *   specVersionLabel: string,
 *   documentTitle: string,
 *   policyRef: string,
 *   activeProvenAppendixPath: string,
 *   draftSpecPath: string,
 *   draftDeltaPath: string,
 *   draftParityPath: string,
 *   inheritedCanonSurfaceLabel: string,
 *   heroEyebrow: string,
 *   heroLede: string,
 *   heroTip: string
 * }}
 */
export function buildCanonPosture() {
  return {
    activeCanonVersion: ACTIVE_CANON_VERSION,
    draftTargetVersion: DRAFT_TARGET_VERSION,
    operatorLabel: CURRENT_CANON_OPERATOR_LABEL,
    specVersionLabel: CURRENT_SPEC_VERSION_LABEL,
    documentTitle: `ENGI Demo — ${ACTIVE_CANON_VERSION} canon / ${DRAFT_TARGET_VERSION} system draft`,
    policyRef: CURRENT_POLICY_REF,
    activeProvenAppendixPath: ACTIVE_PROVEN_APPENDIX_PATH,
    draftSpecPath: DRAFT_SPEC_PATH,
    draftDeltaPath: DRAFT_DELTA_PATH,
    draftParityPath: DRAFT_PARITY_PATH,
    inheritedCanonSurfaceLabel: 'V16/V17/V18/V19/V20/V21',
    heroEyebrow: 'ENGI deterministic local prototype',
    heroLede: 'Active canon is V21: full-system current canon, generated-only proof appendix discipline, exact proof-family inventories, and executable canonical promotion truth. V22 is the system draft target that realigns runtime, API, browser shell, tests, and demo-local docs to one executable canon posture before closing the next deferred proof/operator boundaries.',
    heroTip: 'Hover or focus the info badges beside core ENGI terms to get plain-language explainers. The active generated appendix target is ENGI_SPEC_V21_PROVEN.md; inherited V20 operator-quality artifacts remain canonical while V22 hardens live runtime posture.'
  };
}

export const CURRENT_CANON_POSTURE = buildCanonPosture();
