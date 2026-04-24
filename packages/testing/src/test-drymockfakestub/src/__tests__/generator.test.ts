import { describe, it, expect, beforeAll } from 'vitest';
import { createTestPart } from '../primitives/TestPart';
import { createTestComposition } from '../primitives/TestComposition';
import { TestScenarioBuilder } from '../primitives/TestScenario';
import { UnifiedTestDataGenerator } from '../generators/UnifiedTestDataGenerator';

const BASE_COMPOSITION = createTestComposition({
  id: 'user',
  name: 'User Data',
  parts: [createTestPart({})],
  compose: () => ({
    id: 'user-1',
    name: 'Alice',
    type: 'primary',
    userId: 'placeholder',
    repository: { owner: 'unknown', name: 'unknown' },
  }),
});

const buildScenario = (id: string, tags: string[] = []) =>
  new TestScenarioBuilder()
    .id(id)
    .name('Scenario ' + id)
    .description('Scenario description')
    .context({
      environment: 'test',
      user: { id: 'user-123', role: 'owner', credits: 100 },
      repository: { owner: 'engi', name: 'repo', isPrivate: true },
    })
    .addData(BASE_COMPOSITION)
    .behavior({ phases: ['setup'], expectations: { success: true } })
    .tags(...tags)
    .build();

describe('UnifiedTestDataGenerator', () => {
  beforeAll(() => {
    // ensure performance.now exists in Node < 16
    if (typeof performance === 'undefined') {
      // @ts-ignore
      global.performance = { now: () => Date.now() };
    }
  });

  it('caches generated data for identical scenario/mode', () => {
    const generator = new UnifiedTestDataGenerator();
    const scenario = buildScenario('cache-test');

    const first = generator.generateForScenario(scenario);
    const second = generator.generateForScenario(scenario);

    expect(second).toBe(first);
  });

  it('applies minimal transform when scenario tagged minimal', () => {
    const generator = new UnifiedTestDataGenerator();
    const scenario = buildScenario('minimal', ['minimal']);

    const result = generator.generateForScenario(scenario);
    expect(result.data).toEqual({
      id: 'user-1',
      name: 'Alice',
      type: 'primary',
    });
  });

  it('applies realistic transform with context-aware fields', () => {
    const generator = new UnifiedTestDataGenerator();
    const scenario = buildScenario('realistic');

    const result = generator.generateForScenario(scenario);
    expect(result.data).toMatchObject({
      userId: 'user-123',
      repository: { owner: 'engi', name: 'repo', isPrivate: true },
    });
  });

  it('applies chaos transform when scenario tagged chaos', () => {
    const generator = new UnifiedTestDataGenerator();
    const scenario = buildScenario('chaos', ['chaos']);

    const result = generator.generateForScenario(scenario);
    expect(result.data).toHaveProperty('invalidField', '🔥CHAOS🔥');
    expect(result.data).toHaveProperty('nullField', null);
  });

  it('throws when fixture/dryrun/story lookups have no matching scenario (unimplemented lookups)', () => {
    const generator = new UnifiedTestDataGenerator();
    const scenario = buildScenario('existing');
    generator.generateForScenario(scenario);

    expect(() =>
      generator.generateForFixture({ type: 'fixture', count: 3 }),
    ).toThrow('No scenario found for fixture');

    expect(() =>
      generator.generateForDryRun({ pipeline: 'asset-pack' }),
    ).toThrow('No scenario found for dryrun config');

    expect(() =>
      generator.generateForStorybook({ title: 'Story', component: 'Comp' }),
    ).toThrow('No scenario found for story');
  });
});
