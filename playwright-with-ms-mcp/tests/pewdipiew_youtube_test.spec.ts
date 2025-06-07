import { test, expect } from '@playwright/test';

test('pewdipiew_youtube_test', async ({ page }) => {
  // Navigate to google.com
  await page.goto('https://www.google.com');

  // Search for 'pewdipiew'
  await page.getByRole('combobox', { name: 'Search' }).fill('pewdipiew');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.waitForLoadState('networkidle');

  // Go to PewDiePie's YouTube channel from the search results
  await page.getByRole('link', { name: 'YouTube PewDiePie - YouTube' }).click();
  await page.waitForLoadState('networkidle');

  // Go to the videos tab to see the latest video
  await page.getByRole('tab', { name: 'Videos' }).click();
  await page.waitForLoadState('networkidle');

  // Verify that the latest video is displayed
  await expect(page.locator('h3').filter({ hasText: 'Presenting my Billion Dollar Plan...' })).toBeVisible();

}); 