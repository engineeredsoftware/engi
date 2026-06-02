// @ts-check

/**
 * Canonical Bitcode pointer predicates must keep older generated artifacts
 * green after a later promotion while still rejecting regressed pointers.
 *
 * @param {unknown} value
 * @returns {number | null}
 */
export function parseBitcodeVersionNumber(value) {
  const match = String(value ?? '').trim().match(/^V(\d+)$/u);
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

/**
 * @param {unknown} version
 * @param {string} minimumVersion
 * @returns {boolean}
 */
export function bitcodeVersionAtLeast(version, minimumVersion) {
  const versionNumber = parseBitcodeVersionNumber(version);
  const minimumNumber = parseBitcodeVersionNumber(minimumVersion);
  return versionNumber !== null && minimumNumber !== null && versionNumber >= minimumNumber;
}
