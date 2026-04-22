/**
 * Compatibility shim for the historical composed VCS list-repositories entry.
 *
 * V26 keeps one active implementation in `src/index.ts` and re-exports it here
 * so retained callers do not drift onto a second stale implementation surface.
 */

export { listRepositoriesTool } from './index';
