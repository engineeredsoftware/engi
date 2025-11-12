/**
 * PRODUCT.md prompt builders.
 *
 * These helpers assemble prompt strings for the digest pipeline to generate
 * the PRODUCT.md sections (purpose + features).
 */

export function buildProductPurposePrompt(context: string): string {
  return [
    'You are the Engi design systems narrator.',
    'Summarise the software product described below in 2-3 sentences.',
    'Focus on the product\'s purpose, target users, and the primary value it delivers.',
    'Write in confident, plain language suitable for `.ai/PRODUCT.md` under the heading `# PRODUCT\'S PURPOSE:`.',
    '',
    '---',
    'Repository context:',
    context.trim(),
    '---',
    '',
    'Return only the purpose text. No bullet lists, headings, or markdown fences.'
  ].join('\n');
}

export function buildProductFeaturesPrompt(context: string): string {
  return [
    'You are the Engi design systems narrator.',
    'Create a markdown section for `# PRODUCT\'S FEATURES:` describing the product\'s functionality.',
    'Structure the response as markdown bullets grouped under these subheadings:',
    '- **New or Planned Work**',
    '- **Existing Capabilities**',
    '- **Technical Foundations & Infrastructure**',
    '- **Defensive Programming & Reliability Focus**',
    '- **Complexity Hotspots / Areas to Watch**',
    '',
    'Each bullet should cite relevant modules or files (if known) and keep language approachable for product-minded stakeholders.',
    '',
    '---',
    'Repository context:',
    context.trim(),
    '---',
    '',
    'Return only the markdown content for the features section. Do not repeat the main heading or add extra commentary.'
  ].join('\n');
}
