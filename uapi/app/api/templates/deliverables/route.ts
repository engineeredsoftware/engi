/**
 * Compatibility route for retained `/api/templates/deliverables` callers.
 * Active Bitcode template behavior is owned by `/api/templates/shippables`.
 */
export { GET, POST, runtime } from '../shippables/route';
