# ENGI Demo Prototype

Local prototype for the ENGI weekend demo.

Current scope:
- public deposit commitments
- sealed private asset payloads
- deterministic measurement scores
- licensed bundle issuance
- public receipts
- contributor allocation ledger
- simple utility receipt updates

This implementation intentionally uses no external dependencies so it can run immediately in the current workspace.

## Run

```bash
cd /Users/garrettmaring/.openclaw/workspace/engi-demo
npm start
```

Then open <http://localhost:4318>.

## Notes

- This is the shell of the demo, not the final proof stack.
- The trusted-kernel ideas from the design conversation are modeled as deterministic pure functions in `src/engi-core.js`.
- Public APIs never expose full deposited content; only bundle issuance returns selected chunks.
