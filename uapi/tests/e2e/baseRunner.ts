// Use dynamic import for node-fetch to avoid require() of ESM module error
import type { Page } from '@playwright/test';

// Common interface for E2E runners
export interface E2ERunner {
  login(): Promise<void>;
  createDeliverable(params: {
    items: any[];
    setupAI Documents?: any[];
  }): Promise<{ run: string; items: any[] }>;
}

// Headless runner using direct API calls
export class ApiRunner implements E2ERunner {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async login() {
    // Assume no auth or API key in env for headless
    return;
  }
  async createDeliverable(params: {
    items: any[];
    setupAI Documents?: any[];
  }) {
    // Dynamically import node-fetch at runtime
    const { default: fetch } = await import('node-fetch');
    const res = await fetch(`${this.baseUrl}/api/deliverables/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }
}

// UI runner using Playwright Page object
export class UiRunner implements E2ERunner {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  async login() {
    // Navigate to login; assume mock login or dev bypass
    await this.page.goto('/login');
    // Insert test session cookie if needed
    await this.page.context().addCookies([{
      name: 'sb',
      value: 'test-session',
      domain: 'localhost',
      path: '/'
    }]);
  }
  async createDeliverable(params: {
    items: any[];
    setupAI Documents?: any[];
  }) {
    // Intercept the API call to return test data
    await this.page.route('**/api/deliverables/history', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ run: 'ui-run', items: params.items })
      });
    });
    // Trigger the pipeline via UI
    await this.page.goto('/executions?type=pipeline:deliverables');
    await this.page.click('button:has-text("Do")');
    // Wait for a test hook, e.g., a data attribute indicating runId
    const runId = await this.page.getAttribute('[data-test-run-id]', 'data-test-run-id');
    return { run: runId || 'ui-run', items: params.items };
  }
}
