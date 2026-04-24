# Bitcode ChatGPT App Interface Notes

Status: non-canonical internal note.

## Purpose

The ChatGPT App is an admitted connected interface over Bitcode Exchange state.

It can:
- gather Need/Give context,
- show source and evidence summaries,
- request Need measurement,
- present Need review state,
- show fit qualities,
- deliver AssetPack receipts,
- emit connected-interface write-admission receipts.

It must not:
- own Exchange state,
- bypass Terminal/Exchange proof requirements,
- write unconfirmed connected-interface changes,
- use generic work-board examples as Bitcode product semantics.

## Requirements For SPEC Promotion

- tool names must be Bitcode-specific,
- output payloads must normalize to Need, fit, AssetPack, proof, settlement, or delivery evidence,
- UI components must distinguish model-visible content from component-only hydration data,
- authentication and authorization must fail closed for user-specific or write-capable data.
