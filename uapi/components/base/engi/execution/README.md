# Shared Execution Carriers

This directory holds the reusable execution-level components that power Bitcode transactions master-detail, selected-transaction detail, explainers, and payload reading.

The V26 second-gate rule for this layer is simple:
- if a transaction/detail/payload pattern appears repeatedly across `/application`, conversations, or related retained workspaces, it should converge here as a typed, testable carrier.

## Main component groups

- transactions master
  - `BitcodeTransactionsTable.tsx`
  - `BitcodeTransactionsFilterBar.tsx`
  - `BitcodeTransactionsActiveFilters.tsx`
  - `BitcodeTransactionsDataTable.tsx`
  - `BitcodeTransactionsPagination.tsx`
- selected-detail structure
  - `BitcodeDetailRowList.tsx`
  - `BitcodeMetricGrid.tsx`
  - `BitcodeDetailCollection.tsx`
  - `BitcodeDetailPanel.tsx`
  - `BitcodeChipCloud.tsx`
  - `BitcodeActionPillRow.tsx`
- payload reading
  - `BitcodePayloadInspector.tsx`
  - `BitcodePayloadShape.tsx`
  - `BitcodePayloadTree.tsx`
  - `BitcodePayloadRowsCard.tsx`
  - `BitcodePayloadCollectionCard.tsx`
  - `BitcodePayloadDetailCard.tsx`
- help and explainers
  - `BitcodeInlineExplainer.tsx`
  - `bitcode-transaction-explainers.ts`
- activity/log streams
  - `BitcodeExecutionStreamPanel.tsx`

## Design goals

- route-owned orchestration, shared presentation carriers
- typed props and predictable field-group shapes
- consistent explainers and payload posture
- stable accessibility and test selectors
- no fallback to raw page-local `<pre>` blocks for important JSON-bearing detail
- markdown/documentation parity with the active transaction-detail and payload carriers during second-gate closure

## Used by

- [../../../app/application/README.md](../../../app/application/README.md)
- transaction detail cards under `uapi/app/application/*`
- retained execution/log readers that continue to converge inward during V26
