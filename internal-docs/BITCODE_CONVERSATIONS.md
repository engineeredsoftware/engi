# Bitcode Conversations Notes

Status: non-canonical internal note.

## Role

Conversations are a rich Bitcode input surface. They can collect source evidence, attachments, context, Need/Give intent, output destinations, and follow-up instructions without becoming a separate product model.

The conversation surface must write into the same Exchange activity and execution model as Terminal.

## Required Semantics

Conversations can:
- gather Need or Give context,
- attach files, URLs, repository references, and connected-interface context,
- start or continue Bitcode executions,
- show execution state and proof receipts,
- route final AssetPacks to delivery mechanisms,
- reread persisted state.

Conversations must not:
- own a parallel pipeline model,
- invoke removed multi-pipeline controls,
- hide Need review,
- bypass source-to-shares fit review,
- create connected-interface writes without admission receipts.

## Mention and Slash Concepts

If conversation shortcuts exist, they should name Bitcode concepts:
- `/need` for measured Need creation,
- `/asset-pack` for AssetPack synthesis,
- `/fit-review` for fit-quality review,
- `/delivery` for destination and delivery-mechanism state,
- `/proof` for proof and settlement receipts.

Compatibility aliases should be hidden from operator copy and bounded in tests/proofs until removed.

