import { createPromptPart, isPromptPart, EMPTY_PROMPT_PART } from '../parts/PromptPart';
import { createPrompt, Prompt } from '../prompt';
import { hierarchicalFormatter } from '../formatters';

describe('PromptPart primitives', () => {
  it('brands strings as PromptPart and validates via type guard', () => {
    const part = createPromptPart('You are Bitcode.');
    expect(isPromptPart(part)).toBe(true);
    expect(isPromptPart('plain string')).toBe(true); // guard allows branded strings as runtime check
    expect(EMPTY_PROMPT_PART).toBe('');
  });
});

describe('Prompt registry', () => {
  const identity = createPromptPart('You are Bitcode, the auditable market intelligence.');
  const behavior = createPromptPart('Always narrate steps before executing them.');
  const methodology = createPromptPart('Follow the PTRR loop.');

  it('formats using default formatter when no custom formatter provided', () => {
    const prompt = createPrompt();
    prompt.set('system:identity', identity);
    prompt.set('system:behavior', behavior);

    const formatted = prompt.format();
    expect(formatted).toContain(identity);
    expect(formatted).toContain(behavior);
  });

  it('enforces required paths, patterns, and hierarchy constraints', () => {
    const prompt = createPrompt();
    prompt.set('system:identity', identity);
    prompt.require('system:identity');
    prompt.requirePattern('system:*');
    prompt.requireHierarchy();

    expect(() => prompt.format()).not.toThrow();

    const missingRequired = createPrompt();
    missingRequired.require('system:identity');
    expect(() => missingRequired.format()).toThrow(/Required prompt path missing/);

    const missingPattern = createPrompt();
    missingPattern.set('agent', behavior);
    missingPattern.requirePattern('system:*');
    expect(() => missingPattern.format()).toThrow(/No prompt paths match required pattern/);

    const missingHierarchy = createPrompt();
    missingHierarchy.set('identity', identity);
    missingHierarchy.requireHierarchy();
    expect(() => missingHierarchy.format()).toThrow(/requires hierarchical structure/);
  });

  it('supports cloning with requirements preserved', () => {
    const prompt = createPrompt();
    prompt.set('system:identity', identity);
    prompt.require('system:identity');

    const cloned = prompt.clone();
    cloned.set('system:methodology', methodology);

    expect(cloned.get('system:methodology')).toBe(methodology);
    expect(prompt.get('system:methodology')).toBeUndefined();
    expect(() => cloned.format()).not.toThrow();
  });

  it('retrieves prompt parts by glob patterns', () => {
    const prompt = createPrompt();
    prompt.set('system:identity', identity);
    prompt.set('system:behavior', behavior);
    prompt.set('execution:methodology', methodology);

    const systemParts = prompt.getPattern('system:*');
    expect(systemParts).toHaveLength(2);
    expect(systemParts).toContain(identity);
    expect(systemParts).toContain(behavior);
  });
});

describe('hierarchicalFormatter', () => {
  it('produces structured markdown with fallback for required paths', () => {
    const prompt = createPrompt();
    prompt.set('system:identity', createPromptPart('System identity'));
    prompt.set('system:methodology:ptrr', createPromptPart('PTRR methodology'));
    prompt.require('execution:plan');

    const formatted = hierarchicalFormatter(prompt);
    expect(formatted).toContain('# SYSTEM');
    expect(formatted).toContain('## IDENTITY');
    expect(formatted).toContain('PTRR methodology');
    expect(formatted).toContain('# EXECUTION');
    expect(formatted).toContain('THIS CONTENT NOT AVAILABLE');
  });
});
