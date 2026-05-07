# `/app/conversations` Bitcode Conversations

`/conversations` is the direct fullscreen conversation mode for Bitcode V26.

It exists so the chat-based application interface remains a first-class application surface while
fourth-gate converges retained conversations inward to `/terminal`.

Current owners:
- `page.tsx`
  Direct route metadata for the fullscreen conversations surface.
- `ConversationsRouteClient.tsx`
  Route-local shell that keeps conversations tied to the application and returns closed routes to `/terminal`.
- `components/ConversationsOverlay.tsx`
  The active fullscreen/floating/sidebar conversation owner used by both the direct route and embedded application entry points.
- `../api/conversations/*`
  App-owned JSON and mock-mode API carriers for list, branch, and stream behavior.

This route should stay explicit about:
- fullscreen terminal-mode continuity,
- return flow back into the Bitcode activity ledger,
- rich-input continuity for source attachments, asset-pack references, and output destinations,
- retained conversation API boundaries,
- and fourth-gate ownership of the chat-based interface rather than treating it as brochure or sidebar residue.
