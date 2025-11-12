import { test, expect } from '@playwright/test';
import { ApiRunner } from './baseRunner';

// Headless E2E test using direct API calls
test.describe('E2E Deliverables (API)', () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const runner = new ApiRunner(baseUrl);

  test.beforeAll(async () => {
    await runner.login();
  });

  test('inserts and retrieves deliverable items via API', async () => {
    const items = [
      { title: 'Test Issue', output: 'OK', repository: 'repo1', deliverable_type: 'issue' }
    ];
    const result = await runner.createDeliverable({ items });
    // Verify run identifier is returned
    expect(result.run).toBeDefined();
    // Verify items array matches input
    expect(Array.isArray(result.items)).toBe(true);
    expect(result.items).toEqual(items);
  });
});