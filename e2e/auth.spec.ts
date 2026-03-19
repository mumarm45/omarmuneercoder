import { test, expect } from '@playwright/test';

test.describe('Auth flow', () => {
  test('login page renders the sign in form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder(/you@example.com/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('register page renders the create account form', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByPlaceholder(/you@example.com/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
  });

  test('unauthenticated user is redirected from /dashboard to /login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('unauthenticated user is redirected from /builder to /login', async ({ page }) => {
    await page.goto('/builder');
    await expect(page).toHaveURL(/\/login/);
  });

  test('login page has link to register', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('link', { name: /create one/i })).toBeVisible();
  });

  test('register page has link to login', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible();
  });
});
