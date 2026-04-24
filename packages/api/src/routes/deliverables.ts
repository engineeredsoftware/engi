/**
 * Compatibility export for retained `/api/deliverables` callers.
 *
 * Active implementation lives in `routes/shippables.ts` because V26 Finish
 * delivers Shippables backed by AssetPack evidence.
 */

export { DELETE, GET, POST } from './shippables';
