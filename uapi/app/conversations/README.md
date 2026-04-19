# `/app/conversations` Bitcode Conversations

`/conversations` is the direct fullscreen conversation mode for Bitcode V26.

It exists so the chat-based application interface remains a first-class application surface while
fourth-gate converges retained conversations inward to `/application`.

Current owners:
- `page.tsx`
  Direct route metadata for the fullscreen conversations surface.
- `ConversationsRouteClient.tsx`
  Route-local shell that keeps conversations tied to the application and returns closed routes to `/application`.
- `components/ConversationsOverlay.tsx`
  The active fullscreen/floating/sidebar conversation owner used by both the direct route and embedded application entry points.
- `../api/conversations/*`
  App-owned JSON and mock-mode API carriers for list, branch, and stream behavior.

This route should stay explicit about:
- fullscreen application-mode continuity,
- return flow back into transactions,
- retained conversation API boundaries,
- and fourth-gate ownership of the chat-based interface rather than treating it as brochure or sidebar residue.
