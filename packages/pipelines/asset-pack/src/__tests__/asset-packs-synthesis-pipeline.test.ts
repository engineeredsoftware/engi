import { ExecutionPrompt } from '@bitcode/execution-generics/prompts/ExecutionPrompt';
import { hierarchicalFormatter } from '@bitcode/prompts/formatters';
import type { PromptPart } from '@bitcode/prompts/parts/PromptPart';

import { buildSynthesisPromptLayers } from '../asset-packs-synthesis-pipeline';
import { measurementCatalogForLens, type AssetPacksSynthesisLens } from '../asset-packs-synthesis';

// Satisfy the ExecutionPrompt root requirements exactly as AgentExecution does
// at runtime (generic_system + specific_execution set to a blank PromptPart).
const BLANK = ' ' as PromptPart;

/**
 * Gate 3 chunk F — sanity-check that the synthesis PromptParts compose
 * correctly through the real registry build-up: each layer registers under a
 * valid ExecutionPrompt path and the hierarchical formatter renders every
 * layer's instruction content into the system prompt, lens-correctly.
 */
describe('AssetPacksSynthesis formal prompt build-up (Gate 3 chunk F)', () => {
  function render(lens: AssetPacksSynthesisLens): string {
    const prompt = new ExecutionPrompt();
    prompt.set('generic_system', BLANK);
    prompt.set('specific_execution', BLANK);
    const catalog = measurementCatalogForLens(lens);
    for (const { path, part } of buildSynthesisPromptLayers(
      lens,
      catalog,
      ['capability-slice', 'implementation-pattern'],
      4,
    )) {
      prompt.setSpecificExecution(path, part);
    }
    return prompt.format(hierarchicalFormatter);
  }

  it('registers six hierarchical layers under valid execution-prompt paths', () => {
    const layers = buildSynthesisPromptLayers(
      'deposit',
      measurementCatalogForLens('deposit'),
      ['capability-slice'],
      4,
    );
    expect(layers.map((layer) => layer.path)).toEqual([
      'pipeline:asset-packs-synthesis:identity',
      'pipeline:asset-packs-synthesis:source-safety',
      'phase:deposit:role',
      'agent:measure:catalog',
      'agent:measure:rules',
      'step:candidate:shape',
    ]);
    // Every part is non-empty and accepted by the ExecutionPrompt path hierarchy.
    const prompt = new ExecutionPrompt();
    for (const { path, part } of layers) {
      expect(part.trim().length).toBeGreaterThan(0);
      expect(() => prompt.setSpecificExecution(path, part)).not.toThrow();
    }
  });

  it('composes every deposit layer into the formatted system prompt', () => {
    const rendered = render('deposit');
    expect(rendered).toContain('single Bitcode synthesis and measurement pipeline'); // identity
    expect(rendered).toContain('Source-safety law'); // source-safety
    expect(rendered).toContain('Lens: deposit'); // phase lens-role
    expect(rendered).toContain('source-coverage'); // agent catalog
    expect(rendered).toContain('demand-alignment');
    expect(rendered).toContain('DISTINCT candidates'); // agent rules
    expect(rendered).toContain('"options"'); // step candidate-shape contract
    expect(rendered).toContain('capability-slice'); // allowed kinds threaded into rules
  });

  it('carries the lens through the phase role and measurement catalog', () => {
    const deposit = render('deposit');
    const read = render('read');
    expect(deposit).toContain('Lens: deposit');
    expect(read).toContain('Lens: read');
    // Read catalog adds the Need-relative measurement; deposit uses demand-alignment.
    expect(read).toContain('need-fit');
    expect(deposit).not.toContain('need-fit');
    expect(deposit).toContain('demand-alignment');
  });
});
