/** @type {Record<string, any>} */
export const RECEIPT_SCHEMAS = {
  deposit: {
    predicateType: 'https://engi.software/receipt/deposit/v1',
    required: ['type', 'receiptId', 'assetId', 'title', 'author', 'assetRoot', 'issuedAt'],
    publicClaim: 'An asset commitment was accepted into the depot without revealing the sealed payload.'
  },
  bundle_issuance: {
    predicateType: 'https://engi.software/receipt/bundle-issuance/v1',
    required: ['type', 'receiptId', 'bundleId', 'bundleRoot', 'queryHash', 'meteredUnits', 'chunkRefs', 'issuedAt'],
    publicClaim: 'A licensed reader received a private bundle derived from committed assets.'
  },
  allocation: {
    predicateType: 'https://engi.software/receipt/allocation/v1',
    required: ['type', 'receiptId', 'bundleId', 'totalUnits', 'allocations', 'issuedAt'],
    publicClaim: 'Licensed read value was allocated across contributing assets in a conservation-preserving way.'
  },
  utility: {
    predicateType: 'https://engi.software/receipt/utility/v1',
    required: ['type', 'receiptId', 'bundleId', 'benchmark', 'baselineBp', 'treatmentBp', 'upliftBp', 'issuedAt'],
    publicClaim: 'Licensed bundle consumption produced measurable benchmark lift.'
  }
};

/**
 * @param {any} type
 * @returns {any}
 */
export function schemaForReceipt(type) {
  return RECEIPT_SCHEMAS[type] || null;
}
