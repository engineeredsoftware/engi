# BTD Core

Canonical `$BTD` read and measurement utilities for Bitcode.

This package owns:
- aggregate `$BTD` holding reads from the current storage carrier
- measured non-fungible `$BTD` content amount helpers
- BTC fee-basis helpers for model usage
- shared `$BTD` bundle definitions

`$BTD` is not a fungible fee token. BTC pays fees. `$BTD` represents a
non-fungible AssetPack share/read-right and the measured Bitcode amount in
content.

The current database layer still exposes `user_credits` as a storage carrier
for aggregate holding reads until the persistence schema is re-cut. This
package must not mutate it as a credit bucket.

```ts
import {
  buildGenerationBitcodeAccounting,
  calculateLlmBtcFeeEstimate,
  calculateMeasuredBtdFromTokens,
  getBtdBalance,
  readBtdHoldings,
  btdBundles,
  btdBundleList,
} from '@bitcode/btd';
```
