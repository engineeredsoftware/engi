import { test, expect } from '@playwright/test';

// Helper to set onboarding state
async function setOnboardingState(page, step, completed = []) {
  await page.evaluate(([step, completed]) => {
    localStorage.setItem('onboardingState', JSON.stringify({
      isOnboarding: true,
      currentOnboardingStep: step,
      completedSteps: completed,
      isFirstTimeUser: true
    }));
  }, [step, completed]);
}

test.describe('Orbital - Models Step', () => {
  test('orbital-models-first-load', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'models', ['profile', 'connections']);
    await page.reload();
    await page.waitForSelector('textarea#global-system-prompt');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-models-first-load.png');
  });

  test('orbital-models-prompt-edited', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'models', ['profile', 'connections']);
    await page.reload();
    const prompt = page.locator('textarea#global-system-prompt');
    await prompt.fill('Updated system prompt');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-models-prompt-edited.png');
  });

  test('orbital-models-model-switch', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'models', ['profile', 'connections']);
    await page.reload();
    const selector = page.locator('select').first();
    await selector.selectOption('gpt-3.5');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-models-model-switch.png');
  });
});
