import {
  applyPlanImplementationSemanticMirrors,
  applyResearchApproachSemanticMirrors,
} from '../agents/discovery-agents';

describe('AssetPack discovery semantic mirrors', () => {
  it('mirrors AssetPack synthesis artifacts into written assets', () => {
    const output = applyResearchApproachSemanticMirrors({
      approach: {
        methodology: 'parallel analysis',
        phases: [
          {
            name: 'finish',
            description: 'materialize the AssetPack evidence',
            assetPackSynthesisArtifacts: ['source patch evidence'],
            shippables: ['pull request'],
          },
        ],
        tools: ['git'],
        estimatedEffort: 'medium',
      },
      alternatives: [],
      risks: [],
      recommendation: 'finish with a pull request delivery mechanism',
    });

    expect(output.approach.phases[0].writtenAssets).toEqual(['source patch evidence']);
  });

  it('preserves explicit research approach written asset mirrors', () => {
    const output = applyResearchApproachSemanticMirrors({
      approach: {
        methodology: 'parallel analysis',
        phases: [
          {
            name: 'finish',
            description: 'materialize the AssetPack evidence',
            assetPackSynthesisArtifacts: ['source patch evidence'],
            shippables: ['pull request'],
            writtenAssets: ['draft pull request'],
          },
        ],
        tools: ['git'],
        estimatedEffort: 'medium',
      },
      alternatives: [],
      risks: [],
      recommendation: 'finish with a pull request delivery mechanism',
    });

    expect(output.approach.phases[0].writtenAssets).toEqual(['draft pull request']);
  });

  it('mirrors definition of need into need satisfaction criteria', () => {
    const output = applyPlanImplementationSemanticMirrors({
      implementationPlan: {
        overview: 'deliver the requested change',
        milestones: [],
        dependencies: [],
      },
      testingStrategy: {
        approach: 'targeted regression',
        testTypes: ['unit'],
        coverage: 'focused',
      },
      validationCriteria: ['tests pass'],
      definitionOfNeed: ['pull request merged'],
    });

    expect(output.needSatisfactionCriteria).toEqual(['pull request merged']);
  });

  it('preserves explicit need satisfaction criteria', () => {
    const output = applyPlanImplementationSemanticMirrors({
      implementationPlan: {
        overview: 'deliver the requested change',
        milestones: [],
        dependencies: [],
      },
      testingStrategy: {
        approach: 'targeted regression',
        testTypes: ['unit'],
        coverage: 'focused',
      },
      validationCriteria: ['tests pass'],
      definitionOfNeed: ['pull request merged'],
      needSatisfactionCriteria: ['asset pack accepted'],
    });

    expect(output.needSatisfactionCriteria).toEqual(['asset pack accepted']);
  });
});
