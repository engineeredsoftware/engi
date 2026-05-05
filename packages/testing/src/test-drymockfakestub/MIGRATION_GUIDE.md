# Test Intelligence Migration Guide

## Overview

The Test Intelligence system unifies all testing infrastructure (fixtures, mocks, dryrun, Storybook) into a single, coherent system that follows Bitcode's architectural principles.

## Quick Start

### 1. Install the Package

```bash
pnpm add @bitcode/test-intelligence
```

### 2. Add Webpack Plugin

```javascript
// webpack.config.js
import { TestIntelligencePlugin } from '@bitcode/test-intelligence';

export default {
  plugins: [
    new TestIntelligencePlugin({
      include: [/\.ts$/, /\.tsx$/],
      injectRuntime: true
    })
  ]
};
```

### 3. Basic Usage

```typescript
import { testIntelligence, ENTERPRISE_ASSET_PACK_SCENARIO } from '@bitcode/test-intelligence';

// Generate test data
const data = testIntelligence.generate('enterprise-asset-pack-with-conflicts');

// Use with DryRun
const dryRunConfig = testIntelligence.getDryRunAdapter().adaptScenario(ENTERPRISE_ASSET_PACK_SCENARIO);

// Use with MockOrchestrator
const mockData = await testIntelligence.getMockAdapter().getMockData('ASSET_PACKS');

// Use with Storybook
export default {
  decorators: [testIntelligence.getStorybookAdapter().withTestIntelligence]
};
```

## Migration Steps

### From Existing Fixtures

Before:
```typescript
import userFixture from './fixtures/user.json';
import repoFixture from './fixtures/repo.json';

const testData = {
  user: userFixture,
  repository: repoFixture
};
```

After:
```typescript
/** @doc-test-fixture
 * @id user-with-btd-balance
 * @btd-balance 1000
 */
export const USER_FIXTURE = createTestPart({
  id: 'user-001',
  btdBalance: 1000
});

const composition = createTestComposition({
  id: 'user-repo-data',
  parts: [USER_FIXTURE, REPO_FIXTURE],
  compose: () => ({ user: USER_FIXTURE, repository: REPO_FIXTURE })
});
```

### From Mock System

Before:
```typescript
if (ENABLE_MOCKS) {
  return mockData;
}
```

After:
```typescript
const mockAdapter = testIntelligence.getMockAdapter();
const mockData = await mockAdapter.getMockData('ASSET_PACKS', 'enterprise');
return mockData.data;
```

### From DryRun

Before:
```typescript
const dryRunConfig = {
  mockPlan: () => ({ phases: ['discovery', 'implementation'] }),
  mockGenerate: () => ({ result: 'success' })
};
```

After:
```typescript
const dryRunConfig = testIntelligence
  .getDryRunAdapter()
  .createForPipeline('asset-pack', { phase: 'implementation' });
```

### From Storybook

Before:
```typescript
export const Default = {
  args: {
    user: { id: 1, name: 'Test' },
    btdBalance: 1000
  }
};
```

After:
```typescript
export default {
  decorators: [storybookAdapter.withTestIntelligence],
  parameters: {
    testScenario: 'enterprise-asset-pack-with-conflicts'
  }
};

export const Default = {}; // Data provided by scenario
```

## Creating New Scenarios

### 1. Define Test Parts (Atomic Data)

```typescript
/** @doc-test-fixture
 * @id premium-user
 * @tier premium
 * @features ["ai-assist", "priority-support"]
 */
export const PREMIUM_USER = createTestPart({
  id: 'user-premium-001',
  email: 'premium@example.com',
  tier: 'premium',
  btdBalance: 5000
});
```

### 2. Create Compositions

```typescript
export const PREMIUM_SETUP = createTestComposition({
  id: 'premium-setup',
  name: 'Premium User Setup',
  parts: [PREMIUM_USER, PREMIUM_REPO],
  compose: () => ({
    user: PREMIUM_USER,
    repository: PREMIUM_REPO,
    features: ['ai-assist', 'priority-support']
  })
});
```

### 3. Build Complete Scenarios

```typescript
export const PREMIUM_FLOW_SCENARIO = new TestScenarioBuilder()
  .id('premium-user-flow')
  .name('Premium User Complete Flow')
  .description('End-to-end flow for premium users')
  .context({
    environment: 'test',
    user: { role: 'owner', tier: 'premium' }
  })
  .addData(PREMIUM_SETUP)
  .behavior({
    phases: ['setup', 'discovery', 'implementation'],
    expectedCredits: 200,
    expectations: { success: true }
  })
  .tags('premium', 'e2e')
  .build();
```

### 4. Register and Use

```typescript
// Register
testIntelligence.registerScenarios([PREMIUM_FLOW_SCENARIO]);

// Use in tests
it('should handle premium flow', () => {
  const data = testIntelligence.generate('premium-user-flow');
  // ... test implementation
});

// Use in Storybook
storybookAdapter.registerScenario('premium-flow', PREMIUM_FLOW_SCENARIO);
```

## Best Practices

### 1. Naming Conventions

- Test Parts: `ENTITY_VARIANT` (e.g., `USER_ENTERPRISE`, `REPO_PRIVATE`)
- Compositions: `FEATURE_DATA` (e.g., `ASSET_PACK_SETUP`, `AUTH_FLOW_DATA`)
- Scenarios: `FEATURE_VARIANT_SCENARIO` (e.g., `ASSET_PACK_ENTERPRISE_SCENARIO`)

### 2. Doc-Test Comments

Always use doc-test comments for build-time intelligence:

```typescript
/** @doc-test-fixture
 * @id unique-identifier
 * @type EntityType
 * @tags ["tag1", "tag2"]
 * @description Clear description
 */
```

### 3. Scenario Organization

- Group by feature: `/scenarios/specific/[feature]-scenarios.ts`
- Export registries: `FEATURE_SCENARIOS` array and `FEATURE_SCENARIO_MAP` object
- Tag appropriately: Use consistent tags for filtering

### 4. Performance Considerations

- Use `minimal` mode for unit tests
- Use `realistic` mode for integration tests
- Use `comprehensive` mode for E2E tests
- Use `chaos` mode for stress testing

### 5. Type Safety

Always use branded types and interfaces:

```typescript
const part = createTestPart<User>({ ... });
const composition = createTestComposition<SetupData>({ ... });
```

## Advanced Features

### Streaming Data

```typescript
const stream = mockAdapter.streamMockData('ASSET_PACKS', {
  eventCount: 10,
  eventDelay: 100
});

for await (const event of stream) {
  console.log(event);
}
```

### Custom Generators

```typescript
class CustomGenerator implements TestDataGenerator<MyData> {
  generate(config: GenerationConfig): GeneratedTestData<MyData> {
    // Custom generation logic
  }
}

generator.registerGenerator('custom', new CustomGenerator());
```

### Performance Tracking

```typescript
const middleware = mockAdapter.createMiddleware();
// Automatically tracks performance metrics
```

## Troubleshooting

### Data Not Generated

- Check scenario is registered: `testIntelligence.registerScenarios([scenario])`
- Verify scenario ID matches
- Check generation mode is appropriate

### Build-Time Processing Not Working

- Ensure webpack plugin is configured
- Check file patterns in include/exclude
- Verify doc-test comment syntax

### Type Errors

- Use branded types: `createTestPart<T>()`
- Ensure compositions return correct types
- Check adapter type parameters

## Conclusion

The Test Intelligence system brings the same architectural excellence to testing that Bitcode brings to software engineering. By unifying all test data sources and providing build-time intelligence, it enables:

- Zero duplication
- Type safety
- Build-time optimization
- Seamless integration
- Powerful composition
- Real-world scenarios

Start with migrating one feature's tests to see the benefits, then expand to your entire test suite.
