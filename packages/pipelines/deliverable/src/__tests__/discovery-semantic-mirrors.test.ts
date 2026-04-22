import {
  applyPlanImplementationSemanticMirrors,
  applyResearchApproachSemanticMirrors,
} from '../agents/discovery-agents';

describe('deliverable discovery semantic mirrors', () => {
  it('mirrors research approach deliverables into written assets', () => {
    const output = applyResearchApproachSemanticMirrors({
      approach: {
        methodology: 'parallel analysis',
        phases: [
          {
            name: 'ship',
            description: 'materialize the interface artifact',
            deliverables: ['pull request'],
          },
        ],
        tools: ['git'],
        estimatedEffort: 'medium',
      },
      alternatives: [],
      risks: [],
      recommendation: 'ship a pull request',
    });

    expect(output.approach.phases[0].writtenAssets).toEqual(['pull request']);
  });

  it('preserves explicit research approach written asset mirrors', () => {
    const output = applyResearchApproachSemanticMirrors({
      approach: {
        methodology: 'parallel analysis',
        phases: [
          {
            name: 'ship',
            description: 'materialize the interface artifact',
            deliverables: ['pull request'],
            writtenAssets: ['draft pull request'],
          },
        ],
        tools: ['git'],
        estimatedEffort: 'medium',
      },
      alternatives: [],
      risks: [],
      recommendation: 'ship a pull request',
    });

    expect(output.approach.phases[0].writtenAssets).toEqual(['draft pull request']);
  });

  it('mirrors definition of done into need satisfaction criteria', () => {
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
      definitionOfDone: ['pull request merged'],
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
      definitionOfDone: ['pull request merged'],
      needSatisfactionCriteria: ['asset pack accepted'],
    });

    expect(output.needSatisfactionCriteria).toEqual(['asset pack accepted']);
  });
});
