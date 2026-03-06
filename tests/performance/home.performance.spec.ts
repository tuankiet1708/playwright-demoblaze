import { env } from '../../src/config/env';
import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('UI Performance @performance', () => {
  test('home page should load within threshold', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();

    // DOMContentLoaded is a stable coarse metric for lightweight guardrails in CI.
    const domContentLoaded = await page.evaluate(() => {
      const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      return Math.round(entry.domContentLoadedEventEnd);
    });

    // Budget is configurable so environments can tune strictness without code changes.
    expect(domContentLoaded).toBeLessThan(env.performanceBudgetMs);
  });
});
