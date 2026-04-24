import {
  applyPlanImplementationSemanticMirrors,
  applyResearchApproachSemanticMirrors,
} from '../agents/discovery-agents';

describe('AssetPack discovery semantic mirrors', () => {
  it('mirrors compatibility delivery outputs into written assets', () => {
    const output = applyResearchApproachSemanticMirrors({
      approach: {
        methodology: 'parallel analysis',
        phases: [
          {
            name: 'finish',
            description: 'materialize the AssetPack evidence',
            deliverables: ['pull request'],
          },
        ],
        tools: ['git'],
        estimatedEffort: 'medium',
      },
      alternatives: [],
      risks: [],
      recommendation: 'finish with a pull request delivery mechanism',
    });

    expect(output.approach.phases[0].writtenAssets).toEqual(['pull request']);
  });

  it('preserves explicit research approach written asset mirrors', () => {
    const output = applyResearchApproachSemanticMirrors({
      approach: {
        methodology: 'parallel analysis',
        phases: [
          {
            name: 'finish',
            description: 'materialize the AssetPack evidence',
            deliverables: ['pull request'],
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
