This folder hosts vendored Shadcn UI components as the canonical base surface for ENGI UI.

Plan (non-breaking, staged):
- Migrate components (button, badge, card, input, label, select, table, tabs, tooltip, etc.) from `uapi/components/ui/` into `components/base/shadcn/`.
- Update app imports to target `@/components/base/shadcn/<component>`.
- Keep storybook/demo and registry under `components/ui/apps/www` intact during migration; switch them last or leave them as fixtures.
- No re-exports; consumers import files directly from this folder.

Guidance: do not add re‑exports. Consumers must import specific files from this folder.
