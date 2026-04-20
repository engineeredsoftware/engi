# ENGI Spec V10 Notes

## What V10 changes relative to V9

V10 is not a broad redesign.
It is a boundary-quality upgrade.

V9 made ENGI final enough across prompt, proof, privacy, receipts, accounting, and scenario realism.
V10 focuses on the remaining weak boundary:

- how artifacts enter the system,
- how those artifacts are addressed,
- how they are signed,
- and how GitHub App auth is represented.

## The most important V10 shift

The key shift is:

- from raw deposit-first
- to repo artifact selection-first

That does not mean raw content disappears.
It means raw content becomes an explicit fallback or operator note, rather than the main mental model.

## Why this matters

ENGI claims:

- repository-bound engineering artifacts,
- proof-bearing selection,
- authorization-aware delivery,
- and settlement over selected engineering contributions.

If intake still starts as “paste text into a box,” the model is weaker than the rest of the system.
V10 fixes that mismatch.

## Identity/auth language cleanup

V10 avoids vague umbrella naming where a more precise surface exists.

Use these names:

- artifact selection surface
- addressing surface
- signing surface
- GitHub App auth surface

Keep these concepts distinct even when they are tightly related.

## Local demo truthing

The local V10 demo is still Profile A.
That is acceptable.

The important rule is honesty:

- modeled auth payloads must read as modeled,
- live GitHub/App calls must remain external,
- installation-scoped payload shapes should still be explicit and inspectable.

## Likely first V10 implementation slice

The highest-value first slice is:

1. modeled authenticated repo sessions,
2. seeded repo artifact inventory,
3. selection-first intake UX,
4. stronger candidate/manifests/proof payloads for address + signing + GitHub App auth.

## What landed in this first V10 implementation pass

The initial V10 repo pass now includes:

- modeled authenticated GitHub App repo sessions in demo state,
- seeded repo artifact inventory spanning multiple repos and artifact kinds,
- selection-first intake UX in `engi-demo/public/index.html` and `engi-demo/public/app.js`,
- deposit normalization that can build a candidate asset from selected repo inventory entries without requiring raw-only content,
- explicit candidate surfaces for:
  - artifact selection,
  - addressing,
  - signing,
  - GitHub App auth,
- stronger identity bindings and identity/auth proof checks that account for installation-scoped auth and inventory-backed selections.

The local boundary remains honest:

- live GitHub installation-token minting is still not implemented,
- live repo fetch/write behavior is still external.

## Frontier work V10 exposes next

After the first V10 slice, the next obvious steps are:

- live GitHub inventory fetch and refresh semantics,
- real GitHub App token exchange,
- installation-permission-specific authorization decisions,
- real branch/PR delivery payloads,
- stronger signer/org verification boundaries.

## Versioning note

V10 lives in new V10 files.
It does not overwrite V9.
It does not repoint `ENGI_SPEC.txt`.
