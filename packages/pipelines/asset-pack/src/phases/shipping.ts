/**
 * Compatibility wrapper for callers still importing the Finish phase through
 * shipping names.
 * Canonical V26 implementation lives in `./finish`.
 */

export {
  createFinishPhaseConfig,
  runFinishPhase,
  registerFinishAgentsForType,
  createShippingPhaseConfig,
  runShippingPhase,
  registerShippingAgentsForType
} from './finish';

export { createFinishPhaseConfig as default } from './finish';
