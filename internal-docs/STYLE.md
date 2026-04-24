# UAPI Frontend Style System (GA‑1 SSOT)

Goal: Precise, minimal, durable style rules that scale. Keep the current look 1:1 while making the system obvious to extend. This is the single source of truth for frontend styles.

## Non‑Regression Pledge

- Visuals remain identical. All migrations are no‑op to the eye.
- Reuse over invention. If it exists, import it.
- No shims or alias exports. Migrate fully to the SSOT.

## Style SSOTs

- Tailwind Theme + Animations: `uapi/tailwind.config.ts`
  - Colors (brand/ai/quantum)
  - Base keyframes (shine‑base, orbital‑glow‑base, pulse‑base, shimmer‑base)
  - Animation utilities (shine‑*, orbital‑glow‑*, pulse‑*, shimmer‑*, marquees)
  - Plugin utilities (glow‑*, text‑shiny, gpu‑accelerate, quantum‑dot, star‑cluster)
- Class Composition (`cn`): `packages/styling/src/index.ts`
  - Import only from `@bitcode/styling`

## Frontend Quickstart (Components + Styles)

- Components: import UI from `@/components/base/shadcn/*`; import Bitcode primitives (ScrollContainer, ContentVisibility, GPUAcceleration, PageHeaderSection) from `@/components/base/bitcode/*`.
- Scrollbars: use `ScrollContainer` + SSOT variants (`custom-scrollbar--thumb-purple` / `custom-scrollbar-emerald` / `custom-scrollbar-blue`).
- Performance: add `GPUAcceleration` around animated containers; use `ContentVisibility` for large off‑screen content with `containSize` when known.
- Headers: keep neutral; render doc/cards as siblings when needed for performance/composition.
- Shared CSS: add utilities/variants to `uapi/styles/components.css`; do not duplicate WebKit/Firefox scrollbar rules in feature CSS.
  - See: `internal-docs/UI-COMPONENTS-AND-STYLING.md` for full guidance.

## Architecture Overview (Components + Styling)

- Base layers live at `uapi/components/base`:
  - `bitcode/`: first‑party Bitcode primitives (perf/layout/composition) — neutral, no theme
  - `<provider>/`: proper‑noun vendor families (e.g., `shadcn`) — explicit file imports, no re‑exports
- App code imports only from base layers (SSOT); vendored registry under `components/ui/apps/www/registry` is fixtures only.
- Lint guard: `.eslintrc.cjs` forbids `@/components/ui/*` in `uapi/app` and `uapi/components/vcs`.

### Base Layers (components/base)

- Bitcode Primitives (`components/base/bitcode`)
  - `panels/ScrollContainer`: SSOT scrollbars for all scroll areas
  - `perf/ContentVisibility`: use for large off‑screen content; optional `containSize`
  - `perf/GPUAcceleration`: GPU hints for animated containers (avoid wrapping sticky ancestors)
  - `page-header/PageHeaderSection`: neutral header shell with optional meta/actions

- Vendor Components (`components/base/shadcn`)
  - One file per component (button, card, dialog, select, tabs, table, command, popover, dropdown-menu, tooltip, checkbox, switch, avatar, textarea, progress, calendar, etc.)
  - Tokenized classes, `cn` from `@bitcode/styling`, explicit exports only

### Component Placement & Naming

- Base Bitcode Components: flat under `uapi/components/base/bitcode/*.tsx` (no `ui/` nesting).
  - Examples: `typing-animation.tsx`, `multi-line-typing-animation.tsx`, `quantum-button.tsx`, `dock.tsx`, `metal-plate.tsx`, `word-rotate.tsx`, `particle-effect.tsx`.
- Vendor Components: one-per-file under `uapi/components/base/shadcn/*` (no re-exports).
- Page-Specific Components: colocate under the page namespace: `uapi/app/<feature>/components/*`.
  - Naming: `Feature_Component` (and deeper parts as `Feature_Component_Subpart`).
  - Examples: `ExecutionPageComponent`, `ExecutionPageHeaderComponent`, `ExecutionPageHeaderPipelineDeliverablesTypeComponent`.
- Import Rules: app code imports only from base layers (`@/components/base/bitcode/*`, `@/components/base/shadcn/*`) and page-local components.
  - Never import from `@/components/ui/*`.

**Page Structure Example**
- Feature namespace: `uapi/app/executions/` holds routing and colocated UI.
- Page components: `uapi/app/executions/components/ExecutionPageComponent.tsx`, `ExecutionPageHeaderComponent.tsx`, `ExecutionPageHeaderPipelineDeliverablesTypeComponent.tsx`.
- Imports (examples):
  - `@/components/base/bitcode/typing-animation`, `@/components/base/bitcode/word-rotate`, `@/components/base/bitcode/metal-plate`.
  - `@/components/base/shadcn/dialog`, `@/components/base/shadcn/select`.
- Scroll areas: wrap with `ScrollContainer` (`@/components/base/bitcode/panels/ScrollContainer`) and apply a variant class.
- Naming: `Feature_Component[_Subpart]` for page‑specific pieces; keep base Bitcode files flat under `components/base/bitcode`.

## Headers + Sibling Panels

- Keep headers neutral via `PageHeaderSection`.
- Render doc/cards as siblings on the Executions page (e.g., `DeliverablesDocPanel`, `DeliverablesCardsPanel`) and control via header flags `renderDocInsideHeader`, `renderCardsInsideHeader`.
- Benefits: flexible composition, clearer boundaries, and easier performance isolation.

## Scrollable Regions

- Always use `ScrollContainer` for scroll areas; it adds base `.custom-scrollbar`.
- Apply a themed variant via `className`:
  - Purple: `custom-scrollbar--thumb-purple`
  - Emerald: `custom-scrollbar-emerald`
  - Blue: `custom-scrollbar-blue`
- Other modifiers: `custom-scrollbar--transparent-track`, `custom-scrollbar--w-6`, `custom-scrollbar--track-dark`.

Example:
```tsx
<ScrollContainer className="custom-scrollbar--thumb-purple pr-2 max-h-[360px]">
  …
</ScrollContainer>
```

## Shadcn Component Usage

Explicit imports only:
```tsx
import { Button } from '@/components/base/shadcn/button';
import { Dialog, DialogContent } from '@/components/base/shadcn/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/base/shadcn/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/base/shadcn/select';
```

`command.tsx` is self‑contained; pair with Dialog when building a command dialog.

## Migration Recipes + Lint Guard

- Import migration: `@/components/ui/*` → `@/components/base/shadcn/*` (use codemod in `scripts/codemods/migrate-ui-imports-to-base-shadcn.js`).

Experience Prefixes & Placement
- Execution*: execution route scope — `app/executions/components/*`.
- Conversation*: conversations overlay scope — `app/components/conversations/*`.
- Orbital*: overlays/settings scope — `app/components/orbital/*`.
- Marketing*: marketing-only components — `app/components/marketing/*`.
- Base Bitcode primitives: no prefix — `app/components/base/bitcode/*`.
- ShadCN vendor primitives: `app/components/base/shadcn/*` (vendor family names the import; no app-specific prefix).

See also: `internal-docs/FRONTEND-ARCHITECTURE.md` for the high-level map and conventions.
- Scrollbar standardization: wrap `overflow:auto` with `ScrollContainer`, choose a SSOT variant, remove local WebKit rules from feature CSS.
- ESLint guard: `.eslintrc.cjs` → `no-restricted-imports` patterns for app/VCS folders.

## Experience Playbooks (GA‑1)

### User‑Orbital (overlay)
- GPUAcceleration on rings; ContentVisibility on panes (`containSize`).
- Dynamic imports for heavy panes; tokens drive glows.
- Avoid transform on ancestors of sticky elements (none here).

### Point‑and‑Click GUI (templates, master/detail, sidebars)
- Neutral header + sibling doc/cards; ScrollContainer with SSOT variants (purple aesthetic).
- Markdown prose classes consistent; use `RichBodyPane` where possible.
- Sidebars can use `content-vis` on long lists.

### Big‑O Fullscreen (engineering chat)
- Message list uses SSOT scrollbars; split grid and chat history use `content-vis` + scrollbars.
- Avoid GPUAcceleration on `.conversations-container` or `.conversations-fullscreen` to preserve sticky header/input.
- Keep emerald aesthetic via tokens.

## Common Code Paths (How‑To)

### Add a base component to a provider
- Place in `uapi/components/base/<provider>/<component>.tsx` (proper noun provider, e.g., `shadcn`).
- Use `cn` from `@bitcode/styling`, Tailwind tokens, explicit exports; no re‑exports.

### Add a new scrollbar variant
- Add rules to `uapi/styles/components.css` (Firefox + WebKit) with tokenized colors.
- Apply via `className` alongside `ScrollContainer`.

### Expand lint rules when SSOT grows
- `.eslintrc.cjs` → add forbidden import patterns; keep app code pointed at base layers.



## Principles

- Minimal: fewer sources, clearer intent. No duplicate definitions.
- Token‑first: colors/spacing/shadows via Tailwind theme.
- Motion‑second: base keyframes + semantic variants; module‑specific only when needed.
- Inline‑last: inline styles only for runtime dynamics (dimensions, transforms, colors computed at run), otherwise classes/CSS vars.

## Layers & Imports

- Use Tailwind `@layer base|components|utilities` when adding CSS.
- Global entry: import feature CSS through `uapi/app/globals.css` when feasible.
- Keep `uapi/app/layout.tsx` imports minimal (temporary exceptions allowed, tracked for consolidation).

## CSS Variables — Guidelines

- Prefer Tailwind tokens; introduce CSS vars for runtime tunables shared across elements (e.g., `--mouse-x/y`, ring sizes).
- Naming: `--domain-purpose[-qualifier]` (e.g., `--ring-outer`, `--shine-width`).
- Scope: define at the lowest viable container (avoid polluting `:root` unless global).

## Arbitrary Values — Policy

- Allowed for high‑value effects not expressible via tokens (e.g., text‑shadow, complex box‑shadow).
- Coalesce into plugin utilities when repeating (e.g., `.glow-emerald`, `.text-neon`).
- Prefer tokenized rgba/alpha via theme() over raw literals.

## Z‑Index & Overlays

- Nav: `z-50` on container. Overlays must sit above when open.
- Orbital Portal: topmost overlay (`.orbital-portal` fixed, portal‑root above app; documented in CSS).
- Avoid arbitrary z‑index escalations; establish local stacking contexts via `position` and transforms.

## Content‑Visibility & Containment

- Apply `content-visibility:auto` and `contain:paint layout` to heavy scroll regions (logs, chat messages, large lists) to isolate reflows.
- Avoid `contain:paint` where intentional overflow is part of the design (explicitly disabled in screenshot peeking wrappers).

## External Library Hooks

- React‑Select: encapsulate in `uapi/styles/select-styles.ts` objects; prefer mapping library props to CSS vars/classes over large inline style literals when possible.
- If library forces inline styles, keep values token‑derived; document exceptions.

## Decision Tree (Add/Change Styles)

1) Can Tailwind classes express it? Use them.
2) Reusable across features? Add a Tailwind plugin utility.
3) Global behavior? Add CSS to `app/styles/*.css` and import via `globals.css`.
4) Feature‑specific complex motion? In a dedicated CSS file under `app/styles/` using `@layer` + theme().
5) Runtime dynamic? Use CSS vars and inline only for the dynamic part.

## Build Pipeline

- PostCSS: `uapi/postcss.config.js`
  - Plugins: postcss-import, tailwindcss/nesting, tailwindcss, autoprefixer

## Loading Surfaces

- Global Aggregator (preferred): `uapi/app/globals.css`
  - Imports feature CSS (processing indicator, enhanced inputs/buttons, etc.)
  - Provides utility layers and base CSS variables
- Layout Imports (secondary): `uapi/app/layout.tsx`
  - Keep minimal; prefer routing imports via `globals.css`

## Motion (CSS Libraries)

- Core animations: `uapi/styles/animations.css`
  - Shimmer, fade, pulse, orbital, ring activation, etc.; class wrappers `.animate-*` for each (e.g., lines ~220–336)
- Marketing animations: `uapi/styles/marketing-animations.css`
  - Float, pulse-glow, orbital rotations, marquee, ripple, rotate-* utilities (lines ~1–238, 333–420)
- Nav animations: `uapi/styles/nav-animations.css`
  - Container/item entrance, active text, GPU hints (e.g., `.nav-container-global { will-change: transform; }` ~line 269)

## Color & Tokens — Policy

- Use Tailwind theme tokens, not hard‑coded RGBA/hex, for brand/ai/quantum colors.
  - Example good: `text-brand-emerald`, `bg-brand-emerald-glow-subtle`, `theme('colors.brand.emerald-glow')` in CSS.
  - Example to migrate: occurrences of `rgba(103, 254, 183, …)` across CSS/TSX (see grep evidence in discovery).
- CSS variables allowed for specialized global cases, but define once and derive from Tailwind tokens.

## Scrollbars — SSOT & Variants

- Base SSOT: `uapi/styles/components.css` (`.custom-scrollbar` family)
- Module specializations exist in:
  - `uapi/components/base/bitcode/metal-plate.tsx` (inline, purple flavor)
  - `uapi/styles/deliverables-header.css` (purple/emerald/blue variants + ::after gradient)
  - `uapi/styles/conversations/split-view.css` (scoped to `.split-screen-mode`)
- Available non‑breaking variants (opt‑in):
  - `.custom-scrollbar--transparent-track` → track transparent
  - `.custom-scrollbar--w-6` → 6px width/height
  - `.custom-scrollbar--track-dark` → track rgba(0,0,0,0.2) + 10px radius
  - `.custom-scrollbar--thumb-purple` → purple thumb rgba(186,84,236,0.3/0.5 hover) + 10px radius

GA‑1 specializations (intentionally retained to avoid visual change):
- Metal Plate (`uapi/components/base/bitcode/metal-plate.tsx`): inline purple scrollbar rules remain for contained scroll areas; SSOT variants exist to support a future no‑risk migration when all consumers are mapped.
- Deliverables Header (`uapi/styles/deliverables-header.css`): themed scrollbars (purple/emerald/blue) + ::after gradient effects are preserved as module‑local styles; these act as explicit overlays atop the SSOT base. This header CSS is consumed by the unified Executions page.

## Component Map (What Styles Each Uses)

- Nav
  - Component: `uapi/components/base/bitcode/layout/nav.tsx`
  - Styles: `uapi/styles/nav-animations.css`, `uapi/styles/components.css` (active), Tailwind arbitrary text‑shadow utilities

- Hero & Landing Orchestration
  - Components: `uapi/app/hero-client.tsx`, `uapi/app/page.tsx`
  - Styles: `radical-landing.css`, `marketing-animations.css`, `animations.css`, `components.css`, `smooth-typing.css`, `highlight-transition.css`, `cosmic-meteors.css`, `particle-effect.css`, `scroll-indicator.css`
  - Pattern: dynamic imports + preload; CustomEvents to stage reveals; CSS variables (`--mouse-x/y`)

- Quantum Button (CTA)
  - Component: `uapi/components/base/bitcode/quantum-button.tsx`
  - Styles: `uapi/styles/quantum-button.css` (tokenized), overlap in `radical-landing.css`

- Typing Effects
  - Components: `uapi/components/base/bitcode/typing-animation.tsx`, `uapi/components/base/bitcode/multi-line-typing-animation.tsx`
  - Styles: `smooth-typing.css`, `highlight-transition.css`, `shiny-text.css` (consolidated)

## Big‑O (Chat) and Orbs

- Big‑O Chat (Marketing)
  - Component: `uapi/app/(root)/components/MarketingChatExperience.tsx`
  - Styles: `uapi/styles/conversations.css` (typing, hover, token pills, perf hints)
  - Pattern: `custom-scrollbar`, perf containment, fullscreen orb scaling

- Quantum Orb
  - Component: `uapi/components/base/bitcode/effects/quantum-orb/QuantumOrb.tsx`
  - Styles: `uapi/styles/quantum-orb.css` (particles, orbitals, GPU hints)

- User Auxillaries Overlay
  - Provider: `uapi/app/auxillaries/components/AuxillariesProvider.tsx` (class toggles + portal)
  - Styles: `uapi/styles/orbital.css` (overlay, sizing vars), `uapi/styles/orbital-rings.css` (tokens + pseudo glow)

- Product Headers (Executions)
  - Component: `uapi/app/executions/components/ExecutionsPageHeader.tsx` (deliverables; Measure placeholder reuses the same header until that pipeline ships)
  - Behavior: header title uses `uapi/app/executions/components/ExecutionHeaderTitle.tsx` for backspace‑then‑retype typing effect when switching type
  - Styles: Tailwind + `custom-scrollbar`; some inline `<style>` blocks for localized variants

## Utilities & Performance

- Utility SSOTs from Tailwind plugin (`uapi/tailwind.config.ts` → `plugins`):
  - Glow utilities: `.glow-emerald`, `.glow-purple`, `.glow-orange`, `.glow-red` (+ strong variants)
  - Quantum/cosmic dots: `.quantum-dot*`, `.star-cluster`
  - Text effects: `.text-shiny`, `.text-neon`
  - Perf hints: `.gpu-accelerate`, `.will-animate`, `.will-animate-glow`
- Prefer `.will-animate*` and `.gpu-accelerate` over repeated inline perf hints.

## Performance Checklist (Non‑Regression)

- Animations
  - Use `will-change` on transform/opacity/filter as needed; remove when static.
  - Keep GPU hints (`transform: translateZ(0)`, `backface-visibility: hidden`) for continuously animating elements.
  - Respect reduced motion (`@media (prefers-reduced-motion: reduce)`) for decorative loops.

- Scrolling/Containers
  - Use `content-visibility: auto` and `contain: paint layout` on large scroll regions.
  - Avoid layout thrashers in scroll handlers; prefer CSS animations to JS loops.

- Orbital/Particles
  - Rings: SSOT in `orbital-rings.css` with simple keyframes + translateZ.
  - Particles: use `quantum.particle` token; keep `will-change` and `contain: paint` where blurs exist.

- Validation Greps
  - `rg -n "prefers-reduced-motion|will-change|content-visibility|contain:|backface-visibility|translateZ\(0\)" uapi/styles`
  - Confirm presence on: User Auxillaries, Big‑O (both modes), Landing, Executions input/header, Navigation.

## Class Composition

- Always import `cn` from `@bitcode/styling`.
  - Divergent imports to fix (no behavior change): `uapi/components/vcs/*` currently import from `@/lib/utils`.

## Scrollbars — SSOT

- Canonical definition: `uapi/styles/components.css` (`.custom-scrollbar` family)
- Duplicates exist in:
  - `uapi/styles/conversations.css`
  - `uapi/styles/notifications-widget.css`
  - Inline `<style>` inside `uapi/components/base/bitcode/metal-plate.tsx`
- Policy: standardize base styles in `components.css`; allow flavor variables per surface if needed.

## Landing Strategy

- Composition: `uapi/app/page.tsx` dynamically imports sections and preloads chunks; `HeroClient` orchestrates events.
- `uapi/app/hero-client.tsx` imports landing CSS modules; controls scroll lock (`html.scroll-lock`) and coordinates reveal events.
- Guideline: landing visuals use existing CSS modules; additions should re‑use tokens and animation SSOT from Tailwind.

## Authoring Guidelines (Enforced)

1) Tokens
   - Use theme tokens via Tailwind classes or `theme('...')` in CSS.
   - Avoid hard‑coded colors; if a custom literal is needed, add a token first.

2) Animations
   - Prefer Tailwind’s `extend.keyframes/animation` SSOT; create base + specific variants.
   - Use CSS modules for specialized sequences; avoid duplicating base keyframes.

3) Global vs Component
   - Global effects/utilities go in `globals.css` (aggregated) or dedicated `app/styles/*.css` referenced by `globals.css`.
   - Component‑specific CSS should be avoided unless tied to third‑party libs; otherwise use Tailwind utilities.

4) Inline Styles
   - Use inline styles only for truly dynamic values (computed at runtime).
   - Static values should map to class utilities or CSS vars.

5) Class Composition
   - Use `cn` from `@bitcode/styling` only. No local `lib/utils` copies in uapi.

6) Accessibility & Perf
   - Respect `prefers-reduced-motion`; where continuous animations exist, add media queries or play‑state controls.
   - Prefer pseudo‑element glows over animated box‑shadows for performance.

## Consolidation Targets (No Visual Changes)

- `cn` imports: unify VCS components to `@bitcode/styling`.
- Color literals: replace `rgba(103, 254, 183, …)` occurrences with brand tokens / theme() in CSS.
- Quantum Button: consolidate duplicated styles toward `app/styles/quantum-button.css` (tokenized); keep `radical-landing.css` as thin wrappers referring to tokens.
- Orbital Rings: keep `orbital-rings.css` as SSOT for ring visuals; reduce overlap with `quantum-orb.css` while preserving look.
- Scrollbars: converge on `components.css` SSOT and remove duplicates from other files.
- Import surface: prefer `globals.css` for global CSS imports; keep layout.tsx minimal.

## Checklists (Design / PR)

Before adding a new style:
- [ ] Can it be expressed with existing Tailwind tokens/utilities?
- [ ] If not, add a token or plugin utility in `tailwind.config.ts`.
- [ ] If global, place CSS in `app/styles/*.css` and import via `globals.css`.
- [ ] If component‑local due to library constraints, co‑locate and document why.
- [ ] Avoid inline static values; prefer class utilities and CSS vars.

PR Validation:
- [ ] No new hard‑coded brand colors; using tokens/theme().
- [ ] No duplicate utility/classes introduced (search by class name).
- [ ] `cn` only from `@bitcode/styling`.
- [ ] Animations added to Tailwind SSOT when reusable; otherwise isolated to one CSS file.
- [ ] Visual parity verified (no changed snapshots/screens in storybook/static sections as applicable).

## File Index (Key References)

- Tailwind Theme/Animations/Utilities: `uapi/tailwind.config.ts`
- PostCSS: `uapi/postcss.config.js`
- Global aggregator: `uapi/app/globals.css`
- Layout imports: `uapi/app/layout.tsx`
- Animations: `uapi/styles/animations.css`, `uapi/styles/marketing-animations.css`, `uapi/styles/nav-animations.css`
- Orbital: `uapi/styles/orbital.css`, `uapi/styles/orbital-rings.css`
- Big‑O: `uapi/styles/conversations.css`, `uapi/app/(root)/components/MarketingChatExperience.tsx`
- Quantum Button: `uapi/styles/quantum-button.css`, `uapi/components/base/bitcode/quantum-button.tsx`
- Scrollbars SSOT: `uapi/styles/components.css`
- cn SSOT: `packages/styling/src/index.ts`

## Experience Guides (Canonical Surfaces)

- Landing Page
  - Styles: `radical-landing.css`, `marketing-animations.css`, `shiny-text.css`, `components.css`
  - Rules: Use tokenized emeralds and consolidated shiny text; scoped landing overrides under `.button-container`.

- User Auxillaries
  - Styles: `orbital.css` (overlay + sizing vars), `orbital-rings.css` (SSOT rings)
  - Rules: Rings rely on SSOT keyframes; overlays use tokens; `orbital-global.css` controls page scroll lock.

- Executions Page (Deliverables)
  - Header styles: `deliverables-header.css` (module overlay; themed variants, keep), `deliverables-header-shiny-text.css`
  - Input styles: `dod-input.css` (was enhanced-dod-input.css)
  - Pipeline Log: `pipeline-execution-log-header.tsx`, `pipeline-execution-log.tsx`; prefer tokenized classes over inline rgba.

- Sidebars
  - Left (history/list) & Right (small Big‑O): TSX components under `app/components/sidebars/` use `.custom-scrollbar custom-scrollbar--transparent-track`.
  - Rules: Keep SSOT scrollbar base; local variants via classes only.

- Big‑O Fullscreen
  - Styles: `conversations-fullscreen.css`, `conversations/process-log-integration.css`
  - Rules: Tokenized emeralds for text/borders/shadows; preserve layout and animation timings.

## Extensibility & Patterns (Appendix)

This appendix is a practical, example‑driven guide to building and evolving UI that stays perfectly aligned with GA‑1 architecture, tokens, and performance constraints — with zero aesthetic regression.

### A. Promote‑to‑Base vs Keep Page‑Local

Promote to base (`components/base/bitcode/*` or `components/base/shadcn/*`) when ALL are true:
- Reused (or planned reuse) across multiple features/pages.
- Neutral API: no feature‑specific state, naming, or copy baked in.
- Stable visual language consistent with Bitcode tokens; not an exploratory prototype.
- Clear extension points (props/slots) without feature leakage.

Keep page‑local (`app/<feature>/components/*`) when ANY are true:
- Experimental/iterating visuals, copy, or UX flows.
- Bound to one feature’s domain data/semantics.
- Needs tighter coupling to the page’s layout lifecycle or server data boundaries.

Checklist for promotion:
- [ ] 3+ usages across features OR strongly expected near‑term reuse.
- [ ] No direct imports of feature hooks, stores, or feature CSS.
- [ ] Style built from tokens/utilities; no literal brand RGBA/hex.
- [ ] Props accept primitives/slots; no feature types in the public API.

### B. Naming, Layout, and Imports

Page‑local naming: `Feature_Component[_Subpart]`

Example feature layout (Executions):
```
uapi/app/executions/
  page.tsx
  components/
    ExecutionPageComponent.tsx
    ExecutionPageHeaderComponent.tsx
    ExecutionPageHeaderPipelineDeliverablesTypeComponent.tsx
```

Imports (good):
```tsx
import { ScrollContainer } from '@/components/base/bitcode/panels/ScrollContainer';
import { PageHeaderSection } from '@/components/base/bitcode/page-header/PageHeaderSection';
import TypingAnimation from '@/components/base/bitcode/typing-animation';
import { Dialog } from '@/components/base/shadcn/dialog';
```

Imports (avoid):
```tsx
// ❌ Legacy vendored path
import { Button } from '@/components/ui/button';

// ❌ Re-exports / barrels (breaks tree-shaking, hides dependencies)
import { Something } from '@/components/base/bitcode';
```

### C. Client/Server Boundaries (Next.js)

- Prefer server components by default. Mark client components explicitly with `"use client"`.
- Push heavy/animated pieces behind `dynamic(() => import(...), { ssr: false })` with a minimal fallback.
- Keep global CSS imports in `globals.css`; prefer feature CSS brought in at page/component boundaries when it is truly feature‑scoped.
- Do not wrap sticky ancestors with `GPUAcceleration`; apply GPU hints only on the animated element subtree.

Example:
```tsx
// Client-only animation block
"use client";
import dynamic from 'next/dynamic';
const MultiLineTypingAnimation = dynamic(() => import('@/components/base/bitcode/multi-line-typing-animation'), { ssr: false });
```

### D. Performance: Patterns and Anti‑Patterns

- Scroll/large lists: wrap with `ContentVisibility` and use `contain: paint layout` when safe.
- Off-screen content: prefer CSS keyframes; avoid `requestAnimationFrame` loops unless strictly necessary.
- Interaction throttling: debounce high-frequency events; prefer CSS transitions for hover/focus/active.
- Avoid layout thrash: batch style reads/writes; leverage CSS variables for dynamic values.

Anti‑patterns to avoid:
- JS loops for decorative motion that can be CSS keyframed.
- `position: sticky` parents with transforms (breaks sticky) — do not apply GPUAcceleration above sticky.
- Inline hard-coded RGBA brand colors.

### E. Tokens, Utilities, and CSS Vars

- Always prefer Tailwind tokens for brand/ai/quantum colors.
- Utility SSOT lives in Tailwind plugin (glow‑*, text‑shiny, quantum‑dot, star‑cluster, gpu‑accelerate).
- Introduce CSS vars for runtime tunables (e.g., `--mouse-x`) scoped to the smallest container; derive values from tokens.

Do (tokens):
```tsx
<div className="text-brand-emerald bg-brand-cosmic/80 glow-emerald" />
```

Don’t (literals):
```tsx
// ❌ Hard-coded emerald shade, brittle and unthemeable
<div style={{ color: 'rgba(103,254,183,0.9)' }} />
```

### F. Scrollbars (SSOT)

- Base: `.custom-scrollbar` in `app/styles/components.css`.
- Variants: `--thumb-purple`, `--thumb-emerald`, `--thumb-blue`, `--transparent-track`, `--track-dark`, `--w-6`.
- Scoped exceptions (kept for parity): deliverables header module CSS and metal‑plate inline style. Prefer swapping to SSOT variants when risk‑free.

Example:
```tsx
<ScrollContainer className="custom-scrollbar custom-scrollbar--thumb-purple custom-scrollbar--transparent-track">
  …
</ScrollContainer>
```

### G. Composition: Neutral Headers + Siblings

- Keep headers neutral with `PageHeaderSection`.
- Render doc/cards as siblings: `DeliverablesDocPanel`, `DeliverablesCardsPanel`.
- Benefits: performance isolation, simpler composition, zero visual regret.

### H. Reusable Bitcode Components (Base)

Use directly from `components/base/bitcode`:
- `typing-animation`, `multi-line-typing-animation`, `word-rotate`, `quantum-button`, `metal-plate`, `dock`, `particle-effect`.

Example use:
```tsx
import QuantumButton from '@/components/base/bitcode/quantum-button';

<QuantumButton onClick={onDeliver} className="mt-4" />
```

### I. Vendor Components (Shadcn)

- Import specific files: `components/base/shadcn/<component>.tsx`.
- Keep props and behavior consistent with upstream where reasonable; style via tokens.

Example:
```tsx
import { Dialog, DialogContent, DialogHeader } from '@/components/base/shadcn/dialog';
```

### J. Accessibility & Semantics

- Prefer semantic HTML first; pair with ARIA roles where necessary.
- Ensure contrast ratios meet WCAG AA; token palettes are tuned for this.
- Interactive areas: keyboard focus states must be visible and theme‑consistent.
- Animations: respect `prefers-reduced-motion`; provide non‑animated fallbacks or reduced variants.

### K. Testing & Verification

- Grep recipes: see “Grep / Validation Recipes” section and `scripts/verify-ui-ssot.mjs`.
- Storybook: create lean stories for base components; avoid feature coupling.
- Visual parity: before refactors, capture screenshots of critical surfaces; after changes, verify no deltas.

### L. Migration Recipes

1) Move a reusable page component to base/engi:
- Extract visuals to tokens/utilities; remove feature imports.
- Rename to neutral and move to `components/base/bitcode/<name>.tsx`.
- Update all imports across app/stories/tests.
- Add an entry in `components/base/README.md` if needed.

2) Replace legacy `@/components/ui/*` imports:
- Use `components/base/shadcn/*` equivalents. If missing, promote from vendored examples to base/shadcn as a one‑file component.

3) Normalize scrollbars:
- Wrap scroll areas in `ScrollContainer`; apply the closest visual variant; delete duplicate `::-webkit-scrollbar` rules from feature CSS.

### M. Example: Executions Page Skeleton

```tsx
// uapi/app/executions/components/ExecutionPageHeaderComponent.tsx
"use client";
import { PageHeaderSection } from '@/components/base/bitcode/page-header/PageHeaderSection';
import WordRotate from '@/components/base/bitcode/word-rotate';
import { Dialog, DialogContent } from '@/components/base/shadcn/dialog';

export function ExecutionPageHeaderComponent() {
  return (
    <PageHeaderSection experience="executions">
      <h1 className="text-2xl font-semibold">Executions <WordRotate words={["active","recent","archived"]} activeIndex={0} /></h1>
      <Dialog>
        <DialogContent>…</DialogContent>
      </Dialog>
    </PageHeaderSection>
  );
}
```


---

Notes
- Line numbers are approximate and may drift; use ripgrep to locate referenced sections.
- This document captures present reality and the intended SSOTs; migrations must be total and non‑destructive to visuals.

## Known Duplications Inventory (Plan‑to‑Consolidate)

- Quantum Button
  - Files:
    - `uapi/styles/quantum-button.css` (tokenized, @layer components)
    - `uapi/styles/radical-landing.css` (overlapping classes, raw RGBA)
  - Overlapping classes (examples): `.quantum-button`, `.quantum-field-bg`, `.orbital-ring-button`, `.quantum-particle-button`, `.glow-effect`
  - Issue: Two sources define core CTA visuals; only one uses Tailwind tokens.
  - Non‑regression path:
    - Keep `quantum-button.css` as SSOT for core CTA visuals.
    - Reduce `radical-landing.css` to wrappers that leverage tokenized classes (no visual change).

- Orbital Rings (User Auxillaries vs Quantum Orb)
  - Files:
    - `uapi/styles/orbital-rings.css` (theme tokens, pseudo‑glow, paused play‑state)
    - `uapi/styles/quantum-orb.css` (particles; ring keyframes removed to rely on SSOT; RGBA remains)
  - Overlap: keyframes `orbital-rotation`, border/glow treatments.
  - Non‑regression path:
    - Treat `orbital-rings.css` as SSOT for ring visuals; retain `quantum-orb.css` for orb core/particles.
    - Migrate RGBA to tokens incrementally.

- Custom Scrollbar
  - Files defining `.custom-scrollbar` (or inline variants):
    - `uapi/styles/components.css` (SSOT target)
    - `uapi/styles/conversations.css`
    - `uapi/styles/notifications-widget.css`
    - `uapi/components/base/bitcode/metal-plate.tsx` (inline <style>)
    - `uapi/app/executions/components/ExecutionsPageHeader.tsx` (inline <style> block around ~2804–2818)
  - Non‑regression path:
    - Normalize base styles in `components.css`; swap others to defer to SSOT, keep flavor via CSS vars if required.

- Nav Active Text Styles
  - Files:
    - `uapi/styles/nav-animations.css` (active text/gpu hints)
    - `uapi/styles/components.css` (also contains `.nav-item-active*` variants)
  - Non‑regression path:
    - Coalesce active text styles into a single file (prefer nav‑animations.css) and leave components.css with general utilities only.

- Hard‑coded Brand Emerald RGBA
  - Occurs across: `globals.css`, `conversations-fullscreen.css`, `radical-landing.css`, `quantum-orb.css`, various TSX inline styles
  - Non‑regression path:
    - Replace literal `rgba(103,254,183,…)` with Tailwind tokens or theme() in CSS.

## Token & Naming Guide (Tailwind Theme + Utilities)

- Colors
  - Brand: `brand.emerald`, `brand.emerald-glow`, `brand.emerald-glow-subtle`, `brand.emerald-glow-strong`
  - Brand (fine-grained for parity): `brand.emerald-glow-05`, `-08`, `-10`, `-15`, `-30`, `-50`, `-60`, `-90`
  - Backgrounds: `brand.cosmic`, `brand.cosmic-light`, `brand.cosmic-lighter`, `brand.cosmic-overlay`
  - Semantics: `ai.thinking|processing|complete|error|tool-use|otf-*`
  - Particles: `quantum.particle|dust|star|star-blue|trail`
  - Additions: prefer `namespace.variant[-qualifier]` (e.g., `brand.teal-glow-subtle`) with measured need.

- Animations
  - Keyframes: add to `extend.keyframes` as base patterns first (e.g., `pulse-base`).
  - Variants: add to `extend.animation` as semantic uses (e.g., `pulse-button-hover`).
  - Prefer CSS variables for tunables: `--duration`, `--angle`, `--shine-width`.

- Utilities (Tailwind Plugin)
  - Add reusable UI effects via `addUtilities` (glows, perf hints, text effects).
  - Avoid per‑feature utilities that duplicate tokenized effects.

- Language
  - Use industrial, technical naming; avoid metaphysical terms in new tokens/utilities.
  - Existing names may remain for non‑regressive compatibility; schedule rename only when end‑to‑end migrated.

## Tokenization Rules & Examples (Pedagogy)

- Where to use tokens
  - CSS files: use `theme('colors.<family>.<token>')` inside `@layer` CSS or module CSS.
  - TSX classes: prefer Tailwind class tokens (`text-brand-emerald-bright`, `bg-quantum-particle`, etc.).
  - Never introduce new hex/rgba for brand emeralds; request a token or reuse a fine‑grained token.

- Families and intent
  - `brand.*`: UI chrome, outlines, borders, text, controlled glows.
  - `quantum.*`: particles and high‑energy effects (e.g., micro‑dots, trails).
  - `ai.*`: semantic states used in logs and indicators.

- Fine‑grained emeralds (when exact alpha matters)
  - Use the closest matching `brand.emerald-glow-XX` token:
    - 0.05 → `-glow-05`, 0.08 → `-glow-08`, 0.10 → `-glow-10`, 0.15 → `-glow-15`, 0.30 → `-glow-30`, 0.50 → `-glow-50`, 0.60 → `-glow-60`, 0.90 → `-glow-90`.
  - Common mappings:
    - Shadows: 0.4 → `brand.emerald-glow`, 0.2 → `brand.emerald-glow-subtle`.
    - Text (bright): `brand.emerald-bright`.
    - Particles: `quantum.particle` (0.8) unless a module requires a different alpha, in which case add a new token rather than hard‑coding.

- CSS examples (before → after)
  - Box‑shadow composite (signin core):
    - `0 0 20px rgba(103,254,183,0.15), 0 0 30px rgba(103,254,183,0.05), inset 0 0 1px rgba(103,254,183,0.3)`
    - `0 0 20px theme('colors.brand.emerald-glow-15'), 0 0 30px theme('colors.brand.emerald-glow-05'), inset 0 0 1px theme('colors.brand.emerald-glow-30')`
  - Particle dot:
    - `background-color: rgba(103,254,183,0.8)` → `background-color: theme('colors.quantum.particle')`
  - Text emphasis (hover):
    - `text-shadow: 0 0 15px rgba(103,254,183,0.6)` → `text-shadow: 0 0 15px theme('colors.brand.emerald-glow-60')`

- TSX examples (before → after)
  - Success text:
    - `text-[rgba(103,254,183,1)]` → `text-brand-emerald-bright`
  - Button background / hover:
    - `bg-[rgba(103,254,183,0.8)] hover:bg-[rgba(103,254,183,1)]` → `bg-quantum-particle hover:bg-brand-emerald-bright`

- Migration playbook (RGBA → Tokens)
  - Grep: `rg -n "103,\s*254,\s*183" uapi`
  - Classify each match:
    - Map to existing tokens (0.2/0.4/0.7/0.8/1.0) or new fine‑grained tokens above.
    - If semantics unclear, leave as‑is and record for follow‑up.
  - Replace conservatively; prefer no visual change over aggressive refactors.
  - Validate with grep, and capture proof in GA‑1 tracking.

## Class Token Usage (Tailwind)

- Text: `text-brand-emerald-bright`, `text-ai-processing`, `text-quantum-particle` (sparingly for text).
- Backgrounds: `bg-quantum-particle`, `bg-brand-cosmic-light`, etc.
- Borders: `border-brand-emerald-glow-subtle` (or use CSS theme() inside modules for non‑utility cases).
- Hover states: `hover:bg-brand-emerald-bright`, `hover:border-brand-emerald-glow`.
- Avoid arbitrary `bg-[rgba(...)]` and `text-[rgba(...)]` for brand emeralds.

## Import Surface Discipline

- Prefer `uapi/app/globals.css` as the aggregator for global CSS modules.
- Keep `uapi/app/layout.tsx` imports minimal (nav/marketing/orbital as needed); track intended consolidations in GA‑1 Phase 7.
- Component‑level imports (e.g., quantum orb) are allowed if the CSS is feature‑specific and not globally required.

## Migration Status (Quick Reference)

- Scrollbars SSOT: `components.css` (variants: `--transparent-track`, `--w-6`, `--track-dark`, `--thumb-purple`). Sidebars wired to SSOT.
- Quantum Button: `quantum-button.css` is SSOT; landing wrappers are scoped; tokens migrated for emerald effects in overlapping areas.
- Orbital Rings: `orbital-rings.css` is SSOT; duplicate ring keyframes removed from `quantum-orb.css` (particles remain there).
- Tokenization: Fine‑grained emerald tokens available; RGBA literals mapped progressively with documented proof in GA‑1.

## Grep / Validation Recipes

- Locate emerald RGBA literals to replace with tokens:
  - `rg -n "103,\s*254,\s*183" uapi`
- Find divergent `cn` imports in uapi:
  - `rg -n "import\\s+\\{\\s*cn\\s*\\}\\s+from\\s+'@/lib/utils'" uapi`
- Inventory of duplicated `.custom-scrollbar`:
  - `rg -n "\\.custom-scrollbar" uapi`
- Map usage of key animation classes:
  - `rg -n "animate-(shine|orbital|pulse|shimmer|marquee|ripple)" uapi/app`


## Style PR Checklist (Copy/Paste)

- Imports & Providers
  - [ ] UI imports only from `@/components/base/shadcn/*`
  - [ ] Bitcode primitives only from `@/components/base/bitcode/*`
  - [ ] No `@/components/ui/*` imports (lint passes)
  - [ ] New vendor components placed in `components/base/<provider>/*` (proper noun)

- Scroll Regions
  - [ ] Scrollable areas use `ScrollContainer`
  - [ ] Themed variant applied (`--thumb-purple`/`-emerald`/`-blue`) as needed
  - [ ] No duplicate WebKit/Firefox scrollbar CSS in feature files

- Headers & Composition
  - [ ] Headers wrapped by `PageHeaderSection` (neutral)
  - [ ] Doc/cards rendered as siblings when appropriate (flags set)

- Performance
  - [ ] `ContentVisibility` applied to large off‑screen content (with `containSize` when known)
  - [ ] `GPUAcceleration` ONLY on containers without sticky descendants
  - [ ] Reduced‑motion considerations where continuous animations exist

- Styles & Tokens
  - [ ] Shared utilities or variants added to `app/styles/components.css`
  - [ ] No hard‑coded RGBA brand colors; use Tailwind tokens or theme()
  - [ ] Prose class sets consistent for markdown regions

- Docs & Tooling
  - [ ] STYLE.md updated if patterns change
  - [ ] ESLint rules updated if SSOT surface expands
  - [ ] Codemods prepared/used for mass import migrations when needed


## Visual Snapshot Harness (Optional)

We keep a simple, optional harness to capture screenshots of key experiences for visual parity:

- Tooling: Playwright (optional, not pinned as a dependency)
- Expected routes (local dev):
  - Deliverables page (summary/doc sibling visible)
  - Landing (for Big‑O in sidebar/fullscreen as applicable)
  - (Optional) need-measurement pipeline placeholder (second executions tab) once that mode ships; until then it redirects to deliverables

Usage outline (local):
1) Start the app locally: `pnpm dev` (ensure it’s at http://localhost:3000)
2) Install Playwright once: `npx playwright install` (browser binaries)
3) Write a small script to navigate to pages and call `page.screenshot({ path: ... })`

Notes:
- Full automation of overlays may require selecting specific buttons/flags in the DOM. Keep selectors resilient (data-testid where possible).
- Use this harness for parity snapshots before risky style changes; it’s not required for CI.
