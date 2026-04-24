# Test Architecture

## Overview

Test framework in Bitcode provides comprehensive testing capabilities through systematic test generation and execution.

> "Tests verify code correctness through systematic validation."

## The 7 Primitive Test Operations

All testing decomposes into these atomic operations:

### Verification Dimension (Operational Test Coordination)
1. **ARRANGE** - Establish test initial conditions
2. **SEGMENT** - Decompose test space into atomic verifications  
3. **AGGREGATE** - Synthesize verification results across dimensions
4. **SYNTHESIZE** - Reconstruct test results

### Validation Dimension (Test Execution)
5. **ASSERT** - Pure verification of expected behavior
6. **DIAGNOSE** - Failure analysis and root cause determination
7. **GENERATE_MOCK** - Create test data from type definitions

## Test-Type Integration

Test framework integrates:
- **Test Types** (TypeScript interfaces)
- **Test Scenarios** (doc-comment-based test configuration)

```typescript
/** @doc-comment-test
 * @dimension enterprise-scale
 * @mode production
 * @dry-run-precision per-function
 * @targets ["AssetPackPipeline.*.generate", "!AssetPackPipeline.phase3.generate"]
 */
export interface TestConfiguration {
  readonly dimension: TestDimension;
  readonly mode: TestMode;
  readonly precision: DryRunPrecision;
}
```

## Build-Time Test Generation

All test generation happens at compile time through AST transformation:

```typescript
// Source code with doc-comment-test
/** @doc-comment-test-fixture
 * @context enterprise
 * @scenario high-load
 * @credits 50000
 */
export const ENTERPRISE_USER = {};

// Build-time transformation injects
ENTERPRISE_USER.__proto__.testMetadata = {
  context: 'enterprise',
  scenario: 'high-load',
  credits: 50000,
  generator: () => generateFromContext('enterprise', 'high-load')
};
```

## Selective Dry-Run Architecture

Precise control over test execution - dry run everything except specific functions:

```typescript
export class SelectiveDryRunOrchestrator {
  private functionRegistry: Map<string, TestFunction>;
  
  async execute<T>(functionPath: string, live?: boolean): Promise<T> {
    const fn = this.functionRegistry.get(functionPath);
    
    if (live || fn.isLiveExecution()) {
      // Execute real function
      return await this.executeLive(fn);
    }
    
    // Generate from test data
    return await this.generateTestResponse(fn);
  }
}
```

## Test Execution Modes

### Mode 0: Basic (Traditional Testing)
- Fixed fixtures
- Static mocks
- Manual validation

### Mode 1: Dynamic (Current State)
- Dynamic fixtures
- Scenario-based mocks
- Automated adaptation

### Mode 2: Intelligent (Test Framework)
- Automated test generation
- Context-aware verification
- Adapts to code changes

### Mode 3: Advanced (Future Vision)
- Self-generating tests
- Automated verification
- Co-evolution with code

## Integration with Prompt System

Test scenarios integrate with PromptParts:

```typescript
/** @doc-comment-test-prompt
 * @test-context asset-pack-pipeline
 * @verification-mode comprehensive
 */
export const TEST_SCENARIO_PROMPT = PromptPart`
You are verifying the AssetPack pipeline in the enterprise context.
Generate test data that explores all states of the system.
`;

// Integration
const systemPrompt = PromptComposer.compose([
  SYSTEM_IDENTITY,
  TEST_SCENARIO_PROMPT,
  VERIFICATION_INSTRUCTIONS
]);
```

## Test Execution System

Tests execute systematically:

```typescript
export class TestExecution extends Execution {
  private configuration: TestConfiguration;
  private context: TestContext;
  
  async execute(): Promise<ExecutionResult> {
    // ARRANGE the context
    const context = await this.arrange();
    
    // SEGMENT into test cases
    const segments = await this.segment(context);
    
    // Execute with selective precision
    const results = await Promise.all(
      segments.map(s => this.executeWithPrecision(s))
    );
    
    // AGGREGATE across dimensions
    const aggregated = await this.aggregate(results);
    
    // SYNTHESIZE into results
    return await this.synthesize(aggregated);
  }
}
```

## File Architecture

```
/packages/test-framework/
  /src/
    /core/                  # Test framework primitives
      test-context.ts       
      test-dimension.ts     
    /operations/            # The 7 primitive operations
      arrange.ts
      segment.ts
      aggregate.ts
      synthesize.ts
      assert.ts
      diagnose.ts
      generate-mock.ts
    /execution/            # Selective dry-run system
      function-registry.ts
      selector.ts
      dry-run-orchestrator.ts
    /doc-comment-test/     # Build-time plugins
      ast-transformer.ts
      prototype-injector.ts
      test-comment-parser.ts
```

## Usage Example

```typescript
/** @doc-comment-test-execution
 * @context enterprise-asset-packs
 * @mode production
 * @dry-run all-except ["ComprehendTaskAgent.generate#iteration-2"]
 */
export class AssetPackTestExecution extends TestExecution {
  async execute() {
    // Configure test context
    const configuration = await this.configure();
    
    // Generate test data from type definitions
    const testData = await configuration.generateTestData();
    
    // Execute with surgical precision
    const results = await this.executeWithSelectiveDryRun({
      dryRunAll: true,
      except: ['ComprehendTaskAgent.generate#iteration-2']
    });
    
    // Verify results
    return await this.verify(results);
  }
}
```

## Industrial-Grade Requirements

1. **Scale**: Test frameworks that scale to millions of scenarios
2. **Zero Runtime Cost**: All test generation at build time
3. **Type Safety**: Full TypeScript support
4. **LLM Integration**: First-class support for prompt testing
5. **Selective Precision**: Dry run control at function level
6. **Automated Improvement**: Tests that enhance themselves
7. **Stable Abstractions**: Designed for long-term stability

## Core Principles

Traditional testing asks "Does the code work?"
Modern testing asks "How do we systematically verify code behavior?"

Through integration of test types and test automation, we achieve:
- Tests that serve their purpose
- Verification through systematic validation
- Co-evolution of tests and code
- Zero-cost test generation
- Selective execution control

This is the Test Framework - where tests are systematically generated and executed.
