# Bitcode Spec V26 KISS

## Status

- Scope: concise V26 specification companion for the Bitcode source-to-shares protocol, products, proofs, and fifth-gate closure direction
- Current canonical/latest target: `V26`
- Canonical pointer: `BITCODE_SPEC.txt` -> `V26`
- Active canonical anchor: `BITCODE_SPEC_V26.md`
- Active generated proof appendix: `BITCODE_SPEC_V26_PROVEN.md`
- Canonical proof-source commit: `9d0733fed5f63d2f977900384d4103f9fd887f03`
- Prior canonical anchor: recorded in `BITCODE_SPEC_V26_NOTES.md` only; it is not active V26 truth
- Prior generated proof appendix: recorded in `BITCODE_SPEC_V26_NOTES.md` only; it is not active V26 truth
- Generated structured artifact inventory: active canonical `.bitcode/v19-*` reproducible reports, `.bitcode/v20-*` operator-quality reports, `.bitcode/v26-spec-family-report.json`, `.bitcode/v26-canonical-input-report.json`, `.bitcode/v26-gate-checkpoint-report.json`, `.bitcode/conversations-continuity-proof.json`, `.bitcode/runs-pipelines-totality-proof.json`, `.bitcode/persistence-schema-totality-proof.json`, `.bitcode/prompt-system-totality-proof.json`, `.bitcode/inference-implementation-records-proof.json`, `.bitcode/fourth-gate-reclosure-review-proof.json`, `.bitcode/source-to-shares-fifth-gate-proof.json`, `.bitcode/fifth-gate-closure-deepening-proof.json`, `.bitcode/retained-package-admissibility-proof.json`, and `BITCODE_SPEC_V26_PROVEN.md`
- Source parity state: V26 source work has material first-through-fourth-gate implementation and proof evidence, fifth-gate implementation remains active, and later gates remain open
- V26 state: V26 remains the active Bitcode canon; this KISS companion is a concise reading aid and version-diff carrier, not a replacement for the full `BITCODE_SPEC_V26.md`

## Concise full-system specification

Bitcode V26 is the productization version of the source-to-shares system.
It specifies and implements Bitcode as one auditable protocol plus product family:
- the Protocol defines source supply, measured demand, fit, proof, settlement, shares, and replayable evidence;
- the Exchange is the deployed state, API, persistence, run, settlement, and ledger side of the protocol;
- the Terminal is the operator product experience for giving source, needing work, reviewing measured Needs, reviewing fits, accepting settlement, and rereading receipts;
- admitted interfaces such as MCP, ChatGPT App, webhooks, GitHub, and other connected tools are ingress or delivery surfaces, not parallel product owners;
- `protocol-demonstration` remains the deterministic lower-rail protocol witness while `uapi`, `packages/*`, persistence, proof generators, and interface packages carry the commercial implementation rails.

The shortest V26 rule is: every active source path must explain how it helps Bitcode turn source into accepted shares with auditable engineering knowledge for customers.
If a source path cannot answer that, it must be re-specified, bounded as support, archived, or removed.

## Gate commitments

V26 is governed by eight gates:
1. first-gate moves protocol ownership into app/package owners while preserving deterministic protocol behavior;
2. second-gate makes the application route and external interfaces coherent enough for the product rail;
3. third-gate refurbishes public/product teaching;
4. fourth-gate is accepted only through explicit reclosure proof after earlier closure claims were overstated;
5. fifth-gate closes minimum-functional Exchange and Terminal behavior plus broad current-world reform into Bitcode-only active source;
6. sixth-gate raises Exchange, Terminal, Protocol, Proofs, and admitted interfaces to MVP;
7. seventh-gate refines the testnet system toward initial commercial viability;
8. eighth-gate closes whole-repository provation and the V26 definition of need.

Fifth-gate is mostly implementation work.
Proof improvements matter, but they do not close the gate unless packages, interfaces, prompts, agents, pipelines, routes, persistence, source comments, docs, tests, and generated proof inputs are all aligned to current Bitcode meaning.

## Protocol, products, and proofs

The canonical object flow is:
1. source is supplied, normalized, projected, and made auditable;
2. a user expresses a Need;
3. Terminal conversation writes preserve source attachments, output destinations, AssetPack references, and Need-measurement intent as normalized rich-input evidence on the Exchange execution row;
4. discovery and measurement synthesize a reviewable Need with evidence;
5. the operator can accept, reject, or request re-measurement with feedback;
6. fit candidates are found and presented with quantized objective-contract fit qualities;
7. accepted settlement materializes source-to-shares accounting;
8. AssetPack pipeline runs synthesize Need-satisfaction AssetPack contents and evidence;
9. Finish stores Exchange evidence, records receipts, and optionally emits delivery-mechanism artifacts such as pull requests, comments, issues, reviews, or other connected-interface outputs;
10. Terminal and connected interfaces reread the same Exchange state and proof evidence.

Terminology is part of the system contract:
- `Need` is the measured and reviewable demand object.
- `AssetPack` is the stable Bitcode carrier for synthesized Need-satisfaction output and proof/evidence.
- `AssetPack synthesis artifact` means the implementation-phase output that captures the intelligence or source mutation being produced.
- `stored AssetPack evidence` means Exchange-side evidence committed for reread, proof, receipt, and settlement.
- `delivery-mechanism artifact` means a third-party provision of the AssetPack or AssetPackPartial, such as a pull request.
- `Delivering` is the narrower act inside Finish that provides AssetPacks or AssetPackPartials to third-party tools.
- `Finish` is the final phase that saves, evidences, summarizes, and invokes any delivery mechanism.

## Fifth-gate closure priorities

The remaining fifth-gate work is prioritized by closure leverage:
- reform active filesystem names and exported names so live package owners are Bitcode nouns rather than compatibility nouns;
- complete AssetPack pipeline refurbishment across SDIVF phases, agents, tools, prompts, runtime outputs, postprocess types, tests, and route/API compatibility wrappers;
- make every Prompt, PromptPart, Registry primitive, agent prompt, tool prompt, and doc-comment injection path current-Bitcode precise;
- finish package and interface parity for Terminal, Exchange APIs, MCP, ChatGPT App, webhooks, Supabase/ORM state, execution history, conversation rich-input execution evidence, and connected-interface write admission;
- ensure Need review and fit review are explicit before settlement, including accept/reject/re-measure and fit-quality receipts;
- keep computer-use as internal feature-flagged Need-measurement support and remove non-admitted orchestration families from V26 product scope;
- remove source-co-located build output from TypeScript package proof ownership;
- regenerate proofs after source-bearing reforms so stale proof prose cannot preserve removed semantics.

## Version-diff reading rule

`BITCODE_SPEC_V26_KISS.md` is the simplest high-level diff carrier for V26.
Future versions should be readable by comparing `BITCODE_SPEC_VN_KISS.md` files first, then the formal DELTA, then the full SPEC.

The KISS companion intentionally does not carry enough density to implement the system by itself.
It must remain concise, current, and product/protocol/proof complete at the level of direction.
The full `BITCODE_SPEC_V26.md` remains the implementation-grade document.

## Completion signal

V26 fifth-gate is not closed until the live repository reads as Bitcode and only Bitcode at active abstraction boundaries.
The closure signal is:
- minimum-functional Exchange state and Terminal user experience exist and reread the same source-to-shares truth;
- AssetPack SDIVF runs can measure Needs, synthesize AssetPack contents, validate them, Finish them, store evidence, and optionally Deliver through connected mechanisms;
- packages and interfaces are specified, implemented, tested, and proven at their admitted Bitcode roles;
- active source, comments, docs, prompts, package READMEs, route/API copy, and generated proof inputs no longer require historical product knowledge;
- generated V26 proof artifacts pass after the source-bearing work.
