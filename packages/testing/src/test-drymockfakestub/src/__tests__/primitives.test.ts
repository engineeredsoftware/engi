import { describe, it, expect } from 'vitest';
import { createTestPart, isTestPart } from '../primitives/TestPart';
import {
  BaseTestComposition,
  createTestComposition,
} from '../primitives/TestComposition';
import {
  TestScenarioBuilder,
  createTestScenario,
  type TestScenario,
} from '../primitives/TestScenario';

describe('TestPart primitives', () => {
  it('creates branded TestPart values and validates with type guard', () => {
    const raw = { foo: 'bar' };
    const part = createTestPart(raw);

    expect(isTestPart(part)).toBe(true);
    expect(part).toBe(raw);

    expect(isTestPart({})).toBe(false);
  });
});

describe('TestComposition helpers', () => {
  class ExampleComposition extends BaseTestComposition<{ value: string }> {
    compose(): { value: string } {
      return { value: this.parts[0].value };
    }
  }

  const examplePart = createTestPart({ value: 'composed' });

  it('BaseTestComposition composes parts via subclass implementation', () => {
    const composition = new ExampleComposition('example', 'Example', [examplePart]);
    expect(composition.compose()).toEqual({ value: 'composed' });
  });

  it('createTestComposition factory wires compose callback', () => {
    const composition = createTestComposition({
      id: 'factory-example',
      name: 'Factory Example',
      parts: [examplePart],
      compose: () => ({ value: 'factory' }),
    });

    expect(composition.compose()).toEqual({ value: 'factory' });
    expect(composition.parts).toHaveLength(1);
  });
});

describe('TestScenario builder', () => {
  const exampleComposition = createTestComposition({
    id: 'user-data',
    name: 'User Data',
    parts: [createTestPart({ id: 'user-123', name: 'Alice', type: 'primary' })],
    compose: () => ({ id: 'user-123', name: 'Alice', type: 'primary' }),
  });

  function buildValidScenario(): TestScenario {
    return new TestScenarioBuilder()
      .id('user-scenario')
      .name('User Scenario')
      .description('Happy path for user onboarding')
      .context({
        environment: 'test',
        user: { id: 'user-123', role: 'owner' },
      })
      .addData(exampleComposition)
      .behavior({
        phases: ['setup', 'implementation'],
        expectations: { success: true },
      })
      .tags('minimal')
      .performance({ timeout: 1000 })
      .build();
  }

  it('builds complete scenarios when all required fields provided', () => {
    const scenario = buildValidScenario();

    expect(scenario.id).toBe('user-scenario');
    expect(scenario.data).toHaveLength(1);
    expect(scenario.behavior.expectations?.success).toBe(true);
  });

  it('throws when required fields are missing', () => {
    const builder = new TestScenarioBuilder();
    expect(() => builder.build()).toThrow('TestScenario missing required fields');
  });

  it('createTestScenario returns provided configuration unchanged', () => {
    const scenario = buildValidScenario();
    expect(createTestScenario(scenario)).toBe(scenario);
  });
});
