Bitcode V26 Frontend Architecture Guide

Principles
- Single surface for executions: GA‑1 ships only deliverables; the second executions tab is a Measure pipeline placeholder that currently mirrors deliverables postprocessed output.
- CSS Modules everywhere: local, predictable, and fast. No styled‑jsx.
- Shared base primitives live in `app/components/base/bitcode`; vendor UI in `app/components/base/shadcn`.
- Minimize global CSS; prefer module classes and :global only for legacy class names.
- Motion‑safe: respect prefers‑reduced‑motion, scope keyframes.

Directory Map (selected)
- `components/base/bitcode/*` — retained Bitcode primitives in the current filesystem carrier
- `components/base/shadcn/*` — Vendor UI primitives (ShadCN)
- `app/components/conversations/*` — overlay experience impl (formerly Big‑O)
- `app/components/orbital/*` — historical overlay implementation carrier
- `app/conversations/components/*` — app-layer helper(s) for conversations (e.g., AddConversationsToApp)
- `app/orbital/components/*` — app-layer helper(s) for orbital (e.g., AddOrbitalToApp)
- `app/api/conversations/*` — conversations API routes
- `app/api/orbital/*` — orbital API route shims (forward current user/* endpoints)
- `app/executions/components/*` — route experience (Execution*)
- `app/components/marketing/*` — marketing components (Marketing*)

Prefixes
- Execution*: execution route scope
- Conversation*: conversations overlay scope
- Orbital*: overlays/settings scope
- Marketing*: marketing-only components
- Base Bitcode primitives: no prefix
- ShadCN vendor primitives: imported from `components/base/shadcn/*` (vendor family provides the namespace)

Shared Primitives
- MetalPlate: `components/base/bitcode/metal-plate.tsx`
- RevealingSoonOverlay: `components/base/bitcode/overlays/RevealingSoonOverlay.tsx`
- GlassyInput: `components/base/bitcode/inputs/GlassyInput.tsx`
- Glassy menus: `components/base/bitcode/menus/glassy-menu.module.css`
- Glassy selects: `components/base/bitcode/selects/glassy-select-styles.ts`

Styling Conventions
- Always use `*.module.css` next to the component.
- Prefer Tailwind utilities for layout/spacing if already used; keep effects/animations in CSS Modules.
- Use :global in modules only to target legacy class names or 3rd‑party markup.

Postprocessed Model
- Types: `app/types/api.ts` (PostprocessedResult)
- API: `app/api/executions/postprocessed/route.ts`
- UI: `app/executions/components/CompleteHeaderContent.tsx`

Testing & Stories
- Smoke test primitives with @testing-library/react.
- Storybook covers MetalPlate, RevealingSoonOverlay, GlassyInput, GlassySelect, Conversations input and pickers.

Migration Notes
- Big‑O → Conversations: re-home under `app/components/conversations/*` and prefix components `Conversation*`.
- Historical orbital overlay: retained only as a filesystem carrier while canonical product language is auxillaries.
- Execution-only components: place under `app/executions/components` with `Execution*` prefix.
- Marketing components: place under `app/components/marketing/*` with `Marketing*` prefix.

## The Four Experience Categories

The Bitcode application consists of four core experience categories, each serving a distinct purpose:

### 1. Conversations 🗨️
- **Type**: Overlay experience
- **Access**: Floating orb (bottom-right) or Cmd+K
- **Purpose**: Interactive chat interface for real-time AI collaboration
- **Key Features**:
  - Multiple view modes (floating, sidebar, fullscreen, split)
  - Real-time SSE streaming
  - Rich text input with token awareness
  - Embedded pipeline execution logs

### 2. Auxillaries 🌍
- **Type**: Modal overlay experience
- **Access**: User avatar menu or "Login" button
- **Purpose**: Account, connections, interfaces, and `$BTD` hub
- **Key Features**:
  - Four main panes (Profile, Connects, Interfaces, BTD)
  - Orbital ring animations (GPU-accelerated)
  - Instant loading with React Query
  - Onboarding flow integration

### 3. Activity 🚀
- **Type**: Page experience
- **Routes**: `/executions` compatibility route teaching the merged-world `activity` master/detail surface
- **Purpose**: Transaction-first activity search, monitoring, and proof playback
- **Key Features**:
  - Searchable master/detail posture
  - Real-time transaction and execution monitoring
  - Proof playback and closures
  - Public, buyer, reviewer, and internal projections

### 4. Transactions
- **Type**: Page experience
- **Routes**: `/application`
- **Purpose**: Give-space and need-space transaction authoring, review, and closure
- **Key Features**:
  - Write-space for supply, need, proof, and settlement operations
  - Activity-linked detail surfaces
  - Conversational and auxillary bridge surfaces

## Visual Design System

### Color Palette
- **Primary Gate Colors**:
  - Sky Blue (#38bdf8): Design gate
  - Emerald (#10b981): Develop gate
  - Amber (#f59e0b): Digest gate
- **Neutral**:
  - Background: #0a0a0a
  - Surface: #1a1a1a
  - Border: #2a2a2a
  - Text: #e5e5e5

### Design Principles
- **Dark Theme**: Consistent dark background throughout
- **Glassmorphism**: Blur and transparency effects
- **GPU Acceleration**: Transform optimizations for animations
- **Lazy Loading**: Dynamic imports for performance

### Typography
- **Sans**: -apple-system, BlinkMacSystemFont, "Segoe UI"
- **Mono**: "Fira Code", "Cascadia Code", monospace
- **Scale**: Base 16px, with xs-4xl variations

## Performance Architecture

### Code Splitting Strategy
- **Dynamic Imports**: Heavy components loaded on demand
- **Route-based splitting**: Per-experience bundles
- **Prefetching**: Critical components prefetched after load

### Optimization Techniques
- **React Query**: Aggressive caching for instant interactions
- **Virtualization**: Long lists use virtual scrolling
- **Debouncing**: Input handlers debounced
- **Memoization**: Heavy computations cached
- **GPU Acceleration**: Via `GPUAcceleration` wrapper component

### Real-time Updates
- **SSE (Server-Sent Events)**: Execution progress, pipeline logs, instructions
- **WebSocket** (future): Collaborative editing, live presence

## State Management

### Global State
- **React Query**: Auth state, VCS data, execution state
- **Local Storage**: UI preferences, persisted selections
- **Context**: Theme, feature flags

### Component Hierarchy
```
App
├── Nav (fixed header with credits tracker)
├── ClientLayoutInner
│   ├── ConversationsOverlay (floating/sidebar/fullscreen)
│   ├── Auxillaries overlay
│   └── Page Content
│       ├── Activity
│       └── Transactions
└── Footer
```

## Navigation Architecture

### Route Structure
- `/` - Marketing landing
- `/executions` - Compatibility route for activity
- `/application` - Transactions
- `/auxillaries/*` - Canonical auxillary sub-routes
- `/orbitals/*` - Redirect-only compatibility carriers
- Conversations - Overlay (no route)
- Auxillaries - Modal (no route)

### Keyboard Shortcuts
- `Cmd+K`: Open conversations
- `Cmd+O`: Open orbitals (via hover prefetch)
- `Escape`: Close overlays
- `Enter`: Send message/instruction

## Accessibility Standards
- **Color contrast**: WCAG AA minimum
- **Keyboard navigation**: Full support
- **Screen readers**: ARIA labels throughout
- **Focus management**: Trap in modals, restore on close

## Guide Indicator Component Specification

### Overview
The Guide Indicator displays the DDD (Design → Develop → Digest) guide position as a prominent stepwise sequence in the execution log header. Always shows all 3 guides regardless of current position.

### Visual Design
**Layout**:
- Position: Execution log header, prominent and centered
- Format: Horizontal stepper with 3 steps (1-2-3)
- Always visible with all gates shown

**States**:
1. **Active Gate** (current):
   - Filled circle with number
   - Bold text, primary color (gate-specific)
   - Pulsing animation effect

2. **Completed Gate** (past):
   - Green checkmark (✓)
   - Normal text, success color
   - Solid connector line to next

3. **Pending Gate** (future):
   - Empty circle with number
   - Muted text, gray color
   - Dashed connector from previous

### Component Implementation
**File**: `/uapi/components/base/bitcode/execution/GuideIndicator.tsx`

**Props**:
```typescript
interface GuideIndicatorProps {
  currentGuide: Gate;
  completedGuides?: Gate[];
  collaborative?: boolean;
  compact?: boolean;
}
```

**Key Features**:
- Stepwise display with all guides visible
- Smooth Framer Motion transitions
- GPU-accelerated pulse animations
- Color-coded by gate (Sky/Emerald/Amber)
- File restriction hints per gate
- Responsive compact mode

### Gate Transitions
User-triggered buttons appear contextually:
- "Ready to Develop" (Design → Develop)
- "Ready to Digest" (Develop → Digest)
- "Ship" or "Another Iteration" (from Digest)

### Visual Examples
```
Design Active:  [1] Design → [2] Develop → [3] Digest
                 ◉           ◯            ◯

Develop Active: [1] Design → [2] Develop → [3] Digest
                 ✓           ◉            ◯

Digest Active:  [1] Design → [2] Develop → [3] Digest
                 ✓           ✓            ◉
```
