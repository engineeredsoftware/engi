// @ts-check

/**
 * @param {{
 *   theoremId: string,
 *   passed: boolean,
 *   witnessArtifactPaths?: readonly unknown[],
 *   replayArtifactPaths?: readonly unknown[],
 *   replayStepIds?: readonly unknown[],
 *   failureReasons?: readonly unknown[]
 * }} input
 * @returns {{
 *   theoremId: string,
 *   passed: boolean,
 *   witnessArtifactPaths: string[],
 *   replayArtifactPaths: string[],
 *   replayStepIds: string[],
 *   failureReasons: string[]
 * }}
 */
export function buildTheoremVerdict({
  theoremId,
  passed,
  witnessArtifactPaths = [],
  replayArtifactPaths = [],
  replayStepIds = [],
  failureReasons = []
}) {
  return {
    theoremId,
    passed,
    witnessArtifactPaths: summarizeStrings(witnessArtifactPaths),
    replayArtifactPaths: summarizeStrings(replayArtifactPaths),
    replayStepIds: summarizeStrings(replayStepIds),
    failureReasons: summarizeStrings(failureReasons)
  };
}

/**
 * @param {{
 *   artifactPath: string,
 *   role: string,
 *   theoremIds?: readonly unknown[],
 *   requiredForWitness?: boolean,
 *   requiredForReplay?: boolean
 * }} input
 */
export function buildArtifactBinding({
  artifactPath,
  role,
  theoremIds = [],
  requiredForWitness = true,
  requiredForReplay = true
}) {
  return {
    artifactPath,
    role,
    theoremIds: summarizeStrings(theoremIds),
    requiredForWitness,
    requiredForReplay
  };
}

/**
 * @param {{
 *   stepId: string,
 *   theoremIds?: readonly unknown[],
 *   requiredArtifactPaths?: readonly unknown[],
 *   instruction: string
 * }} input
 */
export function buildReplayStep({
  stepId,
  theoremIds = [],
  requiredArtifactPaths = [],
  instruction
}) {
  return {
    stepId,
    theoremIds: summarizeStrings(theoremIds),
    requiredArtifactPaths: summarizeStrings(requiredArtifactPaths),
    instruction
  };
}

/**
 * @param {Array<{ passed?: boolean }>} [theoremVerdicts=[]]
 * @returns {boolean}
 */
export function allTheoremsPassed(theoremVerdicts = []) {
  return theoremVerdicts.every((entry) => entry.passed === true);
}

/**
 * @param {readonly unknown[]} [values=[]]
 * @returns {string[]}
 */
export function summarizeStrings(values = []) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
}
