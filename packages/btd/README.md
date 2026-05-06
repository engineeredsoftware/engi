# BTD Core

Canonical `$BTD` registry, read-right, BTC-fee, and measureminting utilities
for Bitcode.

This package owns:
- the 21,000,000-cell fixed supply ceiling
- fixed-supply measureminting decay and zero-cell tail receipts
- proof-addressable semantic volume measurement
- contiguous AssetPack range allocation and mint receipts
- contributor allocation, access evaluation, ancestry review, and revenue routing
- wallet-signed BTC fee receipts, ledger anchors, Exchange rights transfers,
  Terminal journals, reconciliation, telemetry, and upgrade receipts

`$BTD` is not a fungible fee token. BTC pays fees. `$BTD` represents a
non-fungible AssetPack share/read-right and the measured Bitcode amount in
content. V27 issuance follows measured Need-Fit-Prove-Settle admission through
the measureminting curve; valid tail events may emit zero-cell receipts rather
than failing the measurement.

The current database layer still exposes `user_credits` as a storage carrier
for aggregate holding reads until the persistence schema is re-cut. This
package must not mutate it as a spendable balance bucket.

```ts
import {
  buildGenerationBitcodeAccounting,
  BTD_MAX_MINTABLE_SUPPLY,
  applyBtdMeasureMint,
  calculateLlmBtcFeeEstimate,
  buildLicensedReadRevenueRoute,
  getBtdBalance,
  measureProofAddressableSemanticVolume,
  readBtdHoldings,
} from '@bitcode/btd';
```
