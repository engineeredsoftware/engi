# -Developing- Plugins TLDR

**What**: Build-time metadata for PromptPart and Prompt development

**Plugins**:
- `@doc-comment-developing-promptpartdevelopment` - PromptPart metadata
- `@doc-comment-developing-promptdevelopment` - Prompt metadata

**Key Fields**:
- `domain`: Category (agent|tool|pipeline|phase|formatting|validation|system)
- `intent`: What it does
- `generation`, `quality_score`, `variant`: PBV versioning

**Location**: `/packages/prompts/src/developing/doc-comment-developing.ts`

**Usage**: Auto-registers when imported