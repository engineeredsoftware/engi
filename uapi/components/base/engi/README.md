ENGI Base Primitives

- panels/ScrollContainer: Standardized scroll region with SSOT scrollbar classes (`custom-scrollbar` + variants). Keeps layout neutral.
- perf/ContentVisibility: Adds `content-vis` utility and optional containIntrinsicSize hint. Wrap heavy content regions.
- perf/GPUAcceleration: Applies GPU-friendly transform hints to reduce jank in animated regions.
- page-header/PageHeaderSection: Neutral shell for page headers with optional meta/actions; no padding or margins by default.

Usage
- Prefer `ScrollContainer` for scrollable regions. Add variant classes via `className` for theme-specific scrollbar thumbs.
- Prefer `ContentVisibility` for large, off-screen content blocks; set `containSize` when known.
- Wrap highly animated containers in `GPUAcceleration` to hint the compositor.
- Compose header sections with `PageHeaderSection` and pass existing content as children for zero visual change.

SSOT CSS
- app/styles/components.css defines base scrollbar styles and variants; avoid redefining in feature-specific stylesheets.

