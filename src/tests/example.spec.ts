import { expect } from '@playwright/test';
import { test } from './fixtures.js';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test('has title', { annotation: [{ type: 'tms', description: '1' }] }, async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test(
  'get started link',
  {
    annotation: [
      { type: 'tms', description: '1' },
      { type: 'tms', description: '1' },
    ],
  },
  async ({ page }) => {
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  }
);

test(
  'failed test',
  {
    annotation: [
      { type: 'tms', description: '1' },
      { type: 'issue', description: '2' },
    ],
  },
  async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/WebDriver/);
  }
);
