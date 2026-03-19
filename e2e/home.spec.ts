import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows main heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/resume/i);
  });

  test('has a link to the builder or sign-in', async ({ page }) => {
    await page.goto('/');
    // The page should have at least one CTA
    const cta = page.locator('a[href="/builder"], a[href="/login"], a[href="/register"]').first();
    await expect(cta).toBeVisible();
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page.locator('text=404')).toBeVisible();
  });
});
