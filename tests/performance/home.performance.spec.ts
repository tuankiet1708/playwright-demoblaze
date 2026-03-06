import { env } from '../../src/config/env';
import { test, expect } from '../../src/fixtures/test-fixtures';

test.describe('UI Performance @performance', () => {
  test('home page should load within threshold', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.ok()).toBeTruthy();

    const domContentLoaded = await page.evaluate(() => {
      const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      return Math.round(entry.domContentLoadedEventEnd);
    });

    expect(domContentLoaded).toBeLessThan(env.performanceBudgetMs);
  });
});
