export const BITCODE_TRANSACTION_FILTER_EXPLAINERS = {
  search: {
    title: 'Search transactions',
    description:
      'Searches transaction id, type, repository, branch, participant, proof posture, and summary text so the master table stays terminal-fast without leaving `/application`.',
  },
  status: {
    title: 'Status filter',
    description:
      'Narrows the master table by current transaction lifecycle state such as completed, running, or failed.',
  },
  ownership: {
    title: 'Ownership filter',
    description:
      'Separates the operator’s own Bitcode transactions from broader network-visible activity while preserving the same detail surface.',
  },
  transactionLens: {
    title: 'Action lens filter',
    description:
      'Focuses the master table on Give, Need, or Closure posture so the two primary Bitcode actions and their closure path stay legible.',
  },
  repository: {
    title: 'Repository filter',
    description:
      'Limits the table to one repository boundary when the application is reading multiple Bitcode transaction contexts.',
  },
  participant: {
    title: 'Participant filter',
    description:
      'Filters by the producer, consumer, partner, or researcher label attached to the surfaced transaction rows.',
  },
  proofStatus: {
    title: 'Proof posture filter',
    description:
      'Reduces the table by bounded proof state so operators can isolate refreshes, witness checks, and ready-for-review transaction rows.',
  },
  sort: {
    title: 'Sort order',
    description:
      'Re-orders the master table by recency or economic weight without changing the selected-transaction detail route.',
  },
  pageSize: {
    title: 'Page size',
    description:
      'Controls how many Bitcode transaction rows the master table shows at once while preserving route-owned pagination state.',
  },
} as const;

export const BITCODE_TRANSACTION_COLUMN_EXPLAINERS = {
  transaction: {
    title: 'Transaction column',
    description:
      'Shows the transaction id, type, and summary. Selecting a row here loads the central transaction detail workspace.',
  },
  lens: {
    title: 'Lens column',
    description:
      'Shows whether the row currently reads most strongly as Give, Need, or Closure posture inside the Bitcode flow.',
  },
  status: {
    title: 'Status column',
    description:
      'Shows the current lifecycle state for the transaction so active work and completed closure stay distinguishable.',
  },
  participant: {
    title: 'Participant column',
    description:
      'Shows the surfaced principal label and whether the transaction is your own or broader network activity.',
  },
  repository: {
    title: 'Repository column',
    description:
      'Shows the repository boundary plus the active branch or ref associated with the transaction row.',
  },
  proof: {
    title: 'Proof column',
    description:
      'Shows the bounded proof posture and current closure focus carried by the transaction before opening detail.',
  },
  started: {
    title: 'Started column',
    description:
      'Shows the surfaced transaction start timestamp so the master table can be read as a live operations ledger.',
  },
} as const;

export const BITCODE_PAYLOAD_INSPECTOR_EXPLAINERS = {
  modes: {
    title: 'Visual and raw modes',
    description:
      'Visual mode renders curated Bitcode cards for fast reading. Raw JSON exposes the exact payload feeding the application-owned detail surface.',
  },
  rawPayload: {
    title: 'Raw payload view',
    description:
      'The raw view is intended for exact payload inspection, proving, typing, and debugging when the visual carrier is not precise enough.',
  },
} as const;
