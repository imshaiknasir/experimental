import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 60000,
  use: {
    trace: 'on-first-retry',
  },
});
