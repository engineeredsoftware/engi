# Conversations Generics

Retained Bitcode conversation-domain package for fourth-gate convergence.

## Role In V26

This package remains admitted because fullscreen conversations are still part of the merged-world Bitcode application and need explicit prompt/type ownership before fifth-gate proof closure.

It owns:
- conversation domain types and validation helpers
- the retained conversation agent abstraction
- the canonical conversation system prompt composition

It does not own:
- route orchestration
- persistence writes
- UI composition

Those remain with the application and API owners.

## Architectural Rule

Use this package when a Bitcode conversation surface needs:
- shared conversation types
- validation helpers
- retained agent behavior
- prompt-system composition that should survive into proof-bearing V26

Do not duplicate those contracts in route-local code.
