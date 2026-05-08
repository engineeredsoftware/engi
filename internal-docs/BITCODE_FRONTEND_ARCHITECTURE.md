# Bitcode Frontend Architecture Notes

Status: non-canonical internal note.

## Product Surfaces

V26 frontend architecture is organized around:
- Bitcode Terminal at `/terminal`,
- Bitcode Exchange activity, Transactions, and history surfaces,
- conversations as rich input overlays,
- auxillaries for identity/readiness,
- executions as a compatibility activity corridor,
- marketing/docs surfaces that must teach Bitcode source-to-shares semantics.

## Interface Rules

- Terminal is the primary operator surface.
- Exchange activity is the shared reread model.
- Conversations must write into the same Exchange state.
- Auxillaries provide wallet, provider, repository, and interface readiness.
- Compatibility execution pages may remain, but copy and component semantics must be Bitcode-owned.
- Removed controls, including public compute and orchestration toggles, must not return.

## Component Language

Prefer:
- `BitcodeTerminal*`,
- `ExchangeActivity*`,
- `NeedReview*`,
- `FitReview*`,
- `AssetPack*`,
- `Settlement*`,
- `Finish*`,
- `DeliveryMechanism*`,
- `Auxillaries*`.

Avoid new work-item-first, output-object-first, pre-Finish, or non-Bitcode product names.
