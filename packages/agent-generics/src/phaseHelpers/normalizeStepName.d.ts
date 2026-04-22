/**
 * normalizeStepName - shared helper for mapping raw step identifiers into the
 * canonical PTRR vocabulary used across Bitcode surfaces (logs, dashboards, tests).
 *
 * Historically this lived inside the uapi execution UI, but multiple packages
 * – including the conversations overlay and jest suites – now depend on a
 * stable export from @bitcode/agent-generics.  This module provides that single
 * source of truth so both runtime code and tests stay aligned.
 */
export declare function normalizeStepName(step?: string): string;
export default normalizeStepName;
