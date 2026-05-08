# @bitcode/protocol

Formal Bitcode protocol package for commercial source.

V28 starts the separation between the deterministic `protocol-demonstration`
reference and commercial runtime imports. Commercial surfaces should import
protocol state, API context, and protocol primitives from this package rather
than importing the standalone demonstration package.

Some implementation internals are still freshly ported from the demonstration
and intentionally retain source proximity for parity. V29 must continue
commercializing those internals into narrower packages and cleaner module
boundaries.
