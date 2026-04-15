// @ts-check

export const ACTIVE_CANON_VERSION = 'V24';
export const DRAFT_TARGET_VERSION = 'V25';
export const ACTIVE_PROVEN_APPENDIX_PATH = `ENGI_SPEC_${ACTIVE_CANON_VERSION}_PROVEN.md`;
export const DRAFT_SPEC_PATH = `ENGI_SPEC_${DRAFT_TARGET_VERSION}.md`;
export const DRAFT_DELTA_PATH = `ENGI_SPEC_${DRAFT_TARGET_VERSION}_DELTA.md`;
export const DRAFT_PARITY_PATH = `ENGI_SPEC_${DRAFT_TARGET_VERSION}_PARITY_MATRIX.md`;
export const CURRENT_CANON_OPERATOR_LABEL = `${ACTIVE_CANON_VERSION} active canon / ${DRAFT_TARGET_VERSION} system draft`;
export const CURRENT_SPEC_VERSION_LABEL = `Bitcode Spec ${CURRENT_CANON_OPERATOR_LABEL}`;
export const CURRENT_POLICY_REF = `policy://engi/spec-${ACTIVE_CANON_VERSION.toLowerCase()}-active-${DRAFT_TARGET_VERSION.toLowerCase()}-system-draft/current`;

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
    documentTitle: `Bitcode Demo — ${ACTIVE_CANON_VERSION} canon / ${DRAFT_TARGET_VERSION} system draft`,
    policyRef: CURRENT_POLICY_REF,
    activeProvenAppendixPath: ACTIVE_PROVEN_APPENDIX_PATH,
    draftSpecPath: DRAFT_SPEC_PATH,
    draftDeltaPath: DRAFT_DELTA_PATH,
    draftParityPath: DRAFT_PARITY_PATH,
    inheritedCanonSurfaceLabel: 'V16/V17/V18/V19/V20/V21',
    heroEyebrow: 'Bitcode deterministic local prototype',
    heroLede: `Active canon is ${ACTIVE_CANON_VERSION}: full-system current canon, generated-only proof appendix discipline, exact proof-family inventories, and executable promotion truth. ${DRAFT_TARGET_VERSION} is the current system draft target, and runtime, API, browser shell, tests, and demo-local docs must stay aligned to this posture source so canon drift fails closed under Bitcode.`,
    heroTip: `Hover or focus the info badges beside core Bitcode terms to get plain-language explainers. The active generated appendix target is ${ACTIVE_PROVEN_APPENDIX_PATH}; current posture checks fail closed when runtime, API, browser shell, tests, or demo-local docs drift from the pointed canon.`
  };
}

export const CURRENT_CANON_POSTURE = buildCanonPosture();
