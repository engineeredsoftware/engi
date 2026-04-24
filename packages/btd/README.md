# BTD Core

Canonical `$BTD` balance operations for Bitcode.

This package owns:
- atomic `$BTD` debits and additions
- model-aware LLM cost conversion into `$BTD`
- reservation / escrow helpers for pipeline execution
- shared `$BTD` bundle definitions

The current database layer still uses compatibility carriers such as
`user_credits`, `user_credit_usages`, and `credit_reservations`, but the
package contract is Bitcode-native:

```ts
import {
  deductBtdBalance,
  addBtdBalance,
  deductGenerationBtd,
  deductLlmBtdByModel,
  reserveBtdBalance,
  recordBtdReservationUsage,
  closeBtdReservation,
  withBtdReservation,
  calculateLlmBtdDebit,
  InsufficientBtdBalanceError,
  btdBundles,
  btdBundleList,
} from '@bitcode/btd';
```

Typical usage:

```ts
await withBtdReservation(userId, async (reservation) => {
  await recordBtdReservationUsage(reservation.id, 20);
  return runPipeline();
}, { pipelineType: 'asset-pack' });
```

Bundle helpers:

```ts
import { btdBundles, type BtdBundleConfig } from '@bitcode/btd';

const production = btdBundles.production;
```
